<template>
    <input type="file"
           class="input-file"
           name="avatar"
           ref="avatarInput"
           @change="upload($event)"
           accept=""
   />
</template>
<script>
    export default {
        data() {
            return {
                themeName:'',
                avatar: '',
                file: '',
                showBg: false,
                accept:'image/gif'
            }
        },
        methods: {
            upload: function () {
                const input = document.querySelector('input[type=file]')
                this.file = input.files[0]
                console.log(this.file)
                if(this.file.size > 10566084) {
                    alert("超过10M的视频文件在名师课程中上传")
                    return
                }
                this.themeName = this.file.name
                this.$emit("uploadName", this.themeName);
                let files = this.$refs.avatarInput.files
                let fileData = {}
                if (files instanceof Array) {
                    fileData = files[0]
                } else {
                    fileData = this.file
                }
                let data = new FormData()
                data.append('file', fileData)
                data.append('Content-Type','multipart/form-data')
                var token = JSON.parse(sessionStorage.getItem("user")).access_token
                var url = 'http://sm.zgjsfz.com'+"/board/upload"
                this.$emit("uploadloading", 0);
                this.$http.post(url,data,{
                    headers:{
                        'Authorization': 'Bearer ' + token
                    }
                }).then(res => {
                    console.log(res)
                    if(res.data.code == 0){
                        alert('上传成功,请提交！')
                        this.$emit("uploadloading", 1);
                        this.$emit("upload", res.data.data);
                    }else{
                        alert('上传失败')
                    }
                }).catch(error=>{

                });
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
