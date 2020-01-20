<template>
    <div class="admin_editArticle">
        <Button @click="link">返回</Button>
        <p class="p1">修改文章</p>
        <div class="bt">
            <span>标题：</span>
            <input type="text" v-model="title"/>
        </div>
        <div class="nr">
            <span>内容详情: </span>
            <edit ref="mychild" @reloadData="getData"></edit>
            <div class="bt">
                <span v-for="(item,index) in resourceNameList" style="margin-left: 20px">{{item.fileName}}<a style="margin-left: 10px;" v-on:click="deletebt(item.articleFileId)">删除</a></span>
            </div>
            <div class="uploadAll">
                <div class="upload1">
                    上传附件
                </div>
                <upload @uploadName="getName" @upload="getDosData"></upload>
            </div>
            <!--            <Button>取消</Button>-->
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
                        this.getDataByid()
                    }
                },
                immediate:true
            }
        },
        data () {
            return {
                dosData:{},
                resourceNameList:[],
                token:'',
                id:'',
                title:'',
                newsContent:'',
                phone: 'apple',
            }
        },
        methods:{
            getName(data) {
                // console.log(data)
                this.dosData = {}
                this.dosData.fileName = data
            },
            getDosData(val) {
                this.dosData.fileUrl = val
                this.resourceNameList.push(this.dosData)
            },
            deletebt(val) {
                var url = this.GLOBAL+"/board/article/file/"+val
                this.$http.delete(url,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    console.log(res)
                    this.getDataByid()
                })
            },
            submitData() {
                var data = {
                    "articleTitle":this.title,
                    "articleContent":this.newsContent,
                    "articleId":this.id,
                }
                data.articleFileList = this.resourceNameList
                var url = this.GLOBAL+"/board/article"
                console.log(data)
                this.$http.put(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                    .then(res => {
                        if(res.data.code == 0) {
                            alert("修改成功")
                            this.$router.go(-1)
                        }
                        console.log(res)
                    })
                console.log(data)
            },
            //根据id查询
            getDataByid() {
                var url = this.GLOBAL+"/board/article/"+this.id
                this.$http.get(url, {
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    console.log(res)
                    this.resourceNameList = res.data.data.articleFileList
                    var data = res.data.data
                    this.title = data.articleTitle
                    this.newsContent = data.articleContent
                    this.trans(data.articleContent)
                })
            },
            link() {
                this.$router.push({path:'/admin/tea_article'})
            },
            getData(val) {
                this.newsContent = val
                console.log('---'+val)
            },
            trans(val) {
                this.$refs.mychild.transData(val);
            },
        },
    }
</script>
<style lang="scss" scoped>
    .admin_editArticle{
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
            .bt{
                font-size: 16px;
                margin-top: 20px;
            }
        }
    }
</style>
