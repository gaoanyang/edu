<template>
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
                <div :class="{ active:item.area==isActive1 }" class="innitem box1" :key="index" v-for="(item,index) in data1" @click="getMou(item.area,index)">
                    {{item.area_name}}
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
<!--        <div class="cdt" id="id_curs_special" v-if="show2">-->
<!--            <div class="tlte box1">学段</div>-->
<!--            <div class="items">-->
<!--                <div class="bx box1" :class="{ active:'903'==isActive2 }" @click="getSpecial('903')">不限</div>-->
<!--                <div :class="{ active:item.id==isActive2 }" class="innitem box1" :key="index" v-for="(item,index) in data2" @click="getSpecial(item.id)">-->
<!--                    {{item.name}}-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <div style="clear: both"></div>
    </div>
</template>
<script>
    export default {
        components:{},
        data() {
            return {
                data:[],
                items:[
                    {name:"校园长，书记学习共同体",id:0},
                    {name:"名师工作室",id:1},
                    {name:"名班主任(德育导师)工作室",id:2},
                ],
                isActive:901,
                isActive1:false,
                isActive2:false,
                data1:[],
                data2:[],
                show1:false,
                show2:false,
                StudioByType:''
            }
        },
        props: {
            title2: {
                type: Number,
                default: 901
            },
        },
        methods:{
            //选择类型
            getCourse(val) {
                this.isActive=val;
                if(val ==901){
                    this.show1 = false
                    this.show2 = false
                    this.getStudioByType(val,1)
                    return
                }
                var url = this.GLOBAL.baseURL+'/portal/studio/area/'+val
                this.$http.get(url).then(res => {
                    console.log(res)
                    this.data1 = res.data.data
                    this.show2 = false
                    this.show1 = true
                    this.isActive1 = '902'
                })
                this.getStudioByType(val,1)
            },
            //选择区域
            getMou(val) {
                this.isActive1=val;
                if(val ==902){
                    this.show2 = false
                    val = ""
                }
                this.getStudioByArea(val,1)
                // this.$http.get("/api/resMou").then(res => {
                //     this.data2 = res.data.data
                //     this.show2 = true
                //     this.isActive2='903'
                //     console.log(this.data2)
                // }).catch(error=>{
                //     console.log(error);
                // });
            },
            getSpecial(val) {
                this.isActive2=val;
            },
            //根据工作室类别查询工作室
            getStudioByType(type,page) {
                if(type == "901") {
                    type = ""
                }
                this.StudioByType = type
                var url = this.GLOBAL.baseURL+"/portal/studio/page?page="+page+"&size=12"+"&studioCategory="+this.StudioByType
                this.$http.get(url).then(res => {
                    console.log(res)
                    var data = res.data.data.data
                    this.$emit('studioData', data);
                    this.$emit('pageData',res.data.data.totalPages)
                })
            },
            //根据工作室类别和区域查询工作室
            getStudioByArea(area,page) {
                var url = this.GLOBAL.baseURL+"/portal/studio/page?page="+page+"&size=12"+"&studioCategory="+this.StudioByType + '&area=' + area
                this.$http.get(url).then(res => {
                    var data = res.data.data.data
                    this.$emit('studioData', data);
                })
            }
        },
        created() {
        },
    }
</script>
<style scoped lang="scss">
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
