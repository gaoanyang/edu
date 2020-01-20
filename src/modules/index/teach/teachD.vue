<template>
    <div class="teachD">
        <div class="ar_title">
            <span class="s1">首页</span>
            <span class="jt">&gt;</span>
            <span class="s2">名师风采</span>
            <span class="jt">&gt;</span>
            <span class="s2">{{data.newsTitle}}</span>
        </div>
        <div class="main">
            <p class="title">{{data.newsTitle}}</p>
            <p class="title2">
                <span style="margin-right:10px">发布时间:</span>
                <span>{{data.gmtCreate}}</span>
            </p>
            <div class="content" v-html='data.newsContent'></div>
            <share></share>
        </div>
    </div>
</template>
<script>
    import share from '../common/share'
    export default {
        components:{share},
        data() {
            return {
                data:{},
                data2:[
                    {"img":'/img/123.74e36e25.jpg'},
                    {"img":'/img/123.74e36e25.jpg'},
                    {"img":'/img/123.74e36e25.jpg'},
                    {"img":'/img/123.74e36e25.jpg'},
                    {"img":'/img/123.74e36e25.jpg'},
                    {"img":'/img/123.74e36e25.jpg'}
                ]
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
            },
            getDataByid(val) {
                var url = this.GLOBAL.baseURL + "/portal/news/"+val
                this.$http.get(url).then(res => {
                    this.data = res.data.data
                    console.log(this.data)
                })
            }
        },
        watch: {
            "$route":{
                handler(to){
                    if(to.query.id) {
                        this.getDataByid(to.query.id)
                    }
                },
                immediate:true
            }
        },
        created() {
            this.$emit('getMessage', 3);
        }
    }
</script>
<style scoped lang="scss">
    .teachD{
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
            min-height: 720px;
            padding-bottom: 90px;
            margin: auto;
            width: 1200px;
            background: #ffffff;
            .content{
                width: 858px;
                margin: auto;
                margin-top: 66px;
                text-align: left;
                color: #5B5B5B;
                font-size: 16px;
                line-height: 30px;
            }
            .title{
                padding-top: 79px;
                font-size:32px;
                color: #222222;
            }
            .title2{
                margin-bottom: 20px;
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
