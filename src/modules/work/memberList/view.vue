<template>
    <div class="memberList">
        <div class="ar_title">
            <span class="s1">工作室成员</span>
            <span class="jt">&gt;</span>
            <span class="s2">成员列表</span>
        </div>
        <div class="ar_content">
          <div class="left">
            <div class="desc1">
              <title-line
                     :title="title"
              ></title-line>
              <div class="innerL">
                <div class="innerImg">
                  <img class="img1":src="leaderData.avatar">
                </div>
                <div class="innerName">
                  <span class="s1 s">领衔人</span><span class="s2 s"> {{leaderData.fullName}}</span>
                </div>
                <div class="innerNameTitle">
                    {{leaderData.label}}
                </div>
                <ul>
<!--                  <li class="l1"><span style="color: #444444;">学科:</span><span>高中语文</span></li>-->
                  <li class="l2"><span style="color: #444444;">职称:</span>
                      <span v-if="leaderData.jobTitle == '0'">正高级教师</span>
                      <span v-if="leaderData.jobTitle == '1'">高级教师</span>
                      <span v-if="leaderData.jobTitle == '2'">一级教师</span>
                      <span v-if="leaderData.jobTitle == '3'">二级教师</span>
                      <span v-if="leaderData.jobTitle == '4'">三级教师</span>
                  </li>
                  <li class="l3"><span style="color: #444444;">单位:</span><span>{{leaderData.organization}}</span></li>
                </ul>
              </div>
              <div class="innerR">
                <div class="je">
                    名师简介
                </div>
                <div class="desc">{{leaderData.introduction}}</div>
              </div>
            </div>
            <div class="desc2" v-show="expert.length > 0">
                <Men
                    :title3="title4"
                    :expertData="expert"
                ></Men>
            </div>
            <div class="desc2"  v-show="teacher.length > 0">
              <Men
                :title3="title3"
                :expertData="teacher"
              ></Men>
            </div>
            <div class="MencountS" v-show="userMember.length > 0">
               <Mencount
                :countLength="countLength"
                :title2="mencount_title"
                ></Mencount>
               <ul class="menLb">
                 <li class="menLbs" v-for="(item,index) in userMember" :key="index" :class="[index%9==0?'li1':'li2']">
                   <div class="menImg">
                     <img :src="item.avatar"/>
                   </div>
                   <p class="menPeo">{{item.fullName}}</p>
                   <div style="clear:both"></div>
                 </li>
               </ul>
            </div>
          </div>
          <div class="right">
            <Visit
                :visitors = "visitors"
                :todayVisits = "todayVisits"
                :totalVisits = "totalVisits"
            ></Visit>
          </div>
        </div>
    </div>
</template>
<script>
import Men from './components/men'
import Mencount from './components/mencount'
import Visit from '../common/visit'
export default {
    components:{Men,Mencount,Visit},
    data() {
        return {
          teacher:[],
          leaderData:{},
          expert:[],
          countLength:0,
          mencount_title:'工作室成员',
          data:[],
          title:'成员列表',
          title2:'引领专家',
          title3:'名师团队',
          title4:'引领专家',
          userMember:[],
          visitors:[],
          todayVisits:'',
          totalVisits:''
        }
    },
    methods:{
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
        },
        //获取领衔人
        getLeader() {
            var url = this.GLOBAL.baseURL+"/portal/user/leader/"+sessionStorage.getItem('studioId')
            this.$http.get(url).then(res => {
                console.log(res)
                this.leaderData = res.data.data
                console.log( this.leaderData)
            })
        },
        //获取引领专家
        getExpert() {
            var url = this.GLOBAL.baseURL+"/portal/user/expert/"+sessionStorage.getItem('studioId')
            this.$http.get(url).then(res => {
                this.expert = res.data.data
            })
        },
        getAxios() {
            this.$http.get("/api/member").then(res => {
                this.data = res.data.data1
            }).catch(error=>{
            });
        },
        //获取名师团队
        getTeacher() {
            var url = this.GLOBAL.baseURL+"/portal/user/teacher/"+sessionStorage.getItem('studioId')+"/20"
            this.$http.get(url).then(res => {
                this.teacher = res.data.data
                console.log(this.teacher)
            })
        },
        getUserMember() {
            var url = this.GLOBAL.baseURL+"/portal/user/member/"+sessionStorage.getItem('studioId')
            this.$http.get(url).then(res => {
                this.userMember = res.data.data
                this.countLength = res.data.data.length
            });
        }
    },
    created() {
        this.getLeader()
        this.getExpert()
        this.getAxios()
        this.getUserMember()
        this.getTeacher()
        this.getVisitor()
    }
}
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
.memberList{
    padding-bottom: 14px;
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
        width: 1200px;
        margin: auto;
        .left{
          display: inline-block;
          width:886px;
          background: #ffffff;
          margin: 0px;
          vertical-align: top;
          padding-left: 24px;
          padding-right: 24px;
          padding-bottom: 60px;
          .desc1{
            .innerL{
                display: inline-block;
                height: 374px;
                width: 221px;
                padding-left: 17px;
                text-align: left;
                padding-top: 31px;
                .innerImg{
                    width: 140px;
                    height: 140px;
                    .img1{
                        width: 100%;
                        height: 100%;
                        margin-left: 19px;
                        border-radius: 140px;
                    }
                }
                .innerName{
                    margin-top: 15px;
                    margin-left: 19px;
                    width: 140px;
                    display: flex;
                    justify-content: space-between;
                    padding-bottom: 5px;
                    border-bottom: 1px solid #008CFA;
                    .s{
                      font-size: 20px;
                    }
                    .s1{
                        color: #222222;
                        margin-left: 6px;
                    }
                    .s2{
                        color: #008CFA;
                        margin-right: 6px;
                    }
                }
                .innerNameTitle{
                    color: #444444;
                    margin-left: 19px;
                    font-size: 12px;
                    width: 140px;
                    text-align: center;
                    margin-top: 8px;
                }
                ul{
                    margin-top: 18px;
                    li{
                        list-style: none;
                        font-size: 12px;
                        color: #666666;
                        line-height: 20px;
                    }
                    .l1{

                    }
                }
            }
            .innerR{
                display: inline-block;
                height: 374px;
                vertical-align: top;
                padding-top: 31px;
                width: 617px;
                text-align: left;
                .je{
                    font-size: 18px;
                    color: #222222;
                }
                .desc{
                    font-size: 14px;
                    color: #666666;
                    padding-right: 21px;
                    margin-top: 13px;
                }
            }
          }
        .MencountS{
          .menLb{
            .li1{
                margin-left: 17px;
            }
              .li2{
                  margin-left: 40px;
              }
            .menLbs{
                margin-top: 18px;
                float: left;
                list-style: none;
              .menImg{
                  width:54px;
                  height:54px;
                  img{
                      width: 100%;
                      height: 100%;
                      border-radius:50%;
                  }
              }
              .menPeo{
                  color: #008CFA;
                  font-size: 14px;
                  margin-top: 10px;
              }
            }
          }
        }
        }
        .right{
          margin-left: 14px;
          display: inline-block;
          width:300px;
          background: #ffffff;
        }
    }
}
</style>
