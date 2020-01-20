<template>
<div class="commonTitle">
    <div class="commonlxr">{{title}}</div>
    <span v-if="count">({{countLength}})</span>
</div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props:{
      title:{
          type:String,
          default:"领衔人"
      },
      count:{
          type: Boolean,
          default: false
      },
      countLength:{
          type:Number,
          default: 0
      }
  }
}
</script>
<style lang="scss">
    .commonTitle{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(34,34,34,1);
        padding-top: 30px;
        text-align: left;
        border-bottom: 1px solid #EAEAEA;
        .commonlxr{
            height: 35px;
            width: auto;
            display: inline-block;
            border-bottom: 2px solid #008CFA;
        }
        .commonlxr2{
            height: 35px;
            width: 72px;
            border-bottom: 2px solid #008CFA;
        }
}
</style>
