<template>
  <div class="plaza_article">
    <div class="ar_title">
      <span class="s1">工作室首页</span>
      <span class="jt">&gt;</span>
      <span class="s2">名师领航</span>
      <span class="jt">&gt;</span>
      <span class="s2">专家文章</span>
    </div>
    <div class="ar_content">
      <left_nav
              :title=title
              :mainList=mainList
              :nowIndex="nowIndex"
      >
      </left_nav>
      <div class="ar_nr">
        <div class="zjwz"><span class="zjwzline">专家文章</span></div>
        <workArticleList
          :res="res"
          :data="data"
          :url="url"
        ></workArticleList>
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
import workArticleList from '@/components/workArticleList'
import Nav1 from '@/components/pageNav'
export default {
  components:{left_nav,workArticleList,Nav1},
  data() {
    return {
      res:false,
      total:1,
      currentPage:1,
      title:'名师领航',
      mainList:[
        {name:'专家文章',sign:'/pg_article'},
        {name:'名师课程',sign:'/pg_course'},
        {name:'学习资源',sign:'/pg_resource'}
      ],
      nowIndex:0,
      data:[],
      url:'/pg_articleD'
    }
  },
  methods:{
    getPage(val) {

    },
    getArticleList(page) {
      var url =  this.GLOBAL.baseURL + "/portal/article/page?page=1&size=10&articleType=0&studioId="+sessionStorage.getItem('studioId')
      this.$http.get(url).then(res => {
        this.data = res.data.data.data
        console.log('----------------------------------------')
        console.log(this.data)
      });
    },
  },
  created() {
    this.$emit('getMsg',false)
    this.getArticleList()
  }
}
</script>
<style lang="scss">
.plaza_article{
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
.plaza_article{
  padding-bottom: 13px;
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
