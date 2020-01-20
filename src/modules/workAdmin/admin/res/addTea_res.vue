<template>
    <div class="addTea_res">
        <Button @click="link">返回</Button>
        <p class="p1">上传资源</p>
        <div class="bt">
            <span>资源名称：</span>
            <input type="text" v-model="resourceName"/>
        </div>
        <div class="uploadAll">
            <div class="upload1">
                点击上传
            </div>
            <upload @uploadName="getName" @upload="getData" @uploadloading="getupload"></upload>
            <div class="dww" style="display: none">
                <div class="downloading">正在上传中，请耐心等待</div>
                <div class="round-loading-wrap">
                    <div class="round-loading"></div>
                    <div class="round-loading round-loading-1"></div>
                </div>
            </div>
        </div>
        <Button style="margin-top: 60px" type="primary" @click="refer">提交</Button>
    </div>
</template>
<script>
import upload from '@/components/uploadDos'
export default {
    components:{upload},
    data () {
        return {
            name:'',
            phone: 'apple',
            resourceUrl:'',
            resourceName:''
        }
    },
    methods:{
        getupload(val) {
            var dww = document.getElementsByClassName('dww')[0]
            if(val == 0) {
                if(dww.style.display=="none")
                {
                    dww.style.display = "block";
                }
            }else{
                if(dww.style.display=="block")
                {
                    dww.style.display = "none";
                }
            }
        },
        getName(data) {
            this.resourceName = data
        },
        refer() {
            if(this.resourceUrl == "") {
                return
            }
            var user = JSON.parse(sessionStorage.getItem("user"))
            console.log(user)
            var data = {
                "resourceName": this.resourceName,
                "resourceUrl": this.resourceUrl,
                "resourceType": 0,
                "studioId": user.studioId
            }
            var url = this.GLOBAL+"/board/resource"
            console.log(data)
            this.$http.post(url, data,{
                headers:{
                    'Authorization': 'Bearer ' + user.access_token
                }
            })
                .then(res => {
                    console.log(res)
                    if(res.data.code == 0){
                        alert("新增成功")
                        // this.$router.go(-1)
                    }
                })
        },
        link() {
          this.$router.push({path:'/admin/tea_res'})
        },
        getData(val) {
            this.resourceUrl = val
        }
    },
}
</script>
<style lang="scss" scoped>
    @keyframes roundAni {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .dww{
        margin-top: 20px;
    }
    .downloading{
        vertical-align: middle;
        display: inline-block;
    }
    .round-loading-wrap {
        vertical-align: middle;
        position: relative;
        width: 25px;
        height: 25px;
        animation: roundAni 1s linear infinite;
        display: inline-block;
        left: 11px;
    }

    .round-loading {
        position: absolute;
        z-index: 2;
        border-radius: 100%;
        width: 25px;
        height: 25px;
        background-color: transparent;
        border: 2px solid #0378f4;
        border-bottom-color: transparent;
        border-left-color: transparent;
        box-sizing: border-box;
    }
    .round-loading-1 {
        transform: rotate(140deg);
    }
    .addTea_res{
        padding-left: 50px;
        text-align: left;
        .ivu-btn{
            width: 120px;
            height: 50px;
        }
        .p1{
            font-size: 20px;
            margin-top: 20px;
        }
        .bt{
            font-size: 16px;
            margin-top: 20px;
        }
        .uploadAll{
            position: relative;
            .upload1{
                width: 69px;
                height: 63px;
                line-height: 100px;
                text-align: center;
                border-bottom: 1px solid #57a3f3;
                margin-top: 40px;
                margin-left: 20px;
                font-size: 16px;
                color: #57a3f3;
            }
            .input-file{
                position: absolute;
                top: 0px;
                width: 200px;
                height: 75px;
                margin-left: 20px;
                opacity: 0;
                cursor: pointer;
            }
        }
        .ivu-btn{
            margin-left: 30px;
            margin-top: 30px;
        }
        .ty{
            font-size: 16px;
            margin-top: 20px;
            .ivu-radio-group{
                margin-left: 10px;
            }
        }
        .nr{
            font-size: 16px;
            margin-top: 20px;
            .s1{
                vertical-align: top;
            }
            .jj{
                width: 600px;
                height: 100px;
            }
        }
    }
</style>
