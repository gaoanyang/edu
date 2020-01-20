<template>
  <div class="t_right">
    <ul class="ui2">
      <li class="Ili" v-for="(item,index) in data" :key="index">
        <div class="leftD">
          <img :src="item.imageUrl" />
<!--          <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1656578002,924020932&fm=173&app=25&f=JPEG?w=640&h=470&s=AD1A825D3542F35D4C3D1C7F0300C062"/>-->
        </div>
        <div class="rightD">
          <p class="p1">
            <span>{{item.newsTitle}}</span>
          </p>
          <p class="p2">
              <span>{{item.newsIntroduction}}</span>
          </p>
          <span class="s1" @click="link(item.newsId)">查看详情</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
    export default {
        components:{},
        props:{
          data:{
              type:Array,
              default:function() {
                return []
              }
          }
        },
        data() {
            return {

            }
        },
        methods:{
            link(id) {
              this.$router.push({path:'/c',query:{id:id}})
            }
        },
        created() {
        }
    }
</script>

<style scoped lang="scss">
.t_right{
  .ui2{
     width: 838px;
     margin: auto;
     padding-bottom: 137px;
    .Ili{
      width: 100%;
      height: 179px;
      list-style: none;
      padding: 30px 10px 29px 10px;
      border-bottom: 1px solid #E7E7E7;
      .leftD{
        width: 160px;
        height: 120px;
        display: inline-block;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .rightD{
        display: inline-block;
        width: 630px;
        height: 120px;
        vertical-align: top;
        padding-top: 7px;
        padding-bottom: 6px;
        margin-left:21px;
        position: relative;
        p{
          /*display: inline-block;*/
        }
        .p1{
            color: #222222;
            font-size: 20px;
        }
        .p2{
            margin-top: 14px;
            color:#7D7D7D;
            font-size: 14px;
            line-height: 23px;
        }
        .s1{
            cursor: pointer;
            position: absolute;
            right: 0px;
            color: #0081F9;
            font-size: 14px;
            bottom: 0px;
        }
      }
    }
  }
}
</style>
