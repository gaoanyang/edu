<template>
<div>
    <div class="mul_cdts">
        <div class="cdt" id="id_curs_type">
            <div class="tlte box1">类型</div>
            <div class="items">
                <div class="bx box1" :class="{ active:'901'==isActive }" @click="getCourse('901')">不限</div>
                <div :class="{ active:item.id==isActive }" class="innitem box1" :key="index" v-for="(item,index) in items" @click="getCourse(item.id,index)">
                    {{item.name}}
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        <div class="cdt" id="id_curs_module" v-if="show1">
            <div class="tlte box1">区域</div>
            <div class="items">
                <div class="bx box1" :class="{ active:'902'==isActive1 }" @click="getMou('902')">不限</div>
                <div :class="{ active:item.id==isActive1 }" class="innitem box1" :key="index" v-for="(item,index) in data1" @click="getMou(item.id,index)">
                    {{item.name}}
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        <div class="cdt" id="id_curs_special" v-if="show2">
            <div class="tlte box1">学段</div>
            <div class="items">
                <div class="bx box1" :class="{ active:'903'==isActive2 }" @click="getSpecial('903')">不限</div>
                <div :class="{ active:item.id==isActive2 }" class="innitem box1" :key="index" v-for="(item,index) in data2" @click="getSpecial(item.id)">
                    {{item.name}}
                </div>
            </div>
        </div>
        <div style="clear: both"></div>
    </div>
    <div class="ord">
        <span class="s2">综合排序<div class="myLine"></div></span>
        <span class="s1" :class="[activeIndex == 0?'active':'']" @click="c_sort(0)">最新<div class="myLine"></div></span>
        <span class="s1" :class="[activeIndex == 1?'active':'']" @click="c_sort(1)">最热<div class="myLine"></div></span>
        <span class="s1" :class="[activeIndex == 2?'active':'']" @click="c_sort(2)">好评<div class="myLine"></div></span>
    </div>
    <ul class="course_ul" id="id_course_ul">
      <li v-for="(items,index) in data" :key="index" :class="index%5 == 0?'li0':'li1'">
        <div class="pic">
            <a>
              <img :src="items.img" class="img_ful" />
            </a>
            <img class="playImgs" src="../images/icon_player.png" />
        </div>
        <div class="tit">
            <a href="">{{items.title}}</a>
        </div>
        <div class="inf">
            <div class="type">
                <p class="blue">{{items.type}}</p>
            </div>
            <div class="eval">满意度：<span>99.82%</span></div>
            <div style="clear: both"></div>
        </div>
      </li>
      <div style="clear: both"></div>
        <Nav1
                :total='100'
                :currentPage='10'
                :pageSize='1'
        ></Nav1>
    </ul>
</div>
</template>
<script>
    import Nav1 from '@/components/pageNav'
    export default {
        components:{Nav1},
        data() {
            return {
                data:[],
                items:[
                    {name:"公共课程",id:1},
                    {name:"学科课程",id:2},
                    {name:"专项课程",id:3},
                    {name:"幼教课程",id:4}
                ],
                activeIndex:0,
                isActive:901,
                isActive1:false,
                isActive2:false,
                data1:[],
                data2:[],
                show2:false,
                dataT:'课程资源',
                type:"教学资源",
                show1:false
            }
        },
        methods:{
            c_sort(val) {
              this.activeIndex = val
            },
            getCourse(val) {
                this.isActive=val;
                if(val ==901){
                    this.show1 = false
                    this.show2 = false
                    return
                }
                this.$http.get("/api/resType").then(res => {
                    this.data1 = res.data.data
                    this.show2 = false
                    this.show1 = true
                    this.isActive1 = '902'
                    console.log(this.data1)
                }).catch(error=>{
                    console.log(error);
                });
            },
            //选择模块
            getMou(val) {
                this.isActive1=val;
                if(val ==902){

                    this.show2 = false
                    return
                }
                this.$http.get("/api/resMou").then(res => {
                    this.data2 = res.data.data
                    this.show2 = true
                    this.isActive2='903'
                }).catch(error=>{
                    console.log(error);
                });
            },
            getSpecial(val) {
                this.isActive2=val;
            },
            getRes() {
                this.$http.get("/api/RCvideo").then(res => {
                    this.data = res.data.data
                    console.log(res)
                }).catch(error=>{
                    console.log(error);
                });
            }
        },
        created() {
            console.log(10%5)
            this.getRes()
        },

    }
</script>
<style lang="scss" scoped>
.playImgs{

}
.ord{
    background: #F4F4F4;
    margin-top: 30px;
    width: 100%;
    height: 44px;
    color: #444444;
    font-size: 14px;
    text-align: left;
    padding-left: 22px;
    .active{
        .myLine{
            width: 40px;
            height: 3px;
            margin: auto;
            background: #008CFA;
            position: relative;
            top: 10px;
        }
    }
    .s1{
      cursor:pointer;
      width: 40px;
      text-align: center;
      vertical-align: top;
      margin-left: 25px;
      /*width: 46px;*/
      display: inline-block;
    }
    .s2{
      display: inline-block;
    }
}
.course_ul{
    padding-bottom: 163px;
    .li1{
        margin-left: 20px;
    }
    .li0{

    }
    /*float: left;*/
    li{
      list-style: none;
      margin-left: 10px;
      margin-top: 20px;
      border: 1px solid #E7E7E7;
      padding: 10px 10px 19px 10px;
      float: left;
      width: 210px;
      height: 230px;
      .pic{
        position: relative;
        width: 190px;
        height: 136px;
      .playImgs{
              position: absolute;
              top: 0px;
              left: 0px;
              right: 0px;
              bottom: 0px;
              margin: auto;
        }
        a{
          img{
              width: 100%;
              height: 100%;
          }
        }
      }
      .tit{
          color: #3C3C3C;
          margin-top: 14px;
          text-align: left;
          width: 190px;
          line-height: 22px;
          font-size: 13px;
          /*margin: 4px;*/
          overflow: hidden;
          a{
            color: #3C3C3C;
          }
      }
      .inf{
          margin-top: 12px;
          width: 190px;

          .type{
            float: left;
            .blue{
                font-size: 14px;
                color: #008CFA;
            }
          }
          .eval{
            font-size: 12px;
            float: right;
            span{
                color:#FF5613;
            }
          }
      }
    }
}
.mul_cdts{
    #id_curs_module{
        margin-top: 20px;
    }
    #id_curs_special{
        margin-top: 20px;
    }
    .box1{
        cursor:pointer;
        font-size: 14px;
        line-height: 27px;
        min-width: 43px;
        height: 34px;
        padding: 5px 15px 5px 15px;
        border-radius: 5px;
    }
    .active{
        background: #008CFA;
        color: #ffffff;
    }
    .tlte{
        background: #cccccc;
        float: left;
        line-height: 25px;
        font-size: 14px;
        color: #ffffff;
        border-radius: 5px;
    }
    .items{
        width: 1000px;
        float: left;
        padding-left: 20px;
    .bx{
        float: left;
    }
    .innitem{
        float: left;
    }
    }
    #id_curs_module{

    }
}
</style>
