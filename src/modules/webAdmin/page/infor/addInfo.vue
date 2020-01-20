<template>
    <div class="admin_addInfo">
        <Button @click="link">返回</Button>
        <p class="p1">新增资讯</p>
        <div class="bt">
            <span>标题：</span>
            <input type="text" v-model="title"/>
        </div>
        <div class="des">
            <span>简介：</span>
            <Input v-model="des" maxlength="200" show-word-limit type="textarea" placeholder="" style="width: 400px;height:135px" />
        </div>
        <div class="hfimg">
            <span class="s1"></span>
            <div class="sc">
                <upload :uploadType="`head`" :imgWidth="`520px`" :imgHeight="`160px`" :imgUrl="imgUrl"
                        @upload="getImgUrl" :message="message"></upload>
            </div>
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
            <edit ref="mychild" @reloadData="getData"></edit>
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
                imgUrl:'',
                message:"确认上传",
                des:'',
                id:'',
                newsContent:'',
                news_type:'1',
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
                this.$router.push({path:'/infor'})
            },
            //提交
            submitData() {
              var data = {
                  "newsTitle":this.title,
                  "newsType":Number(this.news_type),
                  "newsContent":this.newsContent,
                  "studioId":this.id,
                  "newsIntroduction":this.des,
                  "imageUrl":this.imgUrl,
                  "kind":0
              }
            var url = this.GLOBAL+"/board/news"
            console.log(data)
            console.log(this.token)
            this.$http.post(url, data,{
                headers:{
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(res => {
                if(res.data.code == 0) {
                    alert("新增成功")
                    this.$router.push({path:'/infor'})
                }
                console.log(res)
            })
              console.log(data)
            },

            clickqx() {
                this.$refs.mychild.cancel();
            },
            clickqd() {
                this.$refs.mychild.confirm();
            },
            getData(val) {
                console.log(this.newsContent)
                this.newsContent = val
            }
        },
        mounted() {
            var a = JSON.parse(sessionStorage.getItem("adminuser"))
            console.log(a)
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
            font-size: 16px;
            margin-top: 20px;
            input{
                width: 700px;
            }
        }
        .des{
            margin-top: 20px;
            font-size: 16px;
            /deep/ textarea{
                width: 100%;
                height: 100%;
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
            margin-top: 70px;
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
