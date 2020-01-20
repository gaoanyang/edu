<template>
    <div class="navPeople">
        <div class="headPeople">
          <div class="lx commons">
            <div class="commonTitle">
              <div class="commonlxr">领衔人</div>
            </div>
            <div class="commonPeople">
                <div class="dimg">
                    <img class="dimg1" :src="leaderData.avatar"/>
                </div>
                <div class="name">
                    {{leaderData.fullName}}
                </div>
                <div class="nameExplain">
                    {{leaderData.label}}
                </div>
                <div class="nameExplain2">
                    {{leaderData.introduction}}
                </div>
                <router-link to='/memberList'><div class="jieshao">更多介绍</div></router-link>
            </div>
          </div>
          <div class="zj commons" v-show="expert.length>0">
              <div class="commonTitle">
                  <div class="commonlxr2">引领专家</div>
              </div>
              <div class="commonPeople" v-for="(item,index) in expert" :key="index">
                  <div class="dimg">
                      <img class="dimg1" :src="item.avatar"/>
                  </div>
                  <div class="name">
                      {{item.fullName}}
                  </div>
                  <div class="nameExplain">
                        {{item.label}}
                  </div>
                  <div style="clear:both"></div>
              </div>
          </div>
          <div class="team commons">
              <div class="commonTitle">
                  <div class="commonlxr2">名师团队</div>
              </div>
              <div class="commonPeople" v-for="(item,index) in teacher">
                  <div class="dimg">
                      <img class="dimg1" :src="item.avatar"/>
                  </div>
                  <div class="name">
                      {{item.fullName}}
                  </div>
                  <div class="nameExplain">{{item.label}}</div>
                  <div style="clear:both"></div>
              </div>
          </div>
          <div class="gzsbottom">
            <div class="gzscy"><span>工作室人数</span> <span class="c1">{{userNumber}}</span></div>
              <router-link to='/memberList'><span class="cylb">成员列表</span></router-link>
          </div>
        </div>
        <div class="visitor">
            <div class="visitorsub">
                <div class="commonTitle">
                    <div class="commonlxr2">最近访客</div>
                </div>
                <div class="fk">
                  <div class="fkxx" :class="index%3 == 0 ? 'flxx0':'fkxx1' " v-for="(item,index) in visitors">
                    <div class="imgdiv">
                        <img v-if="item.avatar == null" src="https://gzs-file.oss-cn-beijing.aliyuncs.com/e1051d72-028e-4611-816e-1c81294b0a03.jpg" />
                        <img v-else :src="item.avatar" />
                    </div>
                    <div class="name">{{item.fullName}}</div>
                    <div class="date">{{item.gmtCreate}}</div>
                  </div>
                </div>
                <div style="clear:both"></div>
                <div class="v-bottom">
                <div class="vball">
                    <div class="vb1 vb">
                        <span class="d1">今日访问量</span>
                        <span class="d2">{{todayVisits}}</span>
                    </div>
                    <div class="vb2 vb">
                        <span class="d1">总访问量</span>
                        <span class="d2">{{totalVisits}}</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        components:{},
        data() {
            return {
                todayVisits:'',
                totalVisits:'',
                visitors:[],
                teacher:[],
                leaderData:{},
                expert:[],
                userNumber:''
            }
        },
        methods:{
            //获取领衔人
            getLeader() {
                var url = this.GLOBAL.baseURL+"/portal/user/leader/"+sessionStorage.getItem('studioId')
                this.$http.get(url).then(res => {
                    this.leaderData = res.data.data
                })
            },
            //获取引领专家
            getExpert() {
                var url = this.GLOBAL.baseURL+"/portal/user/expert/"+sessionStorage.getItem('studioId')
                this.$http.get(url).then(res => {
                   this.expert = res.data.data
                })
            },
            //获取名师团队
            getTeacher() {
                var url = this.GLOBAL.baseURL+"/portal/user/teacher/"+sessionStorage.getItem('studioId')+'/5'
                this.$http.get(url).then(res => {
                    this.teacher = res.data.data
                    console.log(this.teacher)
                })
            },
            //获取工作室成员数量
            getUserNumber() {
                var url = this.GLOBAL.baseURL+"/portal/user/member/number/"+sessionStorage.getItem('studioId')
                this.$http.get(url).then(res => {
                    this.userNumber = res.data.data
                })
            },
            //最近访问人
            getVisitor() {
                var url = this.GLOBAL.baseURL+"/portal/visitor/"+sessionStorage.getItem('studioId')
                this.$http.get(url).then(res => {
                    console.log(res)
                    this.visitors = res.data.data.top9Visits
                    this.todayVisits = res.data.data.todayVisits
                    this.totalVisits = res.data.data.totalVisits
                    for(var i = 0;i < this.visitors.length;i++) {
                        var oldTime = (new Date(this.visitors[i].gmtCreate)).getTime();
                        var curTime = (new Date(oldTime)).format("MM-dd");
                        this.visitors[i].gmtCreate = curTime
                    }
                })
            }
        },
        filters:{
            ellipsis(value){
                if (!value) return '';
                if (value.length > 14) {
                    return value.slice(0,14) + '...'
                }
                return value
            }
        },
        mounted() {
            this.getLeader()
            this.getExpert()
            this.getUserNumber()
            this.getTeacher()
            this.getVisitor()
        }
    }
</script>
<style scoped lang="scss">
    .visitorsub{
        width: 252px;
        margin: auto;
        .v-bottom{
          width: 100%;
          border-top: 1px solid rgba(234,234,234,1);;
          margin-top: 38px;
          .vball{
              width: 200px;
              margin: auto;
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
              .vb{
                  display: inline-block;
                  width: 70px;
                  .d1{
                      font-size:14px;
                      color:rgba(68,68,68,1);
                  }
                  .d2{
                      font-size: 18px;
                      color: #008cfa;
                      margin-top: 5px;
                      display: inline-block;
                  }
              }
              .vb1{

              }
              .vb2{
                width: 57px;
              }
          }
        }
        .commonTitle{
            font-size:18px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(34,34,34,1);
            padding-top: 30px;
            text-align: left;
            border-bottom: 1px solid #EAEAEA;
            /*height: 65px;*/
            .commonlxr{
                height: 35px;
                width: 54px;
                border-bottom: 2px solid #008CFA;
            }
            .commonlxr2{
                height: 35px;
                width: 72px;
                border-bottom: 2px solid #008CFA;
            }
        }
        .fk{
            width: 232px;
            margin: auto;
            height: 100px;
            .fkxx{
              vertical-align: top;
              margin-top:30px;
              width:54px;
              height: 100px;
              display: inline-block;
              float: left;
              .imgdiv{
                width: 54px;
                height:54px;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .name{
                  font-size:14px;
                  color:rgba(0,140,250,1);
                  margin-top: 7px;
              }
              .date{
                margin-top: 7px;
                font-size: 12px;
              }
            }
            .fkxx1{
              margin-left:35px;
            }
            .fkxx2{
              margin-left:35px;
            }
        }
    }
    .headPeople{
        /*display: inline-block;*/
        width:300px;
        background: #ffffff;
        /*margin-top: 14px;*/
      .gzsbottom{
          height: 58px;
          line-height: 49px;
          display: flex;
          justify-content: space-between;
          width: 252px;
          margin: auto;
          margin-top: 25px;
          font-size: 14px;
          .gzscy{
              display: inline-block;
          }
          .c1{
              color: #008CFA;
              margin-left: 14px;
          }
          .cylb{
              color:#008CFA;
          }
      }
      .commons{
          width: 252px;
          margin: auto;
        .commonTitle{
            font-size:18px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(34,34,34,1);
            padding-top: 30px;
            text-align: left;
            border-bottom: 1px solid #EAEAEA;
            /*height: 65px;*/
            .commonlxr{
              height: 35px;
              width: 54px;
              border-bottom: 2px solid #008CFA;
            }
            .commonlxr2{
                height: 35px;
                width: 72px;
                border-bottom: 2px solid #008CFA;
            }
        }
        .commonPeople{
            .name{
              width:132px;
              text-align: left;
              margin-top: 40px;
              color: #008CFA;
              font-size:20px;
              display: inline-block;
            }
            .nameExplain{
                width:132px;
                display: inline-block;
                text-align: left;
                margin-top: 7px;
            }
            .nameExplain2{
                color: #888888;
                margin-top: 30px;
                font-size: 14px;
                text-align: left;
            }
            .jieshao{
                margin-top: 20px;
                font-size: 14px;
                color: #008CFA;
                text-align: right;
            }
            .dimg{
                margin-top: 30px;
                width: 90px;
                height: 90px;
                display: inline-block;
                float: left;
                .dimg1{

                    width:100%;
                    height: 100%;
                    border-radius: 90px;
                }
            }
        }
      }
    }
    .navPeople{
        margin-top: 14px;
        margin-left: 14px;
        display: inline-block;
        .visitor{
            margin-top: 14px;
            width:300px;
            height:633px;
            background:rgba(255,255,255,1);
        }
    }
</style>
