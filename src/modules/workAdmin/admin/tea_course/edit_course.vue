<template>
    <div class="edit_course">
        <Button @click="link">返回</Button>
        <p class="p1">修改课程</p>
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
                    <span class="s2">建议尺寸: 1920*320</span>
                </div>
            </div>
            <div id="tp">

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

            <div class="btn_div">
                <Button @click="confirm">提交</Button>
            </div>

        </div>
    </div>
</template>
<script>
    import polyv from '@/components/uploadPolyv'
    import upload from '../../common/upload'
    import $ from 'jquery'
    export default {
        components:{upload, polyv},
        data () {
            return {
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

                imgUrl:'',
                id:'',
                name:'',
                desc:'',
                token:'',
                message:"确认上传",
                phone: 'apple',
                hhumbnail:'',
                courseType: 0,
                courseModule: 0,
                courseSpecialSubject: 0,
                courseId:'',
                courseVid:''
            }
        },
        methods:{
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
            //选择学段
            getSpecial(val) {
                this.isActive2=val;
            },
            getImgUrl(val) {
                this.hhumbnail = val
                alert(this.hhumbnail)
            },
            link() {
                this.$router.push({path:'/admin/tea_course'})
            },
            getvId(val) {
                this.courseVid = val
            },
            //修改
            confirm() {
                var data = {
                    courseName:this.name,
                    courseThumbnail:this.hhumbnail,
                    courseIntroduction:this.desc,
                    courseType: 0,
                    courseModule: 1,
                    courseSpecialSubject: 3,
                    courseId:this.courseId,
                    courseVid:this.courseVid
                }
                var url = this.GLOBAL+"/board/course"
                console.log(data)
                this.$http.put(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    console.log(res)
                    if(res.data.code == 0) {
                        alert('修改成功')
                        this.$router.go(-1)
                    }
                })
            },
            getDataById() {
                var url = this.GLOBAL+"/board/course/"+this.courseId
                this.$http.get(url, {
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    var data = res.data.data
                    console.log(data)
                    this.name = data.courseName
                    this.desc = data.courseIntroduction
                    this.imgUrl = data.courseThumbnail
                    this.hhumbnail = data.courseThumbnail
                    this.courseVid = data.courseVid
                    var play = document.getElementsByClassName('pv-video-player')[0]
                    if(play) {
                        play.parentNode.removeChild(play)
                    }
                    console.log(data.courseVid)
                    this.createVideo(data.courseVid)
                })
            },
            createVideo(vid) {
                var that = this
                var player = polyvPlayer({
                    wrap: '#tp',
                    width: 800,
                    height: 533,
                    vid: vid,
                    playsafe: function(vid, next) {
                        $.ajax({
                            url:that.GLOBAL + "/board/polyv/token/" + vid,
                            headers: {
                                "Authorization":"Bearer "+JSON.parse(sessionStorage.getItem("user")).access_token//此处放置请求到的用户token
                            },
                        }).done(function(res) {
                            next(res.data)
                        });
                    }
                });
            },
        },
        mounted() {
        },
        watch: {
            "$route":{
                handler(to){
                    var user = JSON.parse(sessionStorage.getItem("user"))
                    this.token = user.access_token
                    this.id = user.studioId
                    if(to.query.id != undefined) {
                        this.courseId = to.query.id
                        this.getDataById()
                    }
                },
                immediate:true
            }
        },
    }
</script>
<style lang="scss" scoped>
    .edit_course{
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
                margin-bottom: 60px;
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
                margin-top: 50px;
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
            .btn_div{
                margin-top: 20px;
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
</style>
