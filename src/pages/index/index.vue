<template>
    <div>
        这是首页
    </div>
</template>
<script>
export default {
    components:{},
    data() {
        return {

        }
    },
    methods:{
      getAxios() {
          this.$http.get("/api/index").then(res => {
              console.log(res);
          });
      }
    },
    mounted() {
        console.log('123')
        this.getAxios()
    }
}
</script>
<style>
</style>
