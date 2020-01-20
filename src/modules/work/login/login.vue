<template>
    <div class="workLogin">
        <div class="header" @click="link">
            <span style="cursor: pointer">宁波市鄞州区“三名”工作室</span>
        </div>
        <div class="banner">
<!--            <img src="../resourceCommon/img/banner_bg.png"/>-->
            <img src="../../../assets/banner.png"/>
            <login1></login1>
        </div>
        <div class="footer">
            <span class="f1">三名工作室  | 宁波市鄞州区</span>
            <p class="p1"><span class="s1">反馈建议</span> <span class="s2">联系客服</span></p>
        </div>
    </div>
</template>
<script>
    import login1 from '@/components/login1'
    export default {
        components:{login1},
        methods:{
            link() {
                window.location.href = "/index.html#/index"
            }
        }
    }
</script>
<style lang="scss">
    .workLogin{
        .header{
            height:100px;
            color: #008CFA;
            font-size: 24px;
            line-height: 100px;
            width: 1200px;
            margin: auto;
            text-align: left;
        }
        .banner{
            height: 460px;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .wz{
                position: absolute;
                top: 100px;
                left: 360px;
                width: 369px;
                height: 140px;
                font-size: 60px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: white;
                text-align: left;

            }
        }
        .footer{
            width: 1200px;
            margin: auto;
            .f1{
                float: left;
                color: #008CFA;
                font-size: 20px;
                margin-top: 49px;
            }
            .p1{
                margin-top: 53px;
                float: right;
                display: inline-block;
                color: #444444;
                font-size: 14px;
                .s1{
                    margin-right: 65px;
                }
            }
        }
    }
</style>
