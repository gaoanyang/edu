<template>
    <input type="file"
           class="input-file"
           name="avatar"
           ref="avatarInput"
           @change="upload($event)"
           accept=""/>
</template>
<script>
export default {
    data() {
        return {
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
            let files = this.$refs.avatarInput.files
            console.log(files)
            let fileData = {}
            if (files instanceof Array) {
                fileData = files[0]
                console.log(fileData)
            } else {
                fileData = this.file
            }
            let data = new FormData()
            data.append('file', fileData)
            data.append('Content-Type','multipart/form-data')
            var token = JSON.parse(sessionStorage.getItem("user")).access_token
            var url = this.GLOBAL+"/board/upload"
            this.$http.post(url,data,{
                headers:{
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => {
                console.log(res)
                if(res.data.code == 0) {
                    alert('资源上传成功')
                }
                this.$emit("upload", res.data.data);
            }).catch(error=>{

            });
        }
    }
}
</script>
<style>

</style>
