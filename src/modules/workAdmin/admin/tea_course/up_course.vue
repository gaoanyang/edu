<template>
    <div class="up_course">
        <Button @click="link">返回</Button>
        <p class="p1">上传课程</p>
        <div class="bt"><span>课程名称：</span><input type="text" v-model="name"/></div>
        <div class="nr">
            <span class="s1">课程简介: </span>
            <textarea rows="3" cols="20" class="jj" v-model="desc">

            </textarea>
            <div class="hfimg">
                <span class="s1">课程缩略图</span>
                <div class="sc">
                    <upload :uploadType="`head`" :imgWidth="`520px`" :imgHeight="`160px`" :imgUrl="imgUrl"
                            @upload="getImgUrl" :message="message"></upload>
                </div>
            </div>
            <div class="upload2">
                <span>上传视频:</span>
                <div class="local">
                    <div class="localD">
                        <Icon type="ios-cloud-upload-outline" />
                        <p>点击或将文件拖拽到这里上传</p>
                    </div>
                    <polyv @videoId="getvId"></polyv>
                </div>
            </div>

            <!-- -->

            <div class="btn_div">
                <Button type="primary" @click="confirm">提交</Button>
            </div>

        </div>
    </div>
</template>
<script>
import polyv from '@/components/uploadPolyv'
import upload from '../../common/upload'
import upload2 from '../common/uploadDos'
export default {
    components:{upload,upload2, polyv},
    data () {
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
            show1:false,
            id:'',
            name:'',
            desc:'',
            courseUrl:'',
            token:'',
            message:"确认上传",
            phone: 'apple',
            hhumbnail:'',
            courseUrl:'',
            courseType: 0,
            courseModule: 0,
            courseSpecialSubject: 0,
            course_vid:'',
            courseVideoList1:[]
        }
    },
    methods:{
        getvId(val) {
            this.course_vid = val
            var obj = {}
            obj.videoName = ""
            obj.videoImage = ""
            obj.vid = this.course_vid
            this.courseVideoList1.push(obj)
            console.log(this.courseVideoList1)
        },
        c_sort(val) {
            this.activeIndex = val
        },
        //选择课程
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
        //选择学段
        getSpecial(val) {
            this.isActive2=val;
        },
        getRes() {
            this.$http.get("/api/RCvideo").then(res => {
                this.data = res.data.data
            }).catch(error=>{
                console.log(error);
            });
        },
        getImgUrl(val) {
            this.hhumbnail = val
        },
        link() {
            this.$router.push({path:'/admin/tea_course'})
        },
        confirm() {
            var data = {
                courseName:this.name,
                courseThumbnail:this.hhumbnail,
                courseIntroduction:this.desc,
                courseType: 0,
                courseModule: 1,
                courseSpecialSubject: 3,
                studioId:this.id,
                courseVid:this.course_vid
            }
            data.courseVideoList = this.courseVideoList1
            console.log(data)
            var url = this.GLOBAL+"/board/course"
            this.$http.post(url, data,{
                headers:{
                    'Authorization': 'Bearer ' + this.token
                }
            }).then(res => {
                    if(res.data.code == 0){
                        alert("新增成功")
                        this.$router.go(-1)
                    }
                })
        },
        getData(val) {
        }
    },
    watch: {
        "$route":{
            handler(to){
                var user = JSON.parse(sessionStorage.getItem("user"))
                this.token = user.access_token
                this.id = user.studioId
            },
            immediate:true
        }
    },
}
</script>
<style lang="scss" scoped>
    .up_course{
        padding-left: 50px;
        text-align: left;
        .ivu-btn{
            width: 120px;
            height: 50px;
        }
        .p1{
            font-size: 20px;
            margin-top: 20px;
        }
        .bt{
            font-size: 16px;
            margin-top: 20px;
        }
        .ty{
            font-size: 16px;
            margin-top: 20px;
            .ivu-radio-group{
                margin-left: 10px;
            }
        }
        .nr{
            font-size: 16px;
            margin-top: 20px;
            .hfimg{
                .s1{
                    vertical-align: top;
                }
                .sc{
                    vertical-align: top;
                    display: inline-block;
                    margin-left: 20px;
                    width: 520px;
                    height: 160px;
                    border: 1px solid;
                    .s2{
                        /*margin-left: 20px;*/
                        font-size: 16px;
                    }
                    .imgD{
                        margin-top: 20px;
                    }
                }
            }
            .upload2{
                margin-top: 20px;
                .local{
                    position: relative;
                    border: 1px solid #E7E7E7;
                    display: inline-block;
                    width: 400px;
                    height: 200px;
                    vertical-align: top;
                    margin-left: 28px;
                    .localD{
                        position: absolute;
                        top: 0px;
                        bottom: 0px;
                        left: 0px;
                        right: 0px;
                        margin: auto;
                        height: 100px;
                        text-align: center;
                        .ivu-icon{
                            font-size: 60px;
                            color: #57a3f3;
                        }
                    }
                    .selectDiv{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        /*opacity: 0;*/
                        /deep/ .select{
                            width: 100%;
                            height: 100%;
                            cursor: pointer;
                        }
                    }
                }
            }
            .btn_div{
                margin-top: 50px;
            }
            .s1{
                vertical-align: top;
            }
            .jj{
                width: 600px;
                height: 100px;
            }
        }
    }
    .mul_cdts{
        margin-top: 100px;
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
