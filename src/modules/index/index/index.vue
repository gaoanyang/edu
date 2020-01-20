<template>
    <div class="indexI">
        <div class="banner" style="position: relative;">
<!--            <Carousel>-->
<!--                <Carousel-item>-->
                    <div class="demo-carousel">
                        <img src="../images/banner.png"/>
<!--                        <div class="wz">-->
<!--                            <span>网络同步课程开始征集啦</span>-->
<!--                        </div>-->
<!--                        <i-button type="primary" shape="circle" @click="">查看详情</i-button>-->
                    </div>
<!--                </Carousel-item>-->
<!--                <Carousel-item>-->
<!--                    <div class="demo-carousel">-->
<!--                        <img src="../images/banner_bg.png"/>-->
<!--                    </div>-->
<!--                </Carousel-item>-->
<!--                <Carousel-item>-->
<!--                    <div class="demo-carousel">-->
<!--                        <img src="../images/banner_bg.png"/>-->
<!--                    </div>-->
<!--                </Carousel-item>-->
<!--                <Carousel-item>-->
<!--                    <div class="demo-carousel">-->
<!--                        <img src="../images/banner_bg.png"/>-->
<!--                    </div>-->
<!--                </Carousel-item>-->
<!--            </Carousel>-->
            <login1></login1>
        </div>
        <div class="bck">
            <div class="main">
                <div class="title">
                    工作室广场
                </div>
                <div class="checkAll">
                    <div class="check">
                        <img src="../images/icon_01.png">
                        <p class="c1">校园长、书记学习共同体</p>
                        <p class="c2">
                            发挥名校园长的引领作用，营造校园长、书记带头学习的氛围，创新校园长、书记学习、研修模式，促进校园长、书记专业发展，推动学校、
                            幼儿园管理创新。
                        </p>
                        <i-button type="primary" @click="linkStudio(0)">进入</i-button>
                    </div>
                    <div class="check">
                        <img src="../images/icon_02.png">
                        <p class="c1">名师工作室</p>
                        <p class="c2">
                            以名师带动教师队伍建设，实现资源共享、智慧 生成、全员提升，使工作室成为优秀青年教师 的集聚地和未来名师的孵化器。
                        </p>
                        <i-button type="primary" @click="linkStudio(1)">进入</i-button>
                    </div>
                    <div class="check">
                        <img src="../images/icon_03.png">
                        <p class="c1">名班主任（德育导师）工作室</p>
                        <p class="c2">
                            打造班主任（德育导师）工作实训和研究基地， 培训、培养名优骨干班主任（德育导师）， 培育我区名优班主任（德育导师）品牌。
                        </p>
                        <i-button type="primary" @click="linkStudio(2)">进入</i-button>
                    </div>
                </div>
                <div class="zxgg">
                  <div class="zx">
                      <div class="title-common">
                          <div class="hdzx">活动资讯</div>
                          <router-link to='/activity_index'>
                              <div class="gd">更多</div>
                          </router-link>
                      </div>
                      <div class="inner">
                          <div class="imgD">
                              <img :src="dataZx[0].imageUrl" />
<!--                              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576666038426&di=e5a96efec4cde428b79b1cd1d24aef46&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F18%2F03%2F05%2F19955f265ff7a7c9333679d0de1d0d34.jpg%2521%2Ffwfh%2F804x717%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue" />-->
                          </div>
                          <div class="rit">
                              <p class="p1" @click="link(dataZx[0].newsId)">{{dataZx[0].newsTitle}}</p>
                              <p class="p2">{{dataZx[0].newsIntroduction | ellipsis}}</p>
<!--                              <p class="p2">{{dataZx[0].newsIntroduction}}</p>-->
                              <articleList
                                      :name="false"
                                      :data="dataZx"
                                      :url="url"
                                      :zxorgg="0"
                              ></articleList>
                          </div>
                      </div>
                  </div>
                  <div class="gg">
                      <div class="title-common">
                          <div class="hdzx">公告通知</div>
                          <router-link to='/activity_notice'>
                              <div class="gd">更多</div>
                          </router-link>
                      </div>
                      <articleList
                              class="myUl2"
                              :name="false"
                              :data="dataGg"
                              :date="false"
                              :url="urlgg"
                              :zxorgg="1"
                      ></articleList>
                  </div>
                </div>
                <div class="msfc">
                  <div class="m1">
                    <div class="title-common">
                        <div class="hdzx">名师风采</div><router-link to='/teach_index'><div class="gd">更多</div></router-link>
                    </div>
                    <Carousel
                            :arrow="setting.arrow">
                      <CarouselItem v-for="(item,index) in dataFc" :key="index">
                        <div class="demo-carousel" @click="msfc_link(item.newsId)">
                          <div class="imgD">
                            <img :src="item.imageUrl" />
                          </div>
                            <div class="des">
                              <p class="p1">{{item.newsTitle}}</p>
                              <p class="p2">{{item.newsIntroduction}}</p>
                            </div>
                        </div>
                      </CarouselItem>
                    </Carousel>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import login1 from '@/components/login1'
import articleList from '../common/articleList'
export default {
components:{articleList,login1},
props:['dataZx','dataGg','dataFc'],
data() {
    return {
        setting: {
            arrow: 'always'
        },
        url:'/b',
        urlgg:'/a'
    }
},
methods:{
    link(id) {
        this.$router.push({path:this.url,query:{id:id}})
    },
    linkStudio(type) {
        this.$router.push({path:"/plaza_home",query:{type:type}})
    },
    msfc_link(val) {
       this.$router.push({path:"/c",query:{id:val}})
    },
},
mounted() {
    this.$emit('getMessage', 0);
},
filters:{
    ellipsis(value){
        if (!value) return '';
        if (value.length > 10) {
            return value.slice(0,100) + '...'
        }
        return value
    }
}
}
</script>
<style lang="scss">
.indexI {
    .m1{
        padding: 30px 24px 0px 24px;
        .ivu-carousel-dots{
            display: none;
        }
        .ivu-carousel{
            .ivu-carousel-arrow{
                background-color: #ffffff;
                width: 44px;
                height: 44px;
                border: 1px solid #008CFA;
                color: #008CFA;
                font-size: 2em;
            }
            .ivu-carousel-list{
                height: 400px;
            }
        }
    }
    .myUi1{
      padding-left: 24px;
      li{
        margin-top: 16px;
      }
    }
    .myUl2{
        padding-left: 0px;
        li{
            margin-top: 16px;
            .bottomHover{
                display: inline-block;
                width: 241px;
                vertical-align: top;
            }
        }
    }
    .ivu-carousel-dots-inside {
        bottom: 30px;
        left: 360px;
        display: block;
        position: absolute;
        width: 140px;
        height: 34px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 17px;

        button {

        }
    }

    .ivu-carousel-dots {
        .ivu-carousel-active {
            button {
                width: 16px;
                height: 8px;
                background: rgba(255, 255, 255, 1);
                border-radius: 4px;
                opacity: 1;
            }
        }

        li {
            padding: 12px 0;
            margin: 0 9px;

            button {
                width: 8px;
                height: 8px;
                background: rgba(255, 255, 255, 1);
                opacity: 0.4;
                border-radius: 50%;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.demo-carousel{
    position: relative;
    height: 460px;
    img{
        width: 100%;
        height: 100%;
    }
}
.indexI{
    .title-common{
        border-bottom: 1px solid #E7E7E7;
        display: flex;
        justify-content: space-between;
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
.indexI{
    .ivu-carousel{
        .ivu-btn-circle{
            position: absolute;
            top: 293px;
            left: 360px;
            background-color: #FAE212;
            width: 160px;
            height: 44px;
            color: #3C70FF;
            font-size: 14px;
        }
        .wz{
            position: absolute;
            top: 100px;
            left: 360px;
            width: 369px;
            height: 140px;
            font-size: 60px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(255,255,255,1);
            text-align: left;
        }
        .ivu-carousel-dots-inside {
            bottom: 30px;
            left: 360px;
            display: block;
            position: absolute;
            width: 140px;
            height: 34px;
            background: rgba(0,0,0,0.1);
            border-radius: 17px;
            button{

            }
        }
        .ivu-carousel-dots{
          .ivu-carousel-active{
            button{
                width:16px;
                height:8px;
                background:rgba(255,255,255,1);
                border-radius:4px;
                opacity: 1;
            }
          }
          li{
              padding: 12px 0;
              margin: 0 9px;
            button{
                width: 8px;
                height: 8px;
                background: rgba(255,255,255,1);
                opacity: 0.4;
                border-radius: 50%;
            }
            }
          }
        }
        .bck{
            background: #E7F5FE;
            padding-bottom: 30px;
        .main{
            width: 1200px;
            margin: auto;
            .zxgg{
                height: 425px;
                background: #ffffff;
                margin-top: 30px;
              .zx{
                vertical-align: top;
                display: inline-block;
                width: 886px;
                height: 100%;
                padding: 30px 24px 50px 24px;
                .inner{
                    margin-top: 30px;
                    .imgD{
                        display: inline-block;
                        width: 380px;
                        height: 285px;
                        vertical-align: top;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .rit{
                      display: inline-block;
                      width: 458px;
                      .p1{
                          margin-left: 24px;
                          font-size:20px;
                          color:rgba(0,140,250,1);
                          text-align: left;
                      }
                      .p2{
                          text-indent:25px;
                          font-size: 12px;
                          color: #888888;
                          margin-top: 16px;
                          margin-left: 24px;
                          text-align: left;
                      }
                    }
                }
              }
              .gg{
                padding: 30px 24px 30px 38px;
                display: inline-block;
                width: 314px;
                height: 100%;
              }
            }
            .msfc{
                width: 1200px;
                height: 465px;
                background: #ffffff;
                margin-top: 30px;
                .m1{
                    padding: 30px 24px 0px 24px;
                    .demo-carousel{
                        cursor: pointer;
                        width: 908px;
                        margin: auto;
                        margin-top: 56px;
                        height: 286px;
                      .imgD{
                          display: inline-block;
                          height: 285px;
                          width: 380px;
                          vertical-align: middle;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                      }
                      .des{
                          text-align: left;
                          color: #666666;
                          font-size: 14px;
                          vertical-align: middle;
                          width: 527px;
                          display: inline-block;
                          height: 259px;
                          p{
                              padding-left: 40px;
                          }
                          .p1{
                              color: #222222;
                              font-size:24px;
                              font-weight:400;
                          }
                          .p2{
                              text-indent: 25px;
                              margin-top: 23px;
                          }
                      }
                    }
                }
            }
            .title{
                font-size:40px;
                color: #222222;
                padding-top: 60px;
            }
            .checkAll{
                margin-top: 49px;
                display: flex;
                justify-content: space-between;
                .check{
                    position: relative;
                    display: inline-block;
                    width: 380px;
                    height: 380px;
                    background: #ffffff;
                    img{
                        margin-top: 40px;
                    }
                    .c1{
                     margin-top: 26px;
                     font-size: 20px;
                    }
                    .c2{
                        color: #888888;
                        margin: 12px 36px 0px 36px;
                        line-height: 21px;
                        font-size: 14px;
                    }
                    .ivu-btn-primary{
                        width: 140px;
                        height: 40px;
                        position: absolute;
                        bottom: 30px;
                        left: 0px;
                        right: 0px;
                        margin: auto;
                        font-size: 14px;

                    }
                }
            }
        }
        }

    }

</style>
<style scoped lang="scss">
</style>
