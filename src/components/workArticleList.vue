<template>
    <ul class="myUi1">
        <li v-for="(item,index) in data" :key="index">
            <a :href="item.downUrl" v-if="res">
                <div class="down"></div>
            </a>
            <div v-if="!res" class="lit"></div>
            <img class="iwimg" v-if="res" src="../assets/icon_word.png"/>
            <span class="bottomHover" @click="link(item.articleId)">
                <span>{{item.articleTitle}}</span>
            </span>
            <div class="nd">
                <span class="name" v-if="name">{{item.fullName}}</span>
                <span class="date" v-if="date">{{item.gmtCreate}}</span>
                <img class="idownimg" v-if="res" src="../assets/downlod.png"/>
                <span v-if="count" class="count">50</span>
            </div>
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
            },
            url:{
                type:String,
                default: '/bc'
            },
            name:{
                type:Boolean,
                default: true
            },
            date:{
                type:Boolean,
                default: true
            }
        },
        data() {
            return {

            }
        },
        methods:{
            link(val) {
                this.$router.push({path:this.url,query:{id:val}})
            }
        }
    }
</script>
<style scoped lang="scss">
    ul{
        margin-top: 18px;
        li {
            position: relative;
            font-size: 14px;
            font-weight: 400;
            color: rgba(68, 68, 68, 1);
            list-style: none;
            text-align: left;
            .bottomHover span:hover{
                cursor:pointer;
                color: #008cfa;
                border-bottom: 1px solid #008cfa;
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
                vertical-align: middle;
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
