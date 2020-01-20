<template>
    <div class="plaza_courseD">
        <div class="ar_title">
            <span class="s1">工作室首页</span>
            <span class="jt">&gt;</span>
            <span class="s2">名师领航</span>
            <span class="jt">&gt;</span>
            <span class="s2">名师课程</span>
            <span class="jt">&gt;</span>
            <span class="s2">{{data.courseName}}</span>
        </div>
        <div class="ar_content">
            <left_nav
                    :title=title
                    :mainList=mainList
                    :nowIndex="nowIndex"
            >
            </left_nav>
            <div class="ar_nr">
                <div class="title">{{data.courseName}}</div>
                <div class="subtitle">
                    <span class="s2">{{data.gmtCreate}}</span>
                    <span class="s2">{{data.visitorNum}}人访问</span>
                </div>
                <div id="tp">

                </div>
                <div class="p_button">
                    <Button type="primary" @click="getVideo(item.vid)" v-for="(item,index) in  vidList" >课程视频{{index+1}}</Button>
                </div>
                <titleLine
                    :title="title2"
                ></titleLine>
                <div class="xj">{{data.courseIntroduction}}</div>
            </div>
            <div style="clear:both;"></div>
        </div>
        <div class="air"></div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import left_nav from '../common/left_nav'
    export default {
        components:{left_nav},
        data() {
            return {
                vidList:[],
                data:{},
                value17: '',
                title:'名师领航',
                title2:'课程简介',
                mainList:[
                    {name:'专家文章',sign:'/pg_article'},
                    {name:'名师课程',sign:'/pg_course'},
                    {name:'学习资源',sign:'/pg_resource'}
                ],
                nowIndex:1,
            }
        },
        methods:{
            getVideo(val) {
                this.createVideo(val)
            },
            //根据课程查询视频
            getCourseById(val) {
                var url = this.GLOBAL.baseURL + "/portal/course/" + val
                this.$http.get(url).then(res => {
                    console.log(res)
                    this.data = res.data.data
                    this.vidList = this.data.courseVideoList
                    this.createVideo(this.vidList[0].vid)
                })
            },
            createVideo(vid) {
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
                    playsafe: function(vid, next) {
                        $.ajax({
                            url:that.GLOBAL.baseURL + "/board/polyv/token/" + vid,
                            headers: {
                                "Authorization":"Bearer "+JSON.parse(sessionStorage.getItem("user")).access_token//此处放置请求到的用户token
                            },
                        }).done(function(res) {
                            next(res.data)
                        });
                    }
                });
            },
            //课程访问记录
            getBrowsingHistory(val) {
                var url = this.GLOBAL.baseURL + "/board/course/browsingHistory/" + val
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).access_token
                    }
                }).then(res => {
                })
            }
        },
        mounted() {
        },
        watch: {
            "$route":{
                handler(to){
                    if(to.query.id) {
                        this.getCourseById(to.query.id)
                        this.getBrowsingHistory(to.query.id)
                    }
                },
                immediate:true
            }
        },
    }
</script>
<style lang="scss">
    .plaza_courseD{
        .ivu-input-wrapper{
            textarea{
                margin-top: 20px;
                width: 838px;
                height: 161px;
            }
        }
    }
</style>
<style scoped lang="scss">
    .plaza_courseD{
        background: #EAF6FE;
        .ar_title{
            width: 1200px;
            height: 56px;
            line-height: 56px;
            font-size: 14px;
            margin: auto;
            text-align: left;
            .s1{
                color: #444444;
            }
            .s2{
                color: #888888;
            }
            .jt{
                color: #888888;
                margin-left: 5px;
                margin-right: 5px;
            }
        }
        .ar_content{
            position: relative;
            width: 1200px;
            margin: auto;
            /*background: #ffffff;*/
            /*min-height: 720px;*/
            .emp{
                width: 14px;
                height: 100%;
            }
            .left_nav{
                position: absolute;
                left: 0px;
                height: 100%;
            }
            .ar_nr{
                float: right;
                margin-left:14px;
                display: inline-block;
                width: 886px;
                height: 100%;
                background: #ffffff;
                .p_button{
                    text-align: left;
                    margin-top: 20px;
                    padding-left: 21px;
                    padding-right: 41px;
                    .ivu-btn-primary{
                        width:97px;
                        height:40px;
                        margin-left: 20px;
                        margin-top: 10px;
                    }
                    .pp{
                        margin-left: 10px;
                    }
                }
                .xj{
                    width: 799px;
                    margin: auto;
                    font-size: 14px;
                    text-align: left;
                    margin-top: 29px;
                    margin-bottom: 60px;
                }
                .dlNN{
                    display: flex;
                    justify-content: space-between;
                    width: 838px;
                    margin: auto;
                    margin-top: 20px;
                    .bd1{
                        background: #DDDDDD;
                        color: #ffffff;
                        width: 100px;
                        height: 40px;
                    }
                    .dl{
                        display: inline-block;
                        vertical-align: top;
                        .dl1{
                            font-size: 14px;
                        }
                        .sd1{
                            color: #008CFA;
                        }
                        .sd2{
                            margin-left: 10px;
                        }
                    }
                }
                .ivu-input-wrapper{
                    textarea{
                        width: 838px;
                        height: 161px;
                    }
                }
                .title{
                    font-size:32px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(34,34,34,1);
                    text-align: center;
                    margin-top: 63px;
                }
                .subtitle{
                    width: 393px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    margin: auto;
                    margin-top: 25px;
                    .s1{
                        color: #008CFA;
                    }
                    .s2{
                        color:#AAAAAA;
                    }
                }
                #tp{
                    margin-top: 30px;
                    padding-left: 42px;
                }
                .commonTitle{
                    margin-left:24px;
                    width: 838px;
                    margin: auto;
                    border-bottom: 1px solid #EAEAEA;
                }
                .tp{
                    width: 640px;
                    height: 420px;
                    margin: auto;
                    margin-top: 40px;
                    video{
                        width: 100%;
                        height: 100%;
                    }
                    .tpi{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .air{
            width: 100%;
            height: 13px;
            background: #EAF6FE;
        }
    }
</style>
