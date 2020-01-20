<template>
    <div class="main">
      <div class="main_inner">
        <navigate
                :dataZx="dataZx"
                :dataGg="dataGg"
        ></navigate>
        <nav-people></nav-people>
      </div>
    </div>
</template>
<script>
import navigate from './subPage/navigate'
import navPeople from './subPage/navPeople'
export default {
    components:{navigate,navPeople},
    props:['dataZx','dataGg'],
    data() {
        return {

        }
    },
    methods:{
    },
    created() {
        this.$emit('getMsg',false)
    }
}
</script>
<style scoped lang="scss">
.main{
    width: 100%;
    background: #EAF6FE;
  .main_inner{
      margin: auto;
      width: 1200px;
      background: #EAF6FE;
  }
}
</style>
