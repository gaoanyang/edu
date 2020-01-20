<template>
    <div class="admin_editInfo">
        <Button @click="link">返回</Button>
        <p class="p1">修改资讯</p>
        <div class="bt">
            <span>标题：</span>
            <input type="text" v-model="title"/>
        </div>
        <div class="des">
            <span>简介：</span>
            <Input v-model="des" maxlength="50" show-word-limit type="textarea" style="width: 300px;height: 100px" />
        </div>
        <div class="ty">
            <span>类别: </span>
            <RadioGroup v-model="news_type">
                <Radio label="1">资讯</Radio>
                <Radio label="0">公告</Radio>
            </RadioGroup>
        </div>
        <div class="nr">
            <span>内容详情: </span>
            <edit ref="mychild" @reloadData="getData" :content='content'></edit>
            <Button type="primary" @click="submitData">确定</Button>
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
                    this.studioId = user.studioId
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
                des:'',
                content:'',
                id:'',
                studioId:'',
                newsContent:'',
                news_type:'',
                title:'',
                phone: 'apple',
                token:''
            }
        },
        methods:{
            //返回
            link() {
                this.$router.push({path:'/admin/infor'})
            },
            //修改
            submitData() {
                var data = {
                    "newsTitle":this.title,
                    "newsType":Number(this.news_type),
                    "newsContent":this.newsContent,
                    "newsId":this.id,
                    "studioId":this.studioId,
                    "status":0,
                    "newsIntroduction":this.des
                }
                var url = this.GLOBAL+"/board/news"
                console.log(data)
                this.$http.put(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    if(res.data.code == 0) {
                        alert('修改成功')
                        this.$router.go(-1)
                    }
                    console.log(res)
                })
            },
            //根据id查询
            getDataByid() {
                var url = this.GLOBAL+"/board/news/"+this.id
                console.log(this.id)
                this.$http.get(url, {
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    console.log(res)
                    var data = res.data.data
                    this.title = data.newsTitle
                    this.news_type = String(data.newsType)
                    this.content = data.newsContent
                    this.des = data.newsIntroduction
                    this.trans(data.newsContent)
                })
            },
            clickqx() {
                this.$refs.mychild.cancel();
            },
            clickqd() {
                this.$refs.mychild.confirm();
            },
            trans(val) {
                this.$refs.mychild.transData(val);
            },
            getData(val) {
                this.newsContent = val
            }
        },
        mounted() {
        }
    }
</script>
<style lang="scss" scoped>
    .admin_editInfo{
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
        .des{
            margin-top: 20px;
            font-size: 16px;
            /deep/ textarea{
                width: 100%;
                height: 100%;
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
    }
</style>
