<template>
    <div class="avatar">
        <span class="s1">上传自定义图片</span>
        <div @mouseover="showBg=true" @mouseleave="showBg=false">
            <div class="bg" v-if="showBg" :style="`line-height:${imgHeight}`"></div>
            <input type="file" class="input-file" :style="`width:${imgWidth};height:${imgHeight};`" name="avatar" ref="avatarInput" @change="changeImage($event)" accept="">
            <img :src="avatar" alt="" :style="`width:${imgWidth};height: ${imgHeight};`" name="avatar">
        </div>
        <div class="text" @click="upload" v-if="file">{{message}}</div>
    </div>
</template>
<script>

    export default {
        name: 'upload',
        data() {
            return {
                avatar: '',
                file: '',
                showBg: false
            }
        },
        props: ["uploadType", "imgUrl", "imgWidth", "imgHeight","message"],
        created() {
            this.avatar = this.imgUrl
        },
        watch:{
            "imgUrl":{
                handler:function(newVal, oldVal){
                    this.avatar = newVal
                },
                immediate: true,
            }
        },
        methods: {
            changeImage: function (e) {
                const input = document.querySelector('input[type=file]')
                console.log(input)
                const reader = new FileReader()
                console.log(input.files[0])
                this.file = input.files[0]
                reader.readAsDataURL(input.files[0]) // input.files[0]为第一个文件
                reader.onload = ()=>{
                    const img = new Image()
                    img.src = reader.result
                    console.log(reader.result)
                    this.avatar = img.src
                }
            },
            upload: function () {
                let files = this.$refs.avatarInput.files
                console.log(files instanceof Array)
                let fileData = {}
                if (files instanceof Array) {
                    fileData = files[0]
                } else {
                    fileData = this.file
                }
                let data = new FormData()
                console.log(fileData)
                data.append('file', fileData)
                data.append('Content-Type','multipart/form-data')
                var token = JSON.parse(sessionStorage.getItem("adminuser")).access_token
                console.log(token)
                var url = this.GLOBAL+"/board/upload"
                this.$http.post(url,data,{
                    headers:{
                        'Authorization': 'Bearer ' + token
                    }
                }).then(res => {
                    if(res.data.code == 0) {
                        alert('上传成功')
                    }
                    this.$emit("upload", res.data.data);
                }).catch(error=>{

                });

            }
        }
    }
</script>
<style lang="scss" scoped>
.avatar {
    height: 161px;
    cursor: pointer;
    position: relative;
    .s1{
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        display: inline-block;
        width: 92px;
        height: 20px;
    }
    .input-file {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
    }

    .bg {
        width: 100%;
        height: 100%;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.3);
        text-align: center;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;

    }

    .text {
        margin-top: 20px;
        font-size: 20px;
        /*padding-top: 10px;*/
        color: #57a3f3;
        display: inline-block;
    }

}
</style>
