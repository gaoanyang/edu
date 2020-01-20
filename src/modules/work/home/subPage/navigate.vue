<template>
    <div class="navigate">
        <div class="t_hdzx">
          <div class="th_left">
            <div class="title">
              <div class="hdzx">活动资讯</div>
                <router-link to='/activity_consult'><div class="gd">更多</div></router-link>
            </div>
            <ul>
              <li v-for="(item,index) in dataZx" :key="index">
                  <div class="lit"></div>
                  <span @click="linkNoticeD(item.newsId,1)">{{item.newsTitle}}</span>
              </li>
            </ul>
          </div>
          <div class="th_right">
              <div class="zxgg">最新公告</div>
              <div class="ggxq">
                  <div class="title title-common">{{dataGg_.newsTitle}}</div>
                <div class="xq"><div class="gg1">各名师工作室成员：</div>
                    <div class="gg2">{{dataGg_.newsIntroduction}}</div>
                </div>
                <div class="date">
                  <div class="date1">{{dataGg_.gmtCreate}}</div>
                  <div class="date2" @click="linkNoticeD(dataGg[0].newsId,2)">查看全文</div>
                </div>
              </div>
          </div>
        </div>
        <div class="t_pilot">
            <div class="lingh">名师领航</div>
            <div class="lis">
                <div class="title title-common">
                    <div class="hdzx">专家文章</div>
                    <router-link to='/pg_article'><div class="gd">更多</div></router-link>
                </div>
                <ul>
                    <li v-for="(item,index) in  articleData" :key="index">
                      <div class="lit"></div>
                        <span class="title" @click="link((item.articleId))">{{item.articleTitle}}</span>
                        <div class="nd">
                            <span class="name">{{item.fullName}}</span>
                            <span class="date">{{item.gmtCreate}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="lis2">
                <div class="title title-common">
                    <div class="hdzx">学习资源</div>
                    <router-link to='/pg_resource'><div class="gd">更多</div></router-link>
                </div>
                <ul>
                  <li class="left" v-for="(item,index) in dataResource">
                      <img src="../../../../assets/wj.png">
                      <div v-on:click="downRes(item.resourceUrl)" style="display: inline-block">
                          <span class="title">{{item.resourceName | ellipsis}}</span>
                      </div>

                      <!--                      <a v-on:click="downRes(item.resourceUrl)"><span class="title">{{item.resourceName}}</span></a>-->
                  </li>
                </ul>
            </div>
            <div class="lis3">
                <div class="title title-common">
                    <div class="hdzx">名师课程</div>
                    <router-link to='/pg_course'>
                        <div class="gd">更多</div>
                    </router-link>
                </div>
                <div class="all_course">
                    <div class="firse_course c" :class="index%4 == 0?'firse_course':'courseD'" @click="link_pg_courseD(item.courseId)" v-for="(item,index) in dataCourse">
                      <div class="sptp">
                        <img class="img1" :src="item.courseThumbnail">
                        <img class="img2" src="../../../../assets/icon_player.png">
                      </div>
                      <div class="title">
                          {{item.courseName}}
                      </div>
                      <div class="title2">
                          <span>{{item.fullName}}</span>
                          <span class="date">2019-10-23</span>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="t_salon salonWzComon">
            <div class="lis">
                <div class="title title-common">
                    <div class="hdzx">沙龙话题</div>
                    <router-link to='/p_salon'>
                        <div class="gd">更多</div>
                    </router-link>
                </div>
                <ul>
                    <li @click="linkSalonD(item.issueId)" v-for="(item,index) in dataSalon">
                        <div class="lit"></div><span class="title">{{item.issueName}}</span>
                        <div class="nd"><span class="name">{{item.fullName}}</span><span class="date">{{item.gmtCreate}}</span>
                            <span class="count">{{item.commentNum}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        components:{},
        props:['dataZx','dataGg'],
        data() {
            return {
                dataResource:[],
                dataCourse:[],
                dataSalon:[],
                dataGg_:'',
                articleData:[]
            }
        },
        methods:{
            downRes(val) {
                if(sessionStorage.getItem('user')) {
                    if(val == "") {
                        return
                    }
                    if(sessionStorage.getItem('studioId') == JSON.parse(sessionStorage.getItem('user')).studioId&&val!= "") {
                        window.location.href = val
                    }else{
                        alert("仅提供本工作室人员下载")
                    }
                }else{
                    alert('请登录')
                }
            },
            link(val) {
                this.$router.push({path:'/pg_articleD',query:{id:val}})
            },
            //名师领航-专家文章
            getArticleList(page) {
                var url =  this.GLOBAL.baseURL + "/portal/article/page?page="+page+"&size=10&articleType=0&studioId="+sessionStorage.getItem('studioId')
                this.$http.get(url).then(res => {
                    console.log(res)
                    this.articleData = res.data.data.data
                });
            },
            //学习资源
            getResourceList() {
                var url = this.GLOBAL.baseURL + "/portal/resource/page?page=1&size=10&studioId=" + sessionStorage.getItem('studioId') + "&resourceType=0"
                this.$http.get(url).then(res => {
                    console.log('--------------')
                    console.log(res)
                    this.dataResource = res.data.data.content
                });
            },
            //沙龙话题
            getSalonList() {
                var url =  this.GLOBAL.baseURL + '/portal/issue/page?page=1&size=6&studioId='+sessionStorage.getItem('studioId')
                console.log(url)
                this.$http.get(url).then(res => {
                    this.dataSalon = res.data.data.data
                    console.log(this.dataSalon)
                });
            },
            //名师课程
            getCourse() {
                var url = this.GLOBAL.baseURL + "/portal/course/page?page=1&size=4&studioId="+sessionStorage.getItem('studioId')
                console.log(url)
                this.$http.get(url).then(res => {
                    this.dataCourse = res.data.data.data
                    console.log(this.dataCourse)
                })
            },
            linkNoticeD(val,type) {
                if(type == 1) {
                    this.$router.push({path:'/a',query:{id:val}})
                }else if(type == 2) {
                    this.$router.push({path:'/b',query:{id:val}})
                }
            },
            link_pg_courseD(val) {
                this.$router.push({path:'/pg_courseD',query:{id:val}})
            },
            linkSalonD(val) {
                this.$router.push({path:'salonD',query:{id:val}})
            },

        },
        watch:{
            "dataGg":{
                handler: function (val, oldVal) {
                    if(val.length != 0){
                        this.dataGg_ = val[0]
                        console.log(this.dataGg_)
                    }
                },
                immediate:true
            }
        },
        filters:{
            ellipsis(value){
                if (!value) return '';
                if (value.length > 27) {
                    return value.slice(0,27) + '...'
                }
                return value
            }
        },
        mounted() {
            this.getSalonList()
            this.getArticleList(1)
            this.getResourceList()
            this.getCourse()
        }
    }
</script>
<style scoped lang="scss">
.salonWzComon{
    ul{
        margin-top: 18px;
        li{
            font-size:14px;
            font-weight:400;
            color:rgba(68,68,68,1);
            line-height:34px;
            list-style: none;
            text-align: left;
            .lit{
                display: inline-block;
                width:4px;
                height:4px;
                background:rgba(0,140,250,1);
                margin-right: 7px;
            }
            .nd{
                display: inline-block;
                float: right;
                .name{
                    font-size:14px;
                    color:rgba(0,140,250,1);
                    margin-right: 100px;
                }
                .date{
                    margin-right: 80px;
                    color:#444444;
                }
                .count{
                    display: inline-block;
                    width: 39px;
                }
            }
        }
    }
}
.title-common{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #EAEAEA;
    .hdzx{
        border-bottom: 2px solid #008CFA;
        display: inline-block;
        font-size:18px;
        font-weight:400;
        color:rgba(34,34,34,1);
        line-height:32px;
    }
    .gd{
        display: inline-block;
        font-size:14px;
        font-weight:400;
        color:rgba(0,140,250,1);
        line-height:32px;
    }
}
.navigate{
    margin-bottom:14px;
    width: 886px;
    vertical-align: top;
    display: inline-block;
    .t_pilot{
      .lingh{
          font-size: 20px;
          color: #008cfa;
          width: 839px;
          text-align: left;
          margin: auto;
          margin-top: 30px;
          box-sizing: border-box;
          display: inline-block;
      }
      .lis3{
          display: inline-block;
          width: 839px;
          margin-top: 19px;
          .all_course{
            width: 839px;
            height: 230px;
            margin-top: 30px;
            .c{
               float: left;
               cursor: pointer;
            }
            .courseD{
              width:200px;
              height:230px;
              margin-left:13px
            }
            .c{
              vertical-align: top;
              display: inline-block;
              width:200px;
              height:250px;
              border:1px solid rgba(234, 234, 234, 1);
              .sptp{
                width:180px;
                height:136px;
                margin: auto;
                margin-top: 10px;
                position: relative;
                .img1{
                    width: 100%;
                    height: 100%;
                }
                .img2{
                    position: absolute;
                    left: 0px;
                    right: 0px;
                    top: 0px;
                    bottom: 0px;
                    margin: auto;
                }
              }
              .title{
                  width: 180px;
                  font-size: 16px;
                  margin: auto;
                  margin-top: 18px;
                  text-align: left;
              }
              .title2{
                  display: flex;
                  justify-content: space-between;
                  width: 180px;
                  margin: auto;
                  margin-top: 10px;
                  .date{
                      color: #AAAAAA;
                  }
              }
            }
          }
      }
      .lis2{
          display: inline-block;
          width: 839px;
          margin-top: 19px;
          height: 280px;
          ul{
              margin-top: 18px;
            a{
                color: #444444;
            }
              /*}*/
              li{
                text-align: left;
                width:50%;
                list-style: none;
                display: inline-block;
                line-height:32px;
                float: left;
                font-size: 14px;
                .title{
                    padding-left: 4px;
                }
                .title:hover{
                    cursor: pointer;
                    color: #008cfa;
                    border-bottom: 1px solid #008cfa;
                }
                img{
                  vertical-align: middle;
                }
              }
          }
      }
      .lis{
          display: inline-block;
          width: 839px;
          margin-top: 19px;
          height: 280px;
          ul{
              margin-top: 18px;
              li{
                  font-size:14px;
                  font-weight:400;
                  color:rgba(68,68,68,1);
                  line-height:34px;
                  list-style: none;
                  text-align: left;
                  .title:hover{
                      cursor: pointer;
                      color: #008cfa;
                      border-bottom: 1px solid #008cfa;
                  }
                  .lit{
                      display: inline-block;
                      width:4px;
                      height:4px;
                      background:rgba(0,140,250,1);
                      margin-right: 7px;
                  }
                  .nd{
                      display: inline-block;
                      float: right;
                      .name{
                          font-size:14px;
                          color:rgba(0,140,250,1);
                          margin-right: 100px;
                      }
                      .date{
                          color:#AAAAAA;
                      }
                  }
              }
          }
      }
    }
    .t_hdzx{
      display: inline-block;
      width: 886px;
      height: 340px;
      vertical-align: top;
      background: #ffffff;
      margin-top:14px;
      .th_left {
          display: inline-block;
          width: 542px;
          margin-top:30px;
          ul{
              margin-top: 18px;
            li{
              font-size:14px;
              font-weight:400;
              color:rgba(68,68,68,1);
              line-height:34px;
              list-style: none;
              text-align: left;
              span:hover{
                  cursor: pointer;
                  color: #008cfa;
                  border-bottom: 1px solid #008cfa;
              }
              .lit{
                  display: inline-block;
                  width:4px;
                  height:4px;
                  background:rgba(0,140,250,1);
                  margin-right: 7px;
              }
            }
          }
        .title{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #EAEAEA;
          .hdzx{
            border-bottom: 2px solid #008CFA;
            display: inline-block;
            font-size:18px;
            font-weight:400;
            color:rgba(34,34,34,1);
            line-height:32px;
          }
          .gd{
            display: inline-block;
            font-size:14px;
            font-weight:400;
            color:rgba(0,140,250,1);
            line-height:32px;
          }
        }
      }
      .th_right{
          display: inline-block;
          width: 280px;
          vertical-align: top;
          margin-top: 30px;
          text-align: left;
          margin-left: 17px;
        .zxgg{
          font-size:18px;
          font-weight:400;
          color:rgba(34,34,34,1);
          line-height:32px;
        }
        .ggxq{
          width: 280px;
          height: 260px;
          background: rgba(255,255,255,1);
          border: 1px solid rgba(184, 226, 252, 1);
          .title{
            margin-top: 31px;
            margin-left: 20px;
            font-size: 16px;
          }
          .xq{
              height: 145px;
              width: 238px;
              margin: auto;
              color: #888888;
              line-height: 24px;
              margin-top: 22px;
          }
          .date{
              display: flex;
              justify-content: space-between;
              width: 238px;
              margin: auto;
            .date2{
                cursor: pointer;
                color: #008CFA;
                font-size: 14px;
            }
            .date1{
                color:#AAAAAA;
                font-size: 14px;
            }
            div{
                display: inline-block;
            }
          }
        }
      }
    }
    .t_pilot{
      height: 1010px;
      width: 886px;
      background: #ffffff;
      margin-top: 14px;
    }
    .t_salon{
      margin-top: 14px;
      width:886px;
      height:290px;
      background:rgba(255,255,255,1);
      .lis{
          display: inline-block;
          width: 839px;
          margin-top: 19px;
          height: 280px;
          ul{
            li{
                cursor: pointer;
                .title:hover{
                    cursor: pointer;
                    color: #008cfa;
                    border-bottom: 1px solid #008cfa;
                }
            }
          }
      }
    }
}
</style>
