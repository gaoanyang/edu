<template>
    <div class="index-header">
        <div class="index-header-content">
            <div class="header-important">
                <div class="header-logo"></div>
                <div class="header-title-foo">宁波市鄞州区“三名”工作室</div>
            </div>
            <div class="header-tabs">
                <div @click="changeTab(item.sign,index)" class="header-tab"
                     :class="[index === nowIndex ? 'tab-active':'',index === activeIndex ? 'tab-active':'',index < 4 ? 't1':'']"
                     v-for="(item,index) in tabList"  :key='index'><span>{{ item.name }}</span><div class="myLine"></div></div>
            </div>
        </div>
<!--        <div>{{msg}}</div>-->
    </div>
</template>
<script>
    export default {
        props:['msg'],
        data() {
            return {
                nowIndex:0,
                activeIndex:'',
                tabList:[
                    {name:'首页',sign:'/index'},
                    {name:'活动资讯',sign:'/activity_index'},
                    {name:'资源中心',sign:'/center_index'},
                    {name:'名师风采',sign:'/teach_index'},
                    {name:'工作室广场',sign:'/plaza_home'},
                ]
            }
        },
        methods:{
            changeTab(url,index) {
                this.nowIndex = index
                this.$router.push({ path: url })
            }
        },
        watch:{
            "msg":{
                handler:function(newVal, oldVal){
                    this.nowIndex = newVal
                },
                immediate: true,
            }
        },
        created() {
        }
    }
</script>
<style lang="scss" scoped>
    .index-header{
        position: relative;
        background: #ffffff;
    }
    .t1{
        margin-right: 28px;
    }
    .header-tab{
        cursor: pointer;
        display: inline-block;
        width: 94px;
        /*.myLine{*/
        /*    width: 40px;*/
        /*    height: 3px;*/
        /*    margin: auto;*/
        /*    background: #008CFA;*/
        /*    position: relative;*/
        /*    top: 8px;*/
        /*}*/
    }
    .header-important{
        display: inline-block;
        line-height: 80px;
    }
    .header-tabs{
        margin-right: 200px;
        display: inline-block;
        font-size: 16px;
        .tab-active{
            color:#008CFA;
            /*span{*/
            /*    border-bottom: 3px solid #008CFA;*/
            /*    padding-bottom: 12px;*/
            /*    padding-left: 5px;*/
            /*    padding-right: 5px;*/
            /*}*/
            .myLine{
                width: 40px;
                height: 3px;
                margin: auto;
                background: #008CFA;
                position: relative;
                top: 8px;
            }
        }
    }
    .header-title-foo{
        font-size: 24px;
        font-weight: 600;
        color: #008CFA;
    }
    .index-header-content {
        /*border-bottom: 2px solid #20a0ff;*/
        align-items: center;
        margin: auto;
        width:1200px;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
