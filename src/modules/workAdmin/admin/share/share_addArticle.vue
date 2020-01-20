<template>
    <div class="admin_shModifi">
        <Button @click="link">返回</Button>
        <p class="p1">发布文章2</p>
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
                        this.id = to.query.id
                    }
                },
                immediate:true
            }
        },
        data () {
            return {
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
                    "articleType":1,
                    "articleContent":this.newsContent,
                    "studioId":this.id,
                }
                var url = this.GLOBAL+"/board/article"
                console.log(data)
                this.$http.post(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                    .then(res => {
                        if(res.data.code == 0) {
                            alert("新增成功")
                            this.$router.go(-1)
                        }
                        console.log(res)
                    })
                console.log(data)
            },
            link() {
                this.$router.push({path:'/admin/share_article'})
            },
            getData(val) {
                this.newsContent = val
                console.log('---'+val)
            }
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
