<template>
    <div class="admin_addInfo">
        <Button @click="link">返回</Button>
        <p class="p1">修改名师风采</p>
        <div class="bt">
            <span>标题：</span>
            <input type="text" v-model="title"/>
        </div>
        <div class="desc">
            <span>简介：</span>
            <textarea v-model="desc"></textarea>
        </div>
        <div class="hfimg">
            <span class="s1"></span>
            <div class="sc">

                <upload :uploadType="`head`" :imgWidth="`518px`" :imgHeight="`158px`" :imgUrl="imgUrl"
                        @upload="getImgUrl" :message="message"></upload>
            </div>
        </div>
        <div class="nr">
            <span>内容详情: </span>
            <edit ref="mychild" @reloadData="getData" :content='content'></edit>
            <Button @click="clickqx">取消</Button><Button @click="submitData">确定</Button>
        </div>
    </div>
</template>
<script>
    import upload from '../../common/upload'
    import edit from '../../common/edit'
    export default {
        components:{edit,upload},
        watch: {
            "$route":{
                handler(to){
                    var user = JSON.parse(sessionStorage.getItem("adminuser"))
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
                message:"确认上传",
                imgUrl:'',
                desc:'',
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
            getImgUrl(data) {
                console.log(data)
                this.imgUrl = data
            },
            //返回
            link() {
                this.$router.push({path:'/teacher'})
            },
            //修改
            submitData() {
                var data = {
                    "newsTitle":this.title,
                    "newsType":2,
                    "newsContent":this.newsContent,
                    "newsId":this.id,
                    "studioId":this.studioId,
                    "status":0,
                    "newsIntroduction":this.desc,
                    "imageUrl":this.imgUrl
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
                        this.$router.go(-1);
                    }
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
                    this.desc = data.newsIntroduction
                    this.imgUrl = data.imageUrl
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
    .admin_addInfo{
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
            margin-left: 32px;
            font-size: 16px;
            margin-top: 20px;
        }
        .desc{
            font-size: 16px;
            margin-top: 20px;
            textarea{
                vertical-align: top;
                width: 400px;
                height: 100px;
            }
        }
        .hfimg{
            .s1{
                vertical-align: top;
            }
            .sc{
                vertical-align: top;
                display: inline-block;
                margin-left: 0px;
                width: 520px;
                height: 160px;
                border: 1px solid;
                margin-top: 30px;
                .s2{
                    /*margin-left: 20px;*/
                    font-size: 16px;
                }
                .imgD{
                    margin-top: 20px;
                }
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
            margin-top: 70px;
        }
    }
</style>
