<template>
    <div class="preview">
        <Button @click="link">返回</Button>
        <p class="p1">预览课程</p>
        <div class="main1">
            <div id="tp">

            </div>
            <Button type="primary" @click="getVideo(item.vid)" v-for="(item,index) in videoData">课程视频{{index+1}}</Button>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    export default {
        components:{},
        data () {
            return {
                videoData:[],
                logId:''
            }
        },
        methods:{
            //查询课程vid
            getVid() {
                var url = this.GLOBAL+"/fzw/course/vid/"+this.logId
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).access_token
                    }
                }).then(res => {
                    console.log(res)
                    this.videoData = res.data.data
                    this.createVideo(this.videoData[0].vid)

                })
            },
            link() {
                this.$router.push({path:'/admin/tea_cicourse'})
            },
            getVideo(val) {
                this.createVideo(val)
            },
            createVideo(vid) {
                console.log(vid)
                var play = document.getElementsByClassName('pv-video-player')[0]
                if(play) {
                    play.parentNode.removeChild(play)
                }
                var that = this
                var player = polyvPlayer({
                    wrap: '#tp',
                    width: 800,
                    height: 533,
                    vid: vid,
                    playsafe: function(vid,next) {
                        $.ajax({
                            url:that.GLOBAL + "/board/polyv/token/" + vid,
                            headers: {
                                "Authorization":"Bearer "+JSON.parse(sessionStorage.getItem("user")).access_token//此处放置请求到的用户token
                            },
                        }).done(function(res) {
                            console.log(res)
                            next(res.data)
                        });
                    }
                });
            },
        },
        watch: {
            "$route":{
                handler(to){
                    console.log(to)
                        this.logId = to.query.id
                        this.getVid()
                },
                immediate:true
            }
        },
        mounted() {
            // this.createVideo("8dbfafbd28b29f6180a266f8ad30b45c_8")
        }
    }
</script>
<style lang="scss">
    .preview {
        .ivu-input-wrapper{
            .ivu-input{
                width: 150px;
            }
            .ivu-input-group-append{
                height: 32px;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .preview {
        padding-left: 50px;
        text-align: left;
        .p1{
            font-size: 20px;
            margin-top: 10px;
            margin-bottom: 30px;
        }
        .ivu-btn {
            width: 120px;
            height: 50px;
        }
        .main1{
            width: 1500px;
            height: 27px;
            line-height: 27px;
            border: 1px solid #E7E7E7;
            .ivu-btn-primary{
                margin-left: 10px;
            }
            .d1{
                color: #AAAAAA;
                .s1{
                    padding-left: 10px;
                }
            }
            .d2{
                height: 80px;
                border: 1px solid #E7E7E7;
                .d3{
                    margin-top: 10px;
                    .ivu-select{
                        margin-left: 10px;
                    }
                    .s5{
                        margin-left: 35px;
                    }
                }
                .sub1{
                    .ivu-input-group{
                        display: inline-block;
                        width: 200px;
                        margin-left: 10px;
                    }
                    .sp{
                        margin-left: 50px;
                    }
                    .ivu-select{
                        margin-left: 10px;
                    }
                    .s1{
                        margin-left: 10px;
                    }
                }
            }
        }
    }
</style>
