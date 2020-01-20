<template>
    <div class="p_navigation">
        <div class="header">
          <div class="left_header">
            <div class="h_smgzx hds">
                三名工作室<span>-</span>
            </div>
            <div class="h_address hds">
                宁波市鄞州区
            </div>
            <div class="h_gc hds">
                <img src="../../assets/icon_all.png">
                工作室广场
            </div>
          </div>
          <div class="right_header">
              <Button type="primary">登录</Button>
              <Button>注册</Button>
          </div>
        </div>
        <div class="title-img">
            <div class="title_fot1">王崧舟名师工作室</div>
            <img src="../../assets/gzs_banner.png">
        </div>
        <div class="outer_tab">
            <div class="inner_tab">
                <div class="inner_tabs">
                    <div
                            @click="changeTab(index)"
                            class="header-tab"
                            v-for="(item,index) in tabList"
                            :key="index"
                    >{{ item }}</div>
                </div>
                <div class="right_tab header-tab">工作室管理</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tabList:[
                    '首页','活动资讯','名师导航','成员沙龙','成果分享'
                ]
            }
        },
        methods:{
            changeTab(index) {
                if(index == 0){
                    this.$router.push({ path: '/plazaHome' })
                }
                if(index == 1) {
                    this.$router.push({ path: '/activity_consult' })
                }else if(index == 2){
                    this.$router.push({ path: '/pg_article' })
                }else if(index == 3) {
                    this.$router.push({path:'/p_salon'})
                }else if(index == 4) {
                    this.$router.push({path:'/pach_article'})
                }
            }
        }
    }
</script>
<style lang="scss">
    .p_navigation{
        .right_header{
            .ivu-btn-default{
                border-color:#008CFA;
                span{
                    color:#008CFA;
                }
            }
            .ivu-btn-primary{
                margin-right: 10px;
            }
        }
    }
</style>
<style scoped lang="scss">
    .header-tab{
        display: inline-block;
        width: 120px;
        height: 60px;
        line-height: 60px;
        cursor:pointer;
    }
    .header-tab:hover{
        background: #0082E8;
    }
    .header-tabs{
        display: inline-block;
        margin-right: 20%;
    }
    .p_navigation{
      .header{
        display:flex;
        justify-content:space-between;
        line-height: 46px;
        height: 46px;
        width:1200px;
        margin: auto;
        .left_header{
            display: inline-block;
            width: auto;
            .hds{
                display: inline-block;
            }
            .h_smgzx{
                font-size:16px;
                font-weight:400;
                color:rgba(34,34,34,1);
                line-height:32px;
                span{
                    margin-left: 7px;
                    margin-right: 7px;
                    color:rgba(102,102,102,1);
                }
            }
            .h_address{
                font-size:14px;
                font-weight:400;
                color:rgba(102,102,102,1);
                /*line-height:32px;*/
            }
            .h_gc{
                font-size:14px;
                font-weight:400;
                color:rgba(0,140,250,1);
                margin-left: 50px;
                img{
                    position: relative;
                    top: 2px;
                }
            }
        }
        .right_header{
            display: inline-block;
        }
      }
      .title-img{
        height: 320px;
        width: 100%;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        .title_fot1{

            width: 1200px;
            position: absolute;
            text-align: left;
            margin: auto;
            left: 0px;
            right: 0px;
            top: 70px;
            font-size:46px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
        }
      }
      .outer_tab{
          width:100%;
          height:60px;
          background:rgba(0,140,250,1);
          .inner_tab{
              display:flex;
              justify-content:space-between;
              width:1200px;
              height: 100%;
              font-size: 16px;
              color: #FFFFFF;
              margin: auto;
              .inner_tabs{
                  display: inline-block;
              }
          }
          .right_tab{
              line-height: 60px;
              display: inline-block;
          }
      }
    }
</style>
