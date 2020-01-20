<template>
    <ul class="myUi1">
        <li v-for="(item,index) in data" :key="index">
<!--            <a :href="item.resourceUrl" v-if="res">-->
            <div v-on:click="downRes(item.resourceUrl)" style="cursor: pointer">
                <div v-if="!res" class="lit"></div>
                <img class="iwimg" v-if="res" src="../assets/wj.png"/>
                <span class="bottomHover">
                    <span class="s1">{{item.resourceName}}</span>
                </span>
                <div class="nd">
                    <span class="name">{{item.fullName}}</span>
                    <span class="date">{{item.gmtCreate}}</span>
                    <img class="idownimg" v-if="res" src="../assets/downlod.png"/>
                    <span v-if="count" class="count">50</span>
                 </div>
            </div>
<!--            </a>-->
        </li>
    </ul>
</template>
<script>
    export default {
        props:{
            res:{
                type:Boolean,
                default:false
            },
            data:{
                type:Array,
                default: function () { return [] }
            },
            count:{
                type:Boolean,
                default: false
            }
        },
        data() {
            return {

            }
        },
        methods:{
            downRes(val) {
                if(sessionStorage.getItem('studioId') == JSON.parse(sessionStorage.getItem('user')).studioId) {
                    window.location.href = val
                }else{
                    alert("仅提供本工作室人员下载")
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    ul{
        .s1:hover{
            color: red;
            border-bottom: 1px solid #008cfa;
        }
        margin-top: 18px;
        li {
            position: relative;
            font-size: 14px;
            font-weight: 400;
            color: rgba(68, 68, 68, 1);
            list-style: none;
            text-align: left;
            .bottomHover{
                color: #333333;
                .s1:hover{
                    cursor:pointer;
                    color: #008cfa;
                    border-bottom: 1px solid #008cfa;
                }
            }
            .down{
                width: 100%;
                height: 100%;
                position: absolute;
            }
            .iwimg{
                vertical-align: middle;
                margin-right: 4px;
            }
            .lit {
                display: inline-block;
                width: 4px;
                height: 4px;
                background: rgba(0, 140, 250, 1);
                margin-right: 7px;
            }

            .nd {
                display: inline-block;
                float: right;

                .name {
                    font-size: 14px;
                    color: rgba(0, 140, 250, 1);
                    margin-right: 70px;
                }

                .date {
                    color: #AAAAAA;
                }
                .idownimg{
                    margin-left: 50px;
                }
            }
        }
    }
</style>
