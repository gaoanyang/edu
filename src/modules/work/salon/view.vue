<template>
  <div class="p_salonView">
    <div class="ar_title">
        <span class="s1">工作室首页</span>
        <span class="jt">&gt;</span>
        <span class="s2">成员沙龙</span>
        <span class="jt">&gt;</span>
        <span class="s2">话题列表</span>
    </div>
    <router-view></router-view>
    <salon-right></salon-right>
  </div>
</template>
<script>
import salonRight from './component/salonRight'
export default {
    components:{salonRight},
    data() {
      return {

      }
    },
    created() {
        this.$emit('getMsg',true)
    }
}
</script>
<style scoped lang="scss">
.p_salonView {
    background: #EAF6FE;
    padding-bottom: 13px;
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
}
</style>
