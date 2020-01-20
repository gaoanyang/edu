<template>
    <div class="admin_shModifi">
        <Button @click="link">返回</Button>
        <p class="p1">修改文章</p>
        <div class="bt"><span>标题：</span><input type="text" v-model="title"/></div>
        <div class="nr">
            <span>内容详情: </span>
            <edit ref="mychild" @reloadData="getData"></edit>
            <Button>取消</Button><Button @click="submitData">确定</Button>
        </div>
    </div>
</template>
<script>
    import edit from '../common/edit'
    export default {
        components:{edit},
        watch: {
            "$route":{
                handler(to){
                    var user = JSON.parse(sessionStorage.getItem("user"))
                    this.token  = user.access_token
                    this.id = user.userId
                    if(to.query.id != undefined) {
                        this.articleId = to.query.id
                        this.getDataByid()
                    }
                },
                immediate:true
            }
        },
        data () {
            return {
                articleId:'',
                token:'',
                id:'',
                title:'',
                newsContent:'',
                phone: 'apple',
            }
        },
        methods:{
            submitData() {
                var data = {
                    "articleTitle":this.title,
                    "articleContent":this.newsContent,
                    "articleId":this.articleId,
                }
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
                var url = this.GLOBAL+"/board/article/"+this.articleId
                this.$http.get(url, {
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    var data = res.data.data
                    this.title = data.articleTitle
                    this.newsContent = data.articleContent
                    this.trans(data.articleContent)
                })
            },
            link() {
                this.$router.push({path:'/admin/share_article'})
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
    .admin_shModifi{
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
    }
</style>
