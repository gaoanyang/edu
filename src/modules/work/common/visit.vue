<template>
<div class="visitor">
    <div class="visitorsub">
        <div class="commonTitle">
            <div class="commonlxr2">最近访客</div>
        </div>
        <div class="fk">
            <div class="fkxx0 fkxx" :class="index%3 == 0 ? 'flxx0':'fkxx1' " v-for="(item,index) in visitors">
                <div class="imgdiv">
                    <img v-if="item.avatar == null" src="https://gzs-file.oss-cn-beijing.aliyuncs.com/e1051d72-028e-4611-816e-1c81294b0a03.jpg" />
                    <img v-else :src="item.avatar" />
                </div>
                <div class="name">{{item.fullName}}</div>
                <div class="date">{{item.gmtCreate}}</div>
            </div>
        </div>
        <div style="clear:both"></div>
        <div class="v-bottom">
            <div class="vball">
                <div class="vb1 vb">
                    <span class="d1">今日访问量</span>
                    <span class="d2">{{todayVisits}}</span>
                </div>
                <div class="vb2 vb">
                    <span class="d1">总访问量</span>
                    <span class="d2">{{totalVisits}}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:{
        visitors:{
            type:Array,
            default: function() {
                return []
            }
        },
        todayVisits:{
            type:Number,
            default:0
        },
        totalVisits:{
            type:Number,
            default:0
        }
    }
}
</script>
<style scoped lang="scss">
.visitor {
    padding-bottom: 29px;
    .visitorsub {
        width: 252px;
        margin: auto;

        .v-bottom {
            width: 100%;
            border-top: 1px solid rgba(234, 234, 234, 1);;
            margin-top: 38px;

            .vball {
                width: 200px;
                margin: auto;
                display: flex;
                justify-content: space-between;
                margin-top: 20px;

                .vb {
                    display: inline-block;
                    width: 70px;

                    .d1 {
                        font-size: 14px;
                        color: rgba(68, 68, 68, 1);
                    }

                    .d2 {
                        font-size: 18px;
                        color: #008cfa;
                        margin-top: 5px;
                        display: inline-block;
                    }
                }

                .vb1 {

                }

                .vb2 {
                    width:57px;
                }
            }
        }

        .commonTitle {
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(34, 34, 34, 1);
            padding-top: 30px;
            text-align: left;
            border-bottom: 1px solid #EAEAEA;
            /*height: 65px;*/
            .commonlxr {
                height: 35px;
                width: 54px;
                border-bottom: 2px solid #008CFA;
            }

            .commonlxr2 {
                height: 35px;
                width: 72px;
                border-bottom: 2px solid #008CFA;
            }
        }

        .fk {
            width: 232px;
            margin: auto;
            height: 100px;

            .fkxx {
                vertical-align: top;
                margin-top: 30px;
                width: 54px;
                height: 100px;
                display: inline-block;
                float: left;

                .imgdiv {
                    width: 54px;
                    height: 54px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .name {
                    font-size: 14px;
                    color: rgba(0, 140, 250, 1);
                    margin-top: 7px;
                }

                .date {
                    margin-top: 7px;
                    font-size: 12px;
                }
            }

            .fkxx1 {
                margin-left: 35px;
            }

            .fkxx2 {
                margin-left: 35px;
            }
        }
    }
}
</style>
