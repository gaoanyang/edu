<template>
    <div class="left_nav">
        <div class="title">{{title}}</div>
        <div
             @click="changeTab(m.sign)"
             class="list"
             :class="[index === nowIndex ? 'tab-active':'']"
             :key="index" v-for="(m,index) in mainList">
            <a :class="[index === nowIndex ? 'tab-astyle':'']">{{m.name}}</a>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            title:{
                type:String,
                default:"名师领航1"
            },
            mainList:{
                type:Array,
                // default: ["专家文章","名师课程","学习资源"]
                default:() => [
                    {name:'专家文章',sign:'/pg_article'},
                    {name:'名师课程',sign:'/pg_course'},
                    {name:'学习资源',sign:'/pg_resource'},
                ]
            },
            nowIndex:{
                type:Number,
                default:0
            }
        },
        data() {
            return {

            }
        },
        methods:{
            changeTab(url) {
                this.$router.push({ path: url })
            }
        }
    }
</script>
<style scoped lang="scss">
    a{
        color: #444444;
    }
    .tab-active{
        background: #EAF6FE;
        a{
          color: #008CFA;
        }
    }
    .tab-astyle:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: #008CFA;
    }
    .left_nav{
        vertical-align: top;
        display: inline-block;
        text-align: left;
        width: 300px;
        height: 720px;
        background: #FFFFFF;
    }
    .left_nav .title{
        color: #008CFA;
        height: 81px;
        line-height: 81px;
        font-size:20px;
        margin-left: 24px;
    }
    .list{
        color: #444444;
        font-size: 14px;
        padding-left: 40px;
        line-height: 44px;
        position: relative;
        cursor:pointer;
    }
</style>
