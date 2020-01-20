<template>
    <div class="plaza_resource">
        <div class="ar_title">
            <span class="s1">工作室首页</span>
            <span class="jt">&gt;</span>
            <span class="s2">名师领航</span>
            <span class="jt">&gt;</span>
            <span class="s2">学习资源</span>
        </div>
        <div class="ar_content">
            <left_nav
                    :title=title
                    :mainList=mainList
                    :nowIndex="nowIndex"
            >
            </left_nav>
            <div class="ar_nr">
                <div class="zjwz"><span class="zjwzline">学习资源</span></div>
                <articleList
                    :res="res"
                    :data="data"
                ></articleList>
                <Nav1
                        :total=total
                        :currentPage=currentPage
                        :pageSize='1'
                        @sendPage="getPage"
                        ref="child"
                ></Nav1>
            </div>
        </div>
    </div>
</template>
<script>
    import left_nav from '../common/left_nav'
    import articleList from '@/components/resList'
    import Nav1 from '@/components/pageNav'
    export default {
        components:{left_nav,articleList,Nav1},
        data() {
            return {
                total:1,
                currentPage:1,
                title:'名师领航',
                mainList:[
                    {name:'专家文章',sign:'/pg_article'},
                    {name:'名师课程',sign:'/pg_course'},
                    {name:'学习资源',sign:'/pg_resource'}
                ],
                res:true,
                nowIndex:2,
                data:[]
            }
        },
        methods:{
            getPage(val) {
            },
            getResourceList(page) {
                var url = this.GLOBAL.baseURL + "/portal/resource/page?page=1&size=10&studioId=" + sessionStorage.getItem('studioId') + "&resourceType=0"
                this.$http.get(url).then(res => {
                    // this.data = res.data.data.data
                    console.log('--------------')
                    this.data = res.data.data.content
                    console.log(this.data)
                });
            },
        },
        created() {
            this.getResourceList()
        }
    }
</script>
<style lang="scss">
    .plaza_resource{
        padding-bottom: 13px;
        .ar_nr{
            position: relative;
            .myUi1{
                width: 838px;
                margin-top: 18px;
                margin: auto;
                li{
                    margin-top: 24px;
                }
                .nd{
                    .date{
                        /*margin-right: 50px;*/
                    }
                }
            }
        }
    }
</style>
<style scoped lang="scss">
    .plaza_resource{
        background: #EAF6FE;
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
        .ar_content{
            width: 1200px;
            margin: auto;
            height: 720px;
            .ar_nr{
                margin-left:14px;
                display: inline-block;
                width: 886px;
                height: 720px;
                background: #ffffff;
                text-align: left;
                .zjwz{
                    font-size:18px;
                    height: 60px;
                    font-weight:400;
                    color:rgba(34,34,34,1);
                    padding-top: 30px;
                    border-bottom: 1px solid #EAEAEA;
                    width: 838px;
                    margin: auto;
                    .zjwzline{
                        padding-bottom: 7px;
                        border-bottom: 2px solid #008CFA;
                    }
                }
            }
        }
    }
</style>
