<template>
    <div class="plaza_home">
        <div class="main">
            <div @click="changeTab()" class="list" v-for="(a,index) in list" :key="index" :class="(index-3)%4 == 0?'last':''">{{a.title}}{{index}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        components:{},
        data() {
            return {
                list:[
                    {
                        title:"朱丹名名师工作室"
                    },
                    {
                        title:"朱丹名名师工作室"
                    },
                    {
                        title:"朱丹名名师工作室"
                    },
                    {
                        title:"朱丹名名师工作室"
                    },
                    {
                        title:"朱丹名名师工作室"
                    },
                    {
                        title:"朱丹名名师工作室"
                    },
                    {
                        title:"朱丹名名师工作室"
                    },
                    {
                        title:"朱丹名名师工作室"
                    },
                    {
                        title:"朱丹名名师工作室"
                    },
                    {
                        title:"朱丹名名师工作室"
                    },
                    {
                        title:"朱丹名名师工作室"
                    }
                ]
            }
        },
        methods:{
            changeTab() {
                this.$router.push({ path: '/activity_consult' })
            }
        },
        mounted() {
        }
    }
</script>
<style scoped>
    .plaza_home{
        width: 100%;
        background: #ffb6c1;
    }
    .main{
        font-size: 0px;
        width: 860px;
        background: green;
        /*height: 100%;*/
        margin: auto;
    }
    .list{
        margin-right: 20px;
        width: 200px;
        height: 200px;
        background: white;
        display: inline-block;
    }
    .last{
        margin-right: 0px;
    }
</style>
