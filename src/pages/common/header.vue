<template>
    <div class="index-header">
        <div class="index-header-content">
            <div class="header-important">
                <div class="header-logo"></div>
                <div class="header-title-foo">宁波市鄞州区“三名”工作室</div>
            </div>
            <div class="header-tabs">
                <div @click="changeTab(item.sign,index)" class="header-tab"
                     :class="[index === nowIndex ? 'tab-active':'',index === activeIndex ? 'tab-active':'']"
                     v-for="(item,index) in tabList"  :key='index'>{{ item.name }}</div >
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                nowIndex:'',
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
        }
    }
</script>
<style lang="scss" scoped>
    .header-tab{
        cursor: pointer;
        display: inline-block;
        width: 94px;
        height: 85px;
        line-height: 85px;
    }
    .header-important{
        display: inline-block;
        margin-left: 10%;
        line-height: 85px;
    }
    .header-tabs{
        display: inline-block;
        margin-right: 20%;
        .tab-active{
            color:red;
        }
    }
    .header-title-foo{
        font-size: 29px;
        font-weight: 600;
    }
    .index-header-content {
        border-bottom: 2px solid #20a0ff;
        height: 85px;
        display: flex;
        justify-content: space-between;
    }
</style>
