<template>
    <div class="men">
        <div class="desc">
            <title-line class="t2"
                        :title="title3"
            ></title-line>
            <div class="inner" v-for="(item,index) in expertData" :key="index">
              <img :src="item.avatar"/>
              <div class="name">{{item.fullName}}</div>
              <div class="des"> {{item.label}}</div>
            </div>
<!--            <div class="inner inner2">-->
<!--                <img src="../../resourceCommon/img/user02.png"/>-->
<!--                <div class="name">彭万里</div>-->
<!--                <div class="des">著名家庭教育专家</div>-->
<!--            </div>-->
<!--            <div class="inner inner2">-->
<!--                <img src="../../resourceCommon/img/user02.png"/>-->
<!--                <div class="name">彭万里</div>-->
<!--                <div class="des">著名家庭教育专家</div>-->
<!--            </div>-->
        </div>
    </div>
</template>
<script>
    export default {
        components:{},
        props:['title3','expertData'],
        data() {
            return {
                title2:'引领专家'
            }
        },
        methods:{
            getAxios() {
            }
        },
        created() {
            this.getAxios()
        }
    }
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
.men{
  .desc{
    text-align: left;
    .t2{
      padding-top: 0px;
    }
    .inner2{
        margin-left: 10px;
    }
    .inner{
      display: inline-block;
      margin-top: 26px;
      width: 130px;
      height: 200px;
      text-align: center;
      .name{
        margin-top: 10px;
        font-size: 20px;
        color: #008CFA;
      }
      .des{
          color: #444444;
          font-size: 12px;
      }
      img{
          width: 90px;
          border-style: none;
          height: 90px;
          border-radius: 90px;
      }
    }
  }
}
</style>
