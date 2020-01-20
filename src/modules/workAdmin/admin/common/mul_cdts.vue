<template>
    <div class="mul_cdts">
        <div class="cdt" id="id_curs_type">
            <div class="tlte box1">类型</div>
            <div class="items">
                <div class="bx box1" :class="{ active:'901'==isActive }" @click="getCourse('901')">不限</div>
                <div :class="{ active:item.crouseModelTreeId==isActive }" class="innitem box1" :key="index" v-for="(item,index) in items" @click="getCourse(item.crouseModelTreeId,index)">
                    {{item.itemText}}
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
        <div class="cdt" id="id_curs_module" v-if="show1">
            <div class="tlte box1">模块</div>
            <div class="items">
                <div class="bx box1" :class="{ active:'902'==isActive1 }" @click="getMou('902')">不限</div>
                <div :class="{ active:item.crouseModelTreeId==isActive1 }" class="innitem box1" :key="index" v-for="(item,index) in data1" @click="getMou(item.crouseModelTreeId,index)">
                    {{item.itemText}}
                </div>
            </div>
            <div style="clear: both"></div>
        </div>
            <div class="cdt" id="id_curs_special" v-if="show2">
                <div class="tlte box1">专题</div>
                <div class="items">
                    <div class="bx box1" :class="{ active:'903'==isActive2 }" @click="getSpecial('903')">不限</div>
                    <div :class="{ active:item.crouseModelTreeId==isActive2 }" class="innitem box1" :key="index" v-for="(item,index) in data2" @click="getSpecial(item.crouseModelTreeId)">
                        {{item.itemText}}
                    </div>
                </div>
            </div>
        <div style="clear: both"></div>
                <Nav1
                        :total="totalPages"
                        :currentPage="currentPage"
                        :pageSize='1'
                        @sendPage="getpage"
                        ref="child"
                ></Nav1>
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
            //获取类型
            getDC() {
                var url = this.GLOBAL+"/fzw/course/mode/0"
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).access_token
                    }
                }).then(res => {
                    var data = res.data.data
                    this.items = data
                })
            },
            //选择类型并查询模块
            getCourse(val) {
                this.isActive=val;
                if(val ==901){
                    this.show1 = false
                    this.show2 = false
                    this.getCourseList(1,"")
                    return
                }
                var url = this.GLOBAL+'/fzw/course/mode/'+val
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).access_token
                    }
                }).then(res => {
                    console.log(res)
                    this.data1 = res.data.data
                    this.show2 = false
                    this.show1 = true
                    this.isActive1 = '902'
                })
                this.getCourseList(1,val)
            },
            //选择模块并查询专题
            getMou(val) {
                this.isActive1=val;
                if(val ==902){
                    this.show2 = false
                    this.getCourseList(1,this.isActive)
                    return
                }
                var url = this.GLOBAL+'/fzw/course/mode/'+val
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).access_token
                    }
                }).then(res => {
                    this.data2 = res.data.data
                    this.show2 = true
                    this.isActive2='903'
                    console.log(this.data2)
                }).catch(error=>{
                    console.log(error);
                });
                this.getCourseList(1,val)
            },
            //选择专题
            getSpecial(val) {
                this.isActive2=val;
                if(val ==903){
                    this.show2 = false
                    this.getCourseList(1,this.isActive1)
                    return
                }
                this.getCourseList(1,val)
            },
            //获取课程列表
            getCourseList(page,val) {
                var url = this.GLOBAL+"/fzw/course/page?page="+page+"&size=8&crsModeId="+val
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).access_token
                    }
                }).then(res => {
                    var data = res.data.data.content
                    this.$emit('courselist', data);
                })
            },
        },
        created() {
            this.getCourseList(1,"")
            this.getDC()
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
