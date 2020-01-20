<template>
    <div class="center">
      <div class="white"></div>
      <div class="main">
          <iframe style="margin-top:0px;display:block;" 
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          border="0"
          id="alimamaifrm"
          name="alimamaifrm"
          scrolling="no" 
          height="1600px" 
          width="100%"
          src="http://rsc.zgjsfz.com/search/index">
          </iframe>

<!--        <div class="tAll">-->
<!--            <div class="title">-->
<!--                <p class="p1">资源中心</p>-->
<!--                <p class="p2">Resource Center</p>-->
<!--            </div>-->
<!--            <div class="searchDiv" :class="DropdownClass == true ? 'dropdownActive' :''">-->
<!--                <Dropdown @on-visible-change="visit" :stop-propagation="true">-->
<!--                    <a href="javascript:void(0)">-->
<!--                        {{dataT}}-->
<!--                        <Icon type="ios-arrow-down"></Icon>-->
<!--                    </a>-->
<!--                    <DropdownMenu slot="list" :stop-propagation="true">-->
<!--                        <DropdownItem v-if="type=='教学资源'" @click.native="cliRes('教学资源')">教学资源</DropdownItem>-->
<!--                        <DropdownItem v-if="type=='课程资源'" @click.native="cliRes('课程资源')">课程资源</DropdownItem>-->
<!--                    </DropdownMenu>-->
<!--                </Dropdown>-->
<!--                <Input search enter-button="Search" placeholder="请输入关键词搜索" />-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="MAll">-->
<!--            <Tabs :animated="false">-->
<!--                <TabPane label="课程资源">-->
<!--                    <Mul></Mul>-->
<!--                </TabPane>-->
<!--                <TabPane label="教学资源">-->
<!--                    <MulT></MulT>-->
<!--                </TabPane>-->
<!--                <Button type="warning" slot="extra">我要上传资源</Button>-->
<!--            </Tabs>-->
<!--        </div>-->
      </div>
    </div>
</template>
<script>
import Mul from './mul'
import MulT from './mulT'
export default {
    components:{Mul,MulT},
    data() {
        return {
            DropdownClass:false,
            items:[
                {name:"公共课程",id:1},
                {name:"学科课程",id:2},
                {name:"专项课程",id:3},
                {name:"幼教课程",id:4}
            ],

            dataT:'课程资源',
            type:"教学资源",
        }
    },
    created() {
        this.$emit('getMessage', 2);
    },
    methods:{
        visit(val) {
            if(val == true) {
                this.DropdownClass = true
            }else{
                this.DropdownClass = false
            }
        },
        cliRes(val) {
            console.log(val)
            if(val == '课程资源') {
                this.dataT = '课程资源'
                this.type = '教学资源'
            }else{
                this.dataT = '教学资源'
                this.type = '课程资源'
            }
        }
    }

}
</script>
<style lang="scss">
.center {
    .white{
        width: 1200px;
        height: 64px;
        background: #EAF6FE;
        margin: auto;
        position: absolute;
        left: 0px;
        right: 0px;
    }
    .MAll{
        .ivu-tabs-nav-right{
            .ivu-btn{
                font-size: 14px;
                padding: 8px 17px 8px;
            }
        }
        .ivu-tabs-ink-bar{
            display: none;
        }
        div{
            .centerUl{
                text-align: left;
                position: relative;
                height: 200px;
                ul{
                    text-align: left;
                    width: 400px;
                    position: absolute;
                    left: 0px;
                }
            }
        }
        /*.hha:first-of-type {*/
        /*    color: blue;*/
        /*}*/
        .ivu-tabs-nav{
            .ivu-tabs-tab:nth-child(2) {
                border-radius: 5px 0px 0px 0px;
            }
            .ivu-tabs-tab:nth-child(3) {
                border-radius: 0px 5px 0px 0px;
            }
        }
        .ivu-tabs-bar{
            border-bottom: 1px solid #0081F9;
            margin-bottom: 16px;
            padding-bottom: 1px;
        }
      .ivu-tabs-tab{
          background: #E7F5FE;
          width: 120px;
          height: 44px;
          margin-right: 0px;
          color: #0081F9;
          line-height: 29px;
          transition: color 0s ease-in-out;
      }
      .ivu-tabs-tab-active{
          color: #ffffff;
          background: #0081F9;
          transition: color 0s ease-in-out;
      }
    }
    .searchDiv{
        .ivu-select-dropdown{
            box-shadow: 0px 0px 0px;
            margin: 0px;
            border: 1px solid #0081F9;
            border-top: 1px solid #ffffff;
            border-radius: 0px;
            margin-top: -2px;
            border-bottom-right-radius:7px;
            border-bottom-left-radius:7px;
            width:91px;
            margin-left: 1px;
            .ivu-dropdown-item{
                padding-right: 36px;
            }
            .ivu-dropdown-menu{
                min-width: 80px;
            }
        }
        .ivu-input {
            position: relative;
            z-index: 0;
            height: 100%;
            border: none;
        }
    }
}
</style>
<style lang="scss" scoped>
.center{
    background: #E7F5FE;
    padding-top: 14px;
    padding-bottom: 14px;
    .mul_cdts{
        #id_curs_module{
            margin-top: 20px;
        }
        #id_curs_special{
            margin-top: 20px;
        }
        .box1{
            cursor:pointer;
            font-size: 14px;
            line-height: 27px;
            min-width: 43px;
            height: 34px;
            padding: 5px 15px 5px 15px;
            border-radius: 5px;
        }
        .active{
            background: #008CFA;
            color: #ffffff;
        }
        .tlte{
            background: #cccccc;
            float: left;
            line-height: 25px;
            font-size: 14px;
            color: #ffffff;
            border-radius: 5px;
        }
        .items{
            width: 1000px;
            float: left;
            padding-left: 20px;
            .bx{
                float: left;
            }
            .innitem{
                float: left;
            }
        }
      #id_curs_module{

      }
    }
    .main{
        width: 1200px;
        min-height: 800px;
        background: #ffffff;
        margin: auto;
        padding: 0px 24px 0px 24px;
        .tAll{
            margin-bottom: 40px;
            display: flex;
            justify-content: space-between;
            .title{
                color: #222222;
                display: inline-block;
                margin-top: 33px;
                line-height: 26px;
                text-align: left;
                .p1{
                    font-size: 24px;
                }
                .p2{
                    font-size:16px;
                }
            }
            .searchDiv{
                position: relative;
                margin-top: 36px;
                width: 380px;
                height: 40px;
                border: 1px solid #0081F9;
                display: inline-block;
                border-radius: 5px;
                .ivu-dropdown {
                    width: 90px;
                    display: inline-block;
                    height: 38px;
                    position: absolute;
                    left: 0px;
                    line-height: 40px;
                    z-index: 2;
                    background: #E7F5FE;
                    border-radius: 7px 0px 0px 7px;
                }
                .ivu-input-group {
                    top: 0px;
                    padding-left: 84px;
                    height: 100%;
                }
            }
            .dropdownActive{
                border-bottom-left-radius:0px;
                .ivu-dropdown {
                    border-right: 1px solid #0081F9;
                    border-bottom-left-radius:0px;
                }
            }
        }
    }
}
</style>
