<template>
    <div class="plaza_articleD">
        <div class="ar_title">
            <span class="s1">工作室首页</span>
            <span class="jt">&gt;</span>
            <span class="s2">名师领航</span>
            <span class="jt">&gt;</span>
            <span class="s2">专家文章</span>
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
              <div class="wb" v-html='data.articleContent'></div>
              <div class="fj tfj">相关附件</div>
              <div class="fj lfj">
                <span v-on:click="downfj(item.fileUrl)" v-for="(item,index) in data.articleFileList" :key="index">{{item.fileName}}</span>
              </div>
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
                  <Button :class="loginShow == true?'active':''" class="bd1" @click="sendComment">提交评论</Button>
              </div>
              <div class="comment" v-for="(item,index) in comment" :key="index">
                <div class="line2"></div>
                <div class="alltx">
                    <img class="toux" :src=item.avatar />
                    <div class="allComment">
                        <div class="myname">{{item.fullName}}</div>
                        <div class="mycomment">{{item.comment}}</div>
                    </div>
                </div>
                <div class="alltime">
                    <span>{{item.gmtCreate}}</span>
                </div>
                  <div style="clear:both;"></div>
              </div>
              <div class="bottomDiv"></div>
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
                comment:[],
                articleId:'',
                data:'',
                pl:'评论留言',
                loginShow:false,
                value17: '',
                title:'名师领航',
                mainList:[
                    {name:'专家文章',sign:'/pg_article'},
                    {name:'名师课程',sign:'/pg_course'},
                    {name:'学习资源',sign:'/pg_resource'}
                ],
                nowIndex:0,
            }
        },
        methods:{
          //下载附件
          downfj(val) {
              if(sessionStorage.getItem('user')) {
                  if(sessionStorage.getItem('studioId') == JSON.parse(sessionStorage.getItem('user')).studioId) {
                      window.location.href = val
                  }else{
                      alert("仅提供本工作室人员下载")
                  }
              }else{
                  alert('请登录')
              }
          },
          //根据ID查询文章详情
          getArticleById(id) {
              var url = this.GLOBAL.baseURL + "/portal/article/"+id
              this.$http.get(url).then(res => {
                  this.data = res.data.data
                  console.log(this.data)
              })
          },
          //评论
          sendComment() {
              var url = this.GLOBAL.baseURL+"/board/article/comment"
              var data = {
                  "articleId":this.articleId,
                  "comment": this.value17
              }
              this.$http.post(url, data,{
                  headers:{
                      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('user')).access_token
                  }
              }).then(res => {
                  if(res.data.code == 0) {
                      alert("评论成功")
                      this.getComment()
                  }
                  console.log(res)
              })
          },
          //根据id获取评论
          getComment() {
            var url =  this.GLOBAL.baseURL + '/portal/article/comment/' + this.articleId
            this.$http.get(url).then(res => {
                console.log(res)
                this.comment = res.data.data
                // console.log(this.data)
            });
          }
        },
        watch: {
            "$route":{
                handler(to){
                    document.oncopy = function(){ return false; };
                    if(to.query.id != undefined) {
                        this.articleId = to.query.id
                        this.getArticleById(to.query.id)
                        this.getComment()
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
                .line2{
                    height: 1px;
                    background: #EAEAEA;
                    width:840px;
                    margin: auto;
                    margin-top: 13px;
                }
                .comment{
                    min-height: 111px;
                    width:840px;
                    margin: auto;
                    .alltx{
                        margin-top: 32px;
                        float: left;
                        .toux{
                            width: 46px;
                            height: 46px;
                            border-radius: 46px;
                        }
                        .allComment{
                            margin-left: 14px;
                            vertical-align: top;
                            display: inline-block;
                            width: 500px;
                            .myname{
                                font-size: 18px;
                               text-align: left;
                            }
                            .mycomment{
                                color: #666666;
                                font-size: 14px;
                                text-align: left;
                            }
                        }
                    }
                    .alltime{
                        margin-top: 38px;
                        font-size: 12px;
                        float: right;
                        color: #999999;
                    }
                }
                .bottomDiv{
                    height: 20px;
                    width: 840px;
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
                .fj{
                    width: 720px;
                    margin: auto;
                    text-align: left;
                    color: red;
                    font-size: 18px;
                }
                .tfj{
                    color: #008CFA;
                    font-weight: bold;
                }
                .lfj{
                    color: #008CFA;
                    margin-top: 10px;
                    span{
                        border-bottom: 1px solid #008CFA;
                        cursor: pointer;
                    }
                    span:not(:first-child){
                        margin-left: 15px;
                    }
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
