<template>
    <div class="activityD">
        <div class="ar_title">
            <span class="s1">首页</span>
            <span class="jt">&gt;</span>
            <span class="s2">活动资讯</span>
            <span class="jt">&gt;</span>
            <span class="s2">以笔之名谢师恩 2019首届荆楚小书法家大赛启动</span>
        </div>
        <div class="main">
            <p class="title">以笔之名谢师恩 2019首届荆楚小书法家大赛启动</p>
            <p class="title2">
                <span style="margin-right:10px">发布时间:</span>
                <span>2019年03月20日17:07</span>
                <span style="margin-left:10px">来源:</span>
                <span>石门峰小学</span>
            </p>
            <div class="imgD">
<!--                <img src="../images/123.jpg" />-->
            </div>
            <p class="s1">户端——荆楚网消息（记者黄培、何鹏、许文秀）有一种恩情终生难忘，有一种教导受益匪浅。在学生眼里，老师是最可敬的人；在学生笔下，老师是求学路上的“神灯”。以笔之名，手写师恩！3月20日，由荆楚网（湖北日报网）主办，湖北教育新闻网、湖北日报大学生记者团承办的“2019首届荆楚小书法家大赛”正式启动，大赛将面向全省中小学生进行优秀书法作品征集，以“尊师、敬师、谢师”为主题书写对教师的感恩，寻找出我们身边的校园小书法家。
            </p>
        </div>
    </div>
</template>
<script>
    // import share from '../common/share'
    export default {
        // components:{share},
        data() {
            return {
                data:[],
                data2:[]
            }
        },
        methods:{
            getAxios() {
                this.$http.get("/api/indexI").then(res => {
                    this.data = res.data.data
                    console.log(this.data)
                }).catch(error=>{
                    console.log(error);
                });
            }
        },
        created() {
        }
    }
</script>
<style scoped lang="scss">
    .activityD{
        padding-bottom: 14px;
        background: #E7F5FE;
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
        .main{
            position: relative;
            padding-bottom: 90px;
            margin: auto;
            width: 1200px;
            background: #ffffff;
            .title{
                padding-top: 79px;
                font-size:32px;
                color: #222222;
            }
            .title2{
                margin-top: 20px;
                color: #888888;
            }
            .imgD{
                width: 640px;
                height: 420px;
                margin: auto;
                margin-top: 40px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .s1{
                width: 858px;
                margin: auto;
                margin-top: 66px;
                text-align: left;
                color: #5B5B5B;
                font-size: 16px;
                line-height: 30px;
            }
            .title3{
                width: 858px;
                margin: auto;
                margin-top: 58px;
                font-size:20px;
                font-weight:400;
                color:rgba(0,140,250,1);
                text-align: left;
            }
            .line{
                width: 860px;
                height: 1px;
                background: #EAEAEA;
                margin: auto;
                position: relative;
                top: 12px;
            }
            .imgAll{
                width: 850px;
                margin: auto;
                margin-top: 30px;
                .lf{
                    margin-left: 26px;
                }
                .imgD2{
                    margin-top: 26px;
                    display: inline-block;
                    width: 266px;
                    height: 150px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
