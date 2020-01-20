<template>
    <div class="plaza_home">
        <div class="main">
            <mul_cdts
                @studioData="mulData"
                @pageData="mulPageData"
                :homeActive="type"
                ref="mul"
            ></mul_cdts>
            <div class="line"></div>
<!--            &lt;!&ndash; 待做内容 &ndash;&gt;-->
<!--            <ul class="pxUl">-->
<!--                <li class="li1">-->
<!--                    <span class="s1">排序:</span>-->
<!--                </li>-->
<!--                <li v-for="(item,index) in visit" :key="index">-->
<!--                    <span @click="CActive(index)" :class="{active:dActive==index}">{{item}}</span>-->
<!--                </li>-->
<!--            </ul>-->
            <ul class="gzsUl">
              <li class="gzsli" v-for="(item,index) in data" :key="index" :class="index%4 == 0?'li0':'li1'" @click="changeTab(item.studioId)">
                <div class="desA">
                  <div class="leftImg">
                    <img :src="item.leader.avatar" />
                  </div>
                  <div class="rightMain">
                    <p class="p1">
                        {{item.studioName}}
                    </p>
                    <p class="p2">
                      <span class="s1">领衔</span><span class="s2">{{item.leader.fullName}}</span>
                    </p>
                    <p class="p3">
                        <span class="s1">工作室人数:</span><span class="s2">{{item.memberNumber}}</span>
                    </p>
                    <p class="p4">{{item.title}}</p>
                  </div>
                </div>
                <div class="bottom">
                  <div class="b1">
                    <p>{{item.articleNumber}}</p><p>文章</p>
                  </div>
                  <div class="b1">
                      <p>{{item.resourceNumber}}</p><p>资源</p>
                  </div>
                  <div class="b1">
                      <p>{{item.courseNumber}}</p><p>课程</p>
                  </div>
                </div>
              </li>
              <div style="clear:both"></div>
              <Nav1
                      @sendPage="getPage"
                      :total='this.total'
                      :currentPage='this.currentPage'
                      :pageSize='1'></Nav1>
            </ul>
        </div>

    </div>
</template>
<script>
    import Nav1 from '@/components/pageNav'
    import mul_cdts from '../common/mul_cdts'
    export default {
        components:{mul_cdts,Nav1},
        data() {
            return {
                type:'',
                total:1,
                currentPage:1,
                token:'',
                isActive:901,
                dActive:1,
                isActive1:false,
                isActive2:false,
                data:[],
                data1:[],
                data2:[],
                show1:false,
                show2:false,
                items:[
                    {name:"公共课程",id:1},
                    {name:"学科课程",id:2},
                    {name:"专项课程",id:3},
                    {name:"幼教课程",id:4}
                ],
                visit:["访问多","成员多","资源多","文章"],
            }
        },
        methods:{
            getPage(val) {
                this.getData(val)
            },
            mulData(data) {
              this.data = data
            },
            mulPageData(val) {
              this.currentPage = 1
              this.total = val
            },
            CActive(val) {
                this.dActive = val
            },
            changeTab(id) {
                window.location.href="/work/work.html#/plazaHome?studioId=" + id
            },
            //分页查询
            getData(page,type) {
                var url = this.GLOBAL.baseURL+"/portal/studio/page?page="+page+"&size=12"+"&studioCategory="+this.type
                this.$http.get(url).then(res => {
                    this.data = res.data.data.data
                    console.log(res)
                    this.total = res.data.data.totalPages
                    this.currentPage = res.data.data.page
                })
            },
        },
        mounted() {
            this.$emit('getMessage', 4);
            let url = window.location.href
            if(url.indexOf('=') != '-1'){
                this.type = url.substring(url.indexOf('=')+1)
                this.$refs.mul.getCourse(this.type)
            }
            this.getData(1)
        }
    }
</script>
<style scoped lang="scss">
    .plaza_home{
        padding-top: 14px;
        padding-bottom: 14px;
        width: 100%;
        background: #E7F5FE;
        min-height: 800px;
        .main{
            position: relative;
            width: 1200px;
            background: #ffffff;
            /*height: 100%;*/
            margin: auto;
            padding: 40px 30px 169px 30px;
            min-height: 800px;
            .gzsUl{
                .li1{
                    margin-left: 20px;
                }
                .li0{
                    margin-left: 20px;
                }
               .gzsli{
                   cursor:pointer;
                   margin-top: 20px;
                   float: left;
                   border: 1px solid #DDDDDD;
                   width: 260px;
                   height: 240px;
                   list-style: none;
                   padding: 30px 13px 8px 13px;
                   .desA{
                       width: 100%;
                       height: 138px;
                     .leftImg{
                        width: 80px;
                        height: 80px;
                        float: left;
                       img{
                         width: 100%;
                         height: 100%;
                         border-radius:50%;
                       }
                     }
                     .rightMain{
                         padding-top: 8px;
                         padding-left: 8px;
                         text-align: left;
                         width: 150px;
                         float: left;
                         .p1{
                             color:#222222;
                             font-size: 17px;
                         }
                         .p2{
                             margin-top: 8px;
                            .s1{
                                color: #444444;
                                font-size: 14px;
                            }
                             .s2{
                                 font-size: 14px;
                                 color: #008CFA;
                                 margin-left: 21px;
                             }
                         }
                         .p3{
                             .s1{
                                 color: #444444;
                                 font-size: 14px;
                             }
                             .s2{
                                 font-size: 14px;
                                 color: #008CFA;
                                 margin-left: 15px;
                             }
                         }
                         .p4{
                             color: #888888;
                             font-size: 12px;
                             margin-top: 17px;
                         }
                     }
                   }
                   .bottom{
                       width: 220px;
                       height: 50px;
                       margin: auto;
                       margin-top: 20px;
                       border-top: 1px solid #EAEAEA;
                       display:flex;
                       justify-content: space-around;
                       align-items: center;
                       .b1{
                         /*display: inline-block;*/
                         width: 34px;
                         height: 34px;
                       }
                   }
               }
            }
            .pxUl{
                margin-bottom: 10px;
                margin-top: 35px;
                color: #444444;
                font-size: 16px;
                text-align: left;
              li{
                cursor:pointer;
                margin-left: 32px;
                display: inline-block;
                .active{
                    border-bottom: 2px solid #008CFA;
                    padding-bottom: 8px;
                    color: #008CFA;
                }
              }
              .li1{
                  margin-left: 0px;
              }
            }
            .line{
                height: 1px;
                width: 1140px;
                margin: auto;
                background: #EAEAEA;
                margin-top: 30px;
            }
            .mul_cdts{
            }
            .list{
                margin-right: 20px;
                width: 200px;
                height: 200px;
                background: white;
                display: inline-block;
            }
            .last{
                margin-right: 0px;
            }
        }
    }

</style>
