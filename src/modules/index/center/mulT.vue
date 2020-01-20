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

            <!--  学段 -->
            <div class="cdt" id="id_und">
                <div class="tlte box1">学段</div>
                <div class="items">
                    <div class="bx box1" :class="{ active:'903'==isActive3 }" @click="teachGrade('903')">不限</div>
                    <div :class="{ active:item.id==isActive3 }" class="innitem box1" :key="index" v-for="(item,index) in und_items" @click="teachGrade(item.id,index)">
                        {{item.name}}
                    </div>
                </div>
                <div style="clear: both"></div>
            </div>

            <div class="cdt" id="id_curs_special" v-if="show2">
                <div class="tlte box1">学科</div>
                <div class="items">
                    <div class="bx box1" :class="{ active:'904'==isActive4 }" @click="getSpecial('904')">不限</div>
                    <div :class="{ active:item.id==isActive4 }" class="innitem box1" :key="index" v-for="(item,index) in data2" @click="getSpecial(item.id)">
                        {{item.name}}
                    </div>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="cdt" id="id_curs_sys" v-if="show3">
                <div class="tlte box1">体系</div>
                <div class="items">
                    <div class="bx box1" :class="{ active:'905'==isActive5 }" @click="getSys('905')">不限</div>
                    <div :class="{ active:item.id==isActive5 }" class="innitem box1" :key="index" v-for="(item,index) in data3" @click="getSys(item.id)">
                        {{item.name}}
                    </div>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="cdt" id="id_teac_version" v-if="show4">
                <div class="tlte box1">体系</div>
                <div class="items">
                    <div class="bx box1" :class="{ active:'906'==isActive6 }" @click="getVersion('906')">不限</div>
                    <div :class="{ active:item.id==isActive6 }" class="innitem box1" :key="index" v-for="(item,index) in data4" @click="getVersion(item.id)">
                        {{item.name}}
                    </div>
                </div>
                <div style="clear: both"></div>
            </div>
            <div class="cdt" id="id_teac_lvlmod" v-if="show5">
                <div class="tlte box1">体系</div>
                <div class="items">
                    <div class="bx box1" :class="{ active:'907'==isActive7 }" @click="getMod('907')">不限</div>
                    <div :class="{ active:item.id==isActive7 }" class="innitem box1" :key="index" v-for="(item,index) in data5" @click="getMod(item.id)">
                        {{item.name}}
                    </div>
                </div>
                <div style="clear: both"></div>
            </div>
        </div>
        <div class="ord">
            <span class="s2">综合排序<div class="myLine"></div></span>
            <span class="s1" :class="[activeIndex == 0?'active':'']" @click="c_sort(0)">最新<div class="myLine"></div></span>
            <span class="s1" :class="[activeIndex == 1?'active':'']" @click="c_sort(1)">最热<div class="myLine"></div></span>
            <span class="s1" :class="[activeIndex == 2?'active':'']" @click="c_sort(2)">好评<div class="myLine"></div></span>
        </div>
        <ul class="teach_ul" id="id_teach_ul">
            <li v-for="(item,index) in data" :key="index"  :class="index%5 == 0?'li0':'li1'">
                <a>
                    <div class="inf">
                        <div class="pic">
                            <img v-if="item.editType == 1" src="../images/icon_ppt.png" />
                            <img v-if="item.editType == 2" src="../images/icon_word.png" />
                        </div>
                        <div class="typ_sta">
                            <div class="typ">{{item.title}}</div>
                            <div class="sta">
                                <img v-for="(index) in item.star" :key="index" src="../images/Stars.png" />
                            </div>
                        </div>
                    </div>
                    <div class="tlt" title="4 参加升旗仪式">{{item.name}}</div>

                    <div class="mor">
                        <div class="cls_sbj" title="小学数学">课堂实录<span class="s3">{{item.course}}</span></div>
                        <div class="bok_ver" title="无">{{item.version}}</div>
                        <div style="clear: both"></div>
                    </div>
                </a>
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
                activeIndex:0,
                data:[],
                items:[
                    {name:"教参类",id:101},
                    {name:"教研类",id:102},
                    {name:"教辅类",id:103},
                ],
                und_items:[
                    {name:"小学",id:301},
                    {name:"初中",id:302},
                    {name:"高中",id:303},
                    {name:"幼教",id:304},
                ],
                isActive:901,
                isActive1:false,
                isActive4:false,
                isActive3:903,
                isActive5:false,
                isActive6:false,
                isActive7:false,
                data1:[],
                data2:[],
                data3:[],
                data4:[],
                data5:[],
                show2:false,
                show3:false,
                show4:false,
                dataT:'课程资源',
                type:"教学资源",
                show1:false
            }
        },
        methods:{
            c_sort(val) {
                this.activeIndex = val
            },
            teachGrade(val) {
                this.isActive3 = val
                if(val == 903) {
                    this.show2 = false
                    return false
                }
                this.show3 = false
                this.show4 = false
                this.show5 = false
                this.$http.get("/api/resMou").then(res => {
                    this.data2 = res.data.data
                    this.show2 = true
                    this.isActive4 = '904'
                    console.log(this.data1)
                }).catch(error=>{
                    console.log(error);
                });
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
                    this.show1 = true
                    this.isActive1 = '902'
                    console.log(this.data1)
                }).catch(error=>{
                    console.log(error);
                });
            },
            getMou(val) {
                console.log(val)
                this.isActive1=val;
                if(val ==902){
                    this.show2 = false
                    return
                }
            },
            getSpecial(val) {
                this.isActive4=val;
                if(val ==904){
                    this.show3 = false
                    return
                }
                this.show4 = false
                this.show5 = false
                this.data3 = [
                    {name:"教材版本体系",id:2},
                    {name:"知识能力体系",id:3}
                ]
                this.isActive5 = '905'
                this.show3 = true

            },
            getSys(val) {
                this.isActive5=val;
                if(val ==905){
                    this.show4 = false
                    return
                }
                this.show5 = false
                this.isActive6 = '906'
                this.show4 = true
                this.data4 = [
                    {name:"人教版",id:2012001},
                    {name:"北师大版",id:2012002},
                    {name:"苏教版",id:2012003},
                    {name:"人教社部编本",id:2012004},
                    {name:"鄂教版",id:2012005},
                ]
            },
            getVersion(val) {
                this.isActive6 = val
                if(val ==906){
                    this.show5 = false
                    return
                }
                this.isActive7 = '907'
                this.show5 = true
                this.data5 = [
                    {name:"一年级上册",id:201200101},
                    {name:"一年级下册",id:201200102},
                    {name:"二年级上册",id:201200103},
                    {name:"二年级下册",id:201200104},
                    {name:"三年级上册",id:201200105},
                    {name:"三年级下册",id:201200106},
                ]
            },
            getMod(val) {
                this.isActive7 = val
            },
            getRes() {
                this.$http.get("/api/RCarticle").then(res => {
                    this.data = res.data.data
                    console.log(res)
                }).catch(error=>{
                    console.log(error);
                });
            },
        },
        created() {
            this.getRes()
        }

    }
</script>
<style lang="scss" scoped>
    .ord{
        margin-top: 30px;
        width: 100%;
        height: 44px;
        line-height: 44px;
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
            }
        }
        .s1{
            cursor: pointer;
            text-align: center;
            vertical-align: top;
            margin-left: 25px;
            width: 40px;
            display: inline-block;
        }
        .s2{
            display: inline-block;
        }
    }
    #id_teach_ul{
    }
    .teach_ul{
        padding-bottom: 163px;
        .li1{
          margin-left: 20px;
        }
        li{
            margin-left: 10px;
            margin-top: 18px;
            list-style: none;
            border:1px solid #DDDDDD;
            float: left;
            width: 210px;
            height: 142px;
            .inf{
                width: 188px;
                height: 54px;
                margin: 11px;
                .typ_sta{
                    float: left;
                    width: 132px;
                    height: 42px;
                    margin-left: 7px;
                    text-align: left;
                    .typ{
                        margin-top: 8px;
                        color: #888888;
                    }
                    .sta{
                        margin-top: 5px;
                    }
                }
                .pic{

                    width: 48px;
                    height: 54px;
                    float: left;
                }
            }
            .tlt{
                text-align: left;
                font-size: 16px;
                margin-left: 11px;
                margin-right: 11px;
            }
            .mor{
                font-size: 14px;
                color: #888888;
                width: 188px;
                margin: 11px;
                .cls_sbj{
                    float: left;
                    .s3{
                        margin-left: 5px;
                    }
                }
                .bok_ver{
                    float: right;
                }
            }
        }
    }
    .mul_cdts{
        #id_teac_lvlmod{
            margin-top: 20px;
        }
        #id_curs_module{
            margin-top: 20px;
        }
        #id_und{
            margin-top: 20px;
        }
        #id_curs_special{
            margin-top: 20px;
        }
        #id_curs_sys{
            margin-top: 20px;
        }
        #id_teac_version{
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
