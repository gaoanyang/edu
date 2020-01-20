<template>
  <div class="plaza_course">
    <div class="ar_title">
      <span class="s1">工作室首页</span>
      <span class="jt">&gt;</span>
      <span class="s2">名师领航</span>
      <span class="jt">&gt;</span>
      <span class="s2">名师课程</span>
    </div>
    <div class="ar_content">
        <left_nav
              :title=title
              :mainList=mainList
              :nowIndex="nowIndex"
        >
        </left_nav>
        <div class="ar_nr">
            <div class="zjwz"><span class="zjwzline">名师课程</span></div>
            <courselist></courselist>
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
import Nav1 from '@/components/pageNav'
import courselist from '../common/courselist'
export default {
    components:{left_nav,Nav1,courselist},
    data() {
        return {
            title:'名师领航',
            total:1,
            currentPage:1,
            mainList:[
                {name:'专家文章',sign:'/pg_article'},
                {name:'名师课程',sign:'/pg_course'},
                {name:'学习资源',sign:'/pg_resource'}
            ],
            nowIndex:1,
            url:'/pg_courseD'
        }
    },
    methods:{
        getPage() {

        },
    },
    mounted() {
    }
}
</script>
<style lang="scss">
.plaza_course{
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
<style lang="scss">
.plaza_course {
    background: #EAF6FE;
    .pCommon{
        width: 839px;
        margin: auto;
    }
    .ar_title {
        width: 1200px;
        height: 56px;
        line-height: 56px;
        font-size: 14px;
        margin: auto;
        text-align: left;

        .s1 {
            color: #444444;
        }

        .s2 {
            color: #888888;
        }

        .jt {
            color: #888888;
            margin-left: 5px;
            margin-right: 5px;
        }
    }
    .ar_content{
        width: 1200px;
        margin: auto;
        padding-bottom: 13px;
        .left_nav{
            height: 970px;
        }
        .ar_nr{
            margin-left:14px;
            display: inline-block;
            width: 886px;
            height: 970px;
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
