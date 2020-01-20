<template>
  <div class="selectDiv">
    <input type="file" class="select" @change="upload($event)" multiple>
    <tbody id="uploadList"></tbody>
  </div>
</template>
<script>
import $ from 'jquery'
import PlvVideoUpload from '@polyv/vod-upload-js-sdk'
export default {
    data() {
        return {
            $uploadList:null,
            videoUpload:null,
            data:null,
            token:'',
            getPolyvAuthorization:this.GLOBAL+"/board/polyv",
        }
    },
    methods:{
        fileDom(uploader) {
            return `<tr data-id="${uploader.id}">
            <td>${uploader.fileData.title}</td>
            <td>${uploader.id}</td>
            <td>${uploader.fileData.size}</td>
            <td style="width: 200px">
              <div style="width: 200px" class="progress-wrap"><div class="progress"></div></div>
              <input type="button" value="开始" class="js-fileStart" />
              <input type="button" value="暂停" class="js-filePause" />
              <input type="button" value="删除" class="js-fileDelete" />
            </td>
          </tr>`;
        },
        getUserData(videoUpload) {
            var that = this
            $.ajax({
                url: this.getPolyvAuthorization,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Bearer " + that.token);
                },
                }).done(res => {
                  that.data = res.data
                  videoUpload.updateUserData({
                    userid: that.data.userId,
                    ptime: that.data.ptime,
                    sign: that.data.sign,
                    hash: that.data.hash
                });

              });
        },
        autoUpdateUserData(timer, videoUpload) {
            this.getUserData(videoUpload);
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(() => {
                this.autoUpdateUserData(timer, videoUpload);
            }, 3 * 50 * 1000);
        },
        //事件回调
        onUploadComplete() {
            $('#progress').text('上传结束！');
            // 获取上传文件列表
            console.info('上传结束：');
        },
        onError(err) {
            console.info(err);
            if (err.code) {
                // 110：文件重复，111：拦截文件类型不在acceptedMimeType中的文件，102：用户剩余空间不足
                let errMag = `（错误代码：${err.code}）${err.message}`;
                if (err.code === 110 || err.code === 111) {
                    errMag += ` ${err.data.filename}`;
                }
                alert(errMag);
            } else {
                console.info(err);
            }
        },
        onFileStarted({ uploaderid, fileData }) {
            console.info('开始上传', uploaderid, fileData);
            this.$uploadList.find(`[data-id=${uploaderid}] .progress`).text('0.00%');
        },
        onFileProgress({ uploaderid, progress }) {
            const p = (progress * 100).toFixed(2);
            this.$uploadList.find(`[data-id=${uploaderid}] .progress`).css('min-width', `${p}%`).text(`${p}%`);
        },
        onFileStopped({ uploaderid }) {
            console.info('暂停上传 ' + uploaderid);
            console.info(videoUpload);
        },
        //上传
        upload(e) {
            var that = this
            const files = e.target.files;
            if (!files || files.length <= 0) {
                return;
            }
            $.makeArray(files).forEach((file) => {
                const fileSetting = {
                    desc: 'demo中设置的描述',
                    cataid: this.data.cataid,
                    tag: 'demo中设置的标签',
                    luping: 0,
                    keepsource: 0,
                    title: 'testtitle',
                    state: 'test'
                };
                // 添加文件到上传列表
                const uploader = this.videoUpload.addFile(file, {
                    FileStarted: this.onFileStarted,
                    FileProgress: this.onFileProgress,
                    FileSucceed: function(uploadInfo) { // 文件上传成功回调
                      that.$emit('videoId',uploadInfo.fileData.vid)
                      alert('文件上传成功')
                      console.log("文件上传成功: " + uploadInfo.fileData.vid);
                    },
                    // FileFailed: this.onFileFailed,
                    FileFailed:function(uploadInfo) { // 文件上传失败回调
                      console.log("文件上传失败: " + JSON.stringify(uploadInfo));
                      console.log("文件上传失败: " + uploadInfo.fileData.title);
                    },
                    FileStopped: this.onFileStopped,
                }, fileSetting);
                if (!uploader) {
                    return;
                }
                const uploaderid = uploader.id;
                const $fileDom = $(this.fileDom(uploader));
                // 开始/恢复上传文件
                var that = this
                $fileDom.find('.js-fileStart').on('click', function() {
                    that.videoUpload.resumeFile(uploaderid);
                });
                // 暂停上传文件
                $fileDom.find('.js-filePause').on('click', function() {
                    that.videoUpload.stopFile(uploaderid);
                });
                // 删除文件
                $fileDom.find('.js-fileDelete').on('click', function() {
                    that.videoUpload.removeFile(uploaderid);
                    $fileDom.remove();
                });
                that.$uploadList.append($fileDom);
            });
        }
    },
    mounted() {
        var user = JSON.parse(sessionStorage.getItem("user"))
        this.token  = user.access_token
        this.$uploadList = $('#uploadList')
        this.videoUpload = new PlvVideoUpload({
            parallelFileLimit: 5,
            events: {
                UploadComplete: this.onUploadComplete,
                Error: this.onError
            }
        });
        this.autoUpdateUserData(null, this.videoUpload);
    }
}
</script>
<style scoped lang="scss">
.selectDiv{
  .select{
    opacity: 0;
  }
}
</style>
