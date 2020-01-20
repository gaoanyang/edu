<template>
    <div class="admin_article">
        <Button @click="link">返回</Button>
        <p class="p1">发布文章</p>
        <div class="bt"><span>标题：</span><input type="text" v-model="title"/></div>
        <div class="nr">
            <span>内容详情: </span>
            <edit ref="mychild" @reloadData="getData"></edit>
            <div class="bt">
<!--                <span>附件名称：</span>-->
<!--                <input type="text" v-model="resourceName" style="width: 300px"/>-->
                <span v-for="(item,index) in resourceNameList" style="margin-left: 20px">{{item.fileName}}</span>
            </div>
            <div class="uploadAll">
                <div class="upload1">
                    上传附件
                </div>
                <upload @uploadName="getName" @upload="getDosData" @uploadloading="getupload"></upload>
                <div class="dww" style="display: none">
                    <div class="downloading">正在上传中，请耐心等待</div>
                    <div class="round-loading-wrap">
                        <div class="round-loading"></div>
                        <div class="round-loading round-loading-1"></div>
                    </div>
                </div>
            </div>
            <Button type="primary" @click="submitData" style="margin-top: 20px">确定</Button>
        </div>
    </div>
</template>
<script>
    import upload from '@/components/uploadDos'
    import edit from '../common/edit'
    export default {
        components:{edit,upload},
        watch: {
            "$route":{
                handler(to){
                    var user = JSON.parse(sessionStorage.getItem("user"))
                    this.token  = user.access_token
                    this.id = user.userId
                    if(to.query.id != undefined) {
                        this.id = to.query.id
                    }
                },
                immediate:true
            }
        },
        data () {
            return {
                status:"",
                dosData:{},
                token:'',
                id:'',
                title:'',
                newsContent:'',
                phone: 'apple',
                resourceNameList:[]
            }
        },
        methods:{
            getupload(val) {
                this.status = val
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
                // console.log(data)
                this.dosData = {}
                this.dosData.fileName = data
            },
            getDosData(val) {
                this.dosData.fileUrl = val
                this.resourceNameList.push(this.dosData)
            },
            submitData() {
                if(this.status == 0) {
                    return
                }
                var data = {
                    "articleTitle":this.title,
                    "articleType":0,
                    "articleContent":this.newsContent,
                    "studioId":this.id,
                }
                data.articleFileList = this.resourceNameList
                var url = this.GLOBAL+"/board/article"
                console.log(data)
                this.$http.post(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                        if(res.data.code == 0) {
                            alert("新增成功")
                            this.$router.go(-1)
                        }
                        console.log(res)
                    })
                console.log(data)
            },
            link() {
                this.$router.push({path:'/admin/tea_article'})
            },
            getData(val) {
                this.newsContent = val
                console.log('---'+val)
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
    .admin_article{
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
            input{
                width: 700px;
            }
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
        }
        .bt{
            font-size: 16px;
            margin-top: 20px;
        }
        .uploadAll{
            position: relative;
            .upload1{
                width: 69px;
                height: 25px;
                /* line-height: 100px; */
                text-align: center;
                border-bottom: 1px solid #57a3f3;
                margin-top: 25px;
                margin-left: 20px;
                font-size: 16px;
                color: #57a3f3;
            }
            .input-file{
                position: absolute;
                top: 0px;
                width: 200px;
                height: 25px;
                margin-left: 20px;
                opacity: 0;
                cursor: pointer;
            }
        }
    }
</style>
