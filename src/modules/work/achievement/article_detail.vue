<template>
    <div class="plaza_articleD">
        <div class="ar_title">
            <span class="s1">工作室首页</span>
            <span class="jt">&gt;</span>
            <span class="s2">成果分享</span>
            <span class="jt">&gt;</span>
            <span class="s2">成员文章</span>
            <span class="jt">&gt;</span>
            <span class="s2">{{data.articleTitle}}</span>
        </div>
        <div class="ar_content">
            <left_nav
                    :title=title
                    :mainList=mainList
                    :nowIndex="nowIndex"
            >
            </left_nav>
            <div class="ar_nr">
                <div class="title">{{data.articleTitle}}</div>
                <div class="subtitle"><span class="s1">{{data.fullName}}</span><span class="s2">{{data.gmtCreate}}</span></div>
                <!--              <div class="tp">-->
                <!--                  <img class="tpi" src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=bbe8a73e36a85edfee81f671283d6246/1f178a82b9014a90f1da88d3ab773912b21beefc.jpg"/>-->
                <!--              </div>-->
                <div class="wb" v-html='data.articleContent'></div>
                <titleLine
                        :title="pl"
                ></titleLine>
                <Input v-model="value17" maxlength="100" show-word-limit type="textarea" />
                <div class="dlNN">
                    <div class="dl">
                        <div class="dl1" v-show="!loginShow">
                            <router-link to="work_login"><span class="sd1">登录</span></router-link>
                            <span class="sd2">后参与讨论</span>
                        </div>
                    </div>
                    <Button :class="loginShow == true?'active':''" class="bd1">提交评论</Button>
                </div>
            </div>
            <div style="clear:both;"></div>
        </div>
        <div class="air"></div>
    </div>
</template>
<script>
    import left_nav from '../common/left_nav'
    export default {
        components:{left_nav},
        data() {
            return {
                data:'',
                pl:'评论留言',
                loginShow:false,
                value17: '',
                title:'成果分享',
                mainList:[
                    {name:'成员文章',sign:'/pach_article'},
                    {name:'成员资源',sign:'/pach_resource'},
                ],
                nowIndex:0,
            }
        },
        methods:{
            //根据ID查询文章详情
            getArticleById(id) {
                var url = this.GLOBAL.baseURL + "/portal/article/"+id
                this.$http.get(url).then(res => {
                    this.data = res.data.data
                    console.log(this.data)
                })
            }
        },
        watch: {
            "$route":{
                handler(to){
                    if(to.query.id != undefined) {
                        this.getArticleById(to.query.id)
                    }
                    let user = JSON.parse(sessionStorage.getItem("user"))
                    if(user) {
                        this.loginShow = true
                    }
                },
                immediate:true
            }
        }

    }
</script>
<style lang="scss">
    .plaza_articleD{
        .ivu-input-wrapper{
            textarea{
                margin-top: 20px;
                width: 838px;
                height: 161px;
            }
        }
        .dlNN{
            .active{

            }
        }
    }
</style>
<style scoped lang="scss">
    *{ -webkit-user-select: none; }
    .plaza_articleD{
        background: #EAF6FE;
        .ar_title{
            width: 1200px;
            height: 56px;
            line-height: 56px;
            font-size: 14px;
            margin: auto;
            text-align: left;
            .s1{
                color: #444444;
            }
            .s2{
                color: #888888;
            }
            .jt{
                color: #888888;
                margin-left: 5px;
                margin-right: 5px;
            }
        }
        .ar_content{
            position: relative;
            width: 1200px;
            margin: auto;
            /*background: #ffffff;*/
            /*min-height: 720px;*/
            .emp{
                width: 14px;
                height: 100%;
            }
            .left_nav{
                position: absolute;
                left: 0px;
                height: 100%;
            }
            .ar_nr{
                float: right;
                margin-left:14px;
                display: inline-block;
                width: 886px;
                height: 100%;
                background: #ffffff;
                .dlNN{
                    display: flex;
                    justify-content: space-between;
                    width: 838px;
                    margin: auto;
                    margin-top: 20px;
                    padding-bottom: 20px;
                    .active{
                        background: #57a3f3 !important;
                    }
                    .bd1{
                        background: #DDDDDD;
                        color: #ffffff;
                        width: 100px;
                        height: 40px;
                    }
                    .dl{
                        display: inline-block;
                        vertical-align: top;
                        .dl1{
                            font-size: 14px;
                        }
                        .sd1{
                            color: #008CFA;
                        }
                        .sd2{
                            margin-left: 10px;
                        }
                    }
                }
                .ivu-input-wrapper{
                    textarea{
                        width: 838px;
                        height: 161px;
                    }
                }
                .title{
                    font-size:32px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(34,34,34,1);
                    text-align: center;
                    margin-top: 63px;
                }
                .subtitle{
                    width: 216px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    margin: auto;
                    margin-top: 25px;
                    .s1{
                        color: #008CFA;
                    }
                    .s2{
                        color:#AAAAAA;
                    }
                }
                .commonTitle{
                    margin-left:24px;
                    width: 838px;
                    margin: auto;
                    border-bottom: 1px solid #EAEAEA;
                }
                .tp{
                    width: 640px;
                    height: 420px;
                    margin: auto;
                    margin-top: 40px;
                    .tpi{
                        width: 100%;
                        height: 100%;
                    }
                }
                .wb{
                    word-wrap: break-word;
                    word-break: break-all;
                    overflow: hidden;
                    width: 720px;
                    margin: auto;
                    margin-top: 39px;
                    margin-bottom: 95px;
                    text-align: left;
                }
            }
        }
        .air{
            width: 100%;
            height: 13px;
            background: #EAF6FE;
        }
    }
</style>
