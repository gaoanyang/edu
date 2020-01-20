<template>
    <div class="plazaAch_article">
        <div class="ar_title">
            <span class="s1">工作室首页</span>
            <span class="jt">&gt;</span>
            <span class="s2">工作室资讯</span>
        </div>
        <div class="ar_content">
            <left_nav
                    :title=title
                    :mainList=mainList
                    :nowIndex="nowIndex"
            >
            </left_nav>
            <div class="ar_nr">
                <div class="zjwz">
                    <span class="zjwzline">活动资讯</span>
                </div>
                <articleList
                        :res="res"
                        :data="dataZx.data"
                        :url="url"
                ></articleList>
                <Nav1
                        :total='dataZx.totalPages'
                        :currentPage='currentPage'
                        :pageSize='1'
                        @sendPage="getpage"
                ></Nav1>
            </div>
        </div>
    </div>
</template>
<script>
    import Left_nav from '@/components/left_nav'
    import articleList from '@/components/articleList'
    import Nav1 from '@/components/pageNav'
    export default {
        components:{Left_nav,articleList,Nav1},
        data() {
            return {
                dataZx:'',
                currentPage:1,
                title:'工作室资讯',
                mainList:[
                  {name:'活动资讯',sign:'/activity_consult'},
                  {name:'公告通知',sign:'/notice'}
                  ],
                res:false,
                nowIndex:0,
                url:'/a'

            }
        },
        methods:{
            getpage(page) {
                this.currentPage = page
                this.getAxiosZx(this.currentPage)
            },
            getAxiosZx(page) {
                var url =  this.GLOBAL.baseURL + '/portal/news/page?page='+page+'&size=10&newsType=1&studioId='+sessionStorage.getItem('studioId')
                console.log(url)
                this.$http.get(url).then(res => {
                    console.log(res)
                    this.dataZx = res.data.data
                });
            },
        },
        created() {
            this.$emit('getMsg',false)
            this.getAxiosZx(1)
        }
    }
</script>
<style lang="scss">
    .plazaAch_article{
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

            }
        }
    }
</style>
<style scoped lang="scss">
    .plazaAch_article{
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
                    .ivu-btn-warning{
                        width: 100px;
                        height: 40px;
                        margin-top: -20px;
                        float: right;
                    }
                    .zjwzline{
                        padding-bottom: 7px;
                        border-bottom: 2px solid #008CFA;
                    }
                }
            }
        }
    }
</style>
