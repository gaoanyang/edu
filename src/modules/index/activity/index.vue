<template>
    <div class="activityI">
      <div class="ar_title">
        <span class="s1">首页</span>
        <span class="jt">&gt;</span>
        <span class="s2">活动资讯</span>
      </div>
        <Left_nav
                :title=title
                :mainList=mainList
                :nowIndex="nowIndex"
        >
        </Left_nav>
        <div class="rightMain">
            <div class="zjwz"><span class="zjwzline">活动资讯</span></div>
            <articleList
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
</template>
<script>
import Left_nav from '@/components/left_nav'
import Nav1 from '@/components/pageNav'
import articleList from '@/components/articleList'
export default {
    components:{Left_nav,Nav1,articleList},
    data() {
        return {
            dataZx:'',
            currentPage:1,
            title:'三名工作室',
            mainList:[
                {name:'公告通知',sign:'/activity_notice'},
                {name:'活动资讯',sign:'/activity_index'},
                {name:'名师风采',sign:'/teach_index'}
            ],
            nowIndex:1,
            url:'/b'
        }
    },
    methods:{
        getpage(page) {
            this.currentPage = page
            this.getAxiosZx(this.currentPage)
        },
        getAxiosZx(page) {
            var url =  this.GLOBAL.baseURL + '/portal/news/page?page='+page+'&size=10&newsType=1&kind=0'
            this.$http.get(url).then(res => {
                this.dataZx = res.data.data
            });
        },
    },
    created() {
        this.$emit('getMessage', 1);
        this.getAxiosZx(1)
    }
}
</script>
<style lang="scss">
    .activityI{
        background: #E7F5FE;
        padding-bottom: 14px;
        .rightMain{
            position: relative;
            .myUi1{
                width: 838px;
                margin-top: 18px;
                margin: auto;
                li{
                    margin-top: 20px;
                }
            }
        }
    }
</style>
<style scoped lang="scss">
.activityI{
    .rightMain{
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
}

</style>
