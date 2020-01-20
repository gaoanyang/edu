<template>
  <div class="share_look">
      <Button @click="link">返回</Button>
      <div style="clear: both"></div>
      <p class="title">文章标题</p>
      <div class="xq">
          <p>文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情
              文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情
              文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情
              文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情
          </p>
      </div>
  </div>
</template>
<script>
export default {
    methods:{
        link() {
            this.$router.push({path:'/admin/share_article'})
        }
    }
}
</script>
<style lang="scss" scoped>
.share_look{
    .ivu-btn{
        width: 120px;
        height: 50px;
        float: left;
    }
    .title{
        font-size: 20px;
    }
    .xq{
        width: 1500px;
        margin: auto;
        margin-top: 20px;
        text-align: left;
    }
}
</style>
