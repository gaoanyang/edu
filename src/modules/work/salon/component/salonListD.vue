<template>
    <div class="plaza_salonListD">
      <div class="main">
        <div class="title">
            <span>{{commentName}}</span>
<!--            <Button type="primary">只看楼主</Button>-->
        </div>
        <div class="mainList" v-for="(item,index) in data" :key="index">
          <ul class="m_ul">
            <li class="touxli">
              <div class="touxd">
                <img class="touximg" :src=item.avatar>
              </div>
            </li>
            <li class="name">
              <span>{{item.fullName}}</span>
            </li>
            <li class="huati hj">
<!--              <span>岗位:</span>-->
                <span v-if="item.position == 1">领衔人</span>
                <span v-else-if="item.position == 2">引领专家</span>
                <span v-else-if="item.position == 3">名师团队成员</span>
                <span v-else-if="item.position == 4">成员</span>
<!--                <span>{{item.position == 2}}</span>-->
            </li>
            <li class="jinghua hj" style="margin-top: 2px;">
<!--                <span>精华:</span>-->
                <span>{{item.label}}</span>
            </li>
<!--            <li class="jifen hj" style="margin-top: 2px;">-->
<!--                <span>积分:</span><span>1200</span>-->
<!--            </li>-->
          </ul>
          <div class="mainRight">
              <span>{{item.comment}}</span>
              <div class="kong"></div>
              <div class="All">
                  <div class="hfAll">
                      <div class="yd">
<!--                          <span>阅读:</span><span style="margin-left: 8px;">8</span>-->
                      </div>
                      <div class="hf">
<!--                          <span>回复:</span><span style="margin-left: 8px;">23</span>-->
                      </div>
                  </div>
                  <div class="date">
                      {{item.gmtCreate}}
                  </div>
              </div>
          </div>
        </div>
          <div class="footer">
              <Nav1
                      :total=total
                      :currentPage=currentPage
                      :pageSize='1'
                      @sendPage="getPage"
                      ref="child"
            ></Nav1>
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
              <Button :class="loginShow == true?'active':''"
                      class="bd1"
                      @click="comment"
              >提交评论</Button>
          </div>
      </div>
    </div>
</template>
<script>
import Nav1 from '@/components/pageNav'
export default {
    components:{Nav1},
    data() {
        return {
            loginShow:false,
            commentName:'',
            data:[],
            issueId:'',
            total:1,
            currentPage:1,
            pl:'参与评论'
        }
    },
    methods:{
        getPage(page) {
            this.currentPage = page
            this.getIssueById(this.issueId,this.currentPage,page)
        },
        getIssueById(id,page) {
            var url =  this.GLOBAL.baseURL + '/portal/issue/' + id + '?page='+page+'&size=10&studioId='+sessionStorage.getItem('studioId')
            this.$http.get(url).then(res => {
                this.data = res.data.data.data
                this.total = res.data.data.totalPages
                this.currentPage = res.data.data.page
                console.log(this.data)
            });
        },
        //提交评论
        comment() {
            var url = this.GLOBAL.baseURL+"/board/issue/comment"
            var data = {
                "issueId" : this.issueId,
                "comment" : this.value17
            }
            console.log(data)
            this.$http.post(url, data,{
                headers:{
                    'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('user')).access_token
                }
            }).then(res => {
                    if(res.data.code == 0) {
                        alert("评论成功")
                        this.getIssueById(this.issueId,1)
                    }
                    console.log(res)
                })
        }
    },
    watch: {
        "$route":{
            handler(to){
                if(to.query.id) {
                    this.issueId = to.query.id
                    this.commentName = to.query.name
                    this.getIssueById(to.query.id,1)
                }
                let user = JSON.parse(sessionStorage.getItem("user"))
                if(user) {
                    this.loginShow = true
                }
            },
            immediate:true
        }
    },
}
</script>
<style lang="scss">
    .plaza_salonListD{
        .ivu-input-wrapper{
            textarea{
                margin-top: 20px;
                width: 838px;
                height: 161px;
            }
        }
    }
</style>
<style scoped lang="scss">
    .plaza_salonListD{
        display: inline-block;
        width: 886px;
        min-height: 720px;
        background: #ffffff;
        .main{
            width: 838px;
            margin: auto;
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
          .footer{
            position: relative;
            height: 137px;
            width: 886px;
            .elePage{
                bottom: 50px;
            }
          }
          .title{
              font-size: 18px;
              height: 60px;
              padding-top: 28px;
              border-bottom: 1px solid #EAEAEA;
              text-align: left;
              .ivu-btn-primary{
                  float: right;
                  width: 60px;
                  height: 24px;
                  padding: 0px;
                  font-size: 12px;
                  background: #EAF6FE;
                  color: #008CFA;
                  border-color: #008CFA;
              }
              .lz{

              }
          }
          .mainList{
            border-bottom: 1px solid #EAEAEA;
            min-height: 254px;
            .mainRight{
                min-height: 254px;
                width: 728px;
                display: inline-block;
                padding: 29px 16px 24px 40px;
                text-align: left;
                position: relative;
                .kong{
                    height: 30px;
                    width: 100%;
                }
                .All{
                    color: #AAAAAA;
                    font-size: 12px;
                    padding-bottom: 20px;
                    position: absolute;
                    bottom: 0px;
                    width: 672px;
                    display: flex;
                    justify-content: space-between;
                    .hfAll{
                        width: 143px;
                        display: inline-block;
                        .yd{
                          width:90px;
                        }
                        div{
                            display: inline-block;
                        }
                    }
                    .date{
                        display: inline-block;
                    }
                }
            }
            .m_ul{
                display: inline-block;
                height: 254px;
                width: 110px;
                padding-top: 30px;
                padding-bottom: 24px;
                padding-left: 10px;
                vertical-align: top;
              .name{
                margin-top: 14px;
                font-size: 16px;
                color: #008CFA;
                margin-bottom: 8px;
              }
              .hj{
                  color: #666666;
                  font-size: 12px;
              }
              .touxli{
                .touxd{
                  width:100px;
                  height: 100px;
                  .touximg{
                      width: 100%;
                      height: 100%;
                  }
                }
              }
              li{
                list-style: none;
                text-align: left;
              }
            }
          }
        }
    }
</style>
