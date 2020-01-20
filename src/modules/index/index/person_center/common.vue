<template>
    <div class="left_nav">
        <div class="head">
          <div class="avatar">
              <img :src="avatar" />
<!--            <img src="https://gzs-file.oss-cn-beijing.aliyuncs.com/d498e149-7b5e-4efb-aeb4-a9806b793582.jpg" />-->
          </div>
          <div class="name">{{name}}</div>
        </div>
        <div
                @click="changeTab(m.sign)"
                class="list"
                :class="[index === nowIndex ? 'tab-active':'']"
                :key="index" v-for="(m,index) in mainList">
            <a :class="[index === nowIndex ? 'tab-astyle':'']">{{m.name}}</a>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            title:{
                type:String,
                default:"名师领航1"
            },
            mainList:{
                type:Array,
                // default: ["专家文章","名师课程","学习资源"]
                default:() => [
                    {name:'修改个人信息',sign:'/pg_article'},
                    {name:'修改密码',sign:'/pg_course'},
                ]
            },
            nowIndex:{
                type:Number,
                default:0
            },
        },
        data() {
            return {
                avatar:'',
                name:''
            }
        },
        methods:{
            changeTab(url) {
                this.$router.push({ path: url })
            },
            //获取所有信息
            getMessage() {
                let url = this.GLOBAL.baseURL+'/board/user/info'
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' +  JSON.parse(sessionStorage.getItem("user")).access_token
                    }
                }).then(res => {
                    console.log(res)
                    var data = res.data.data.user
                    this.avatar = data.avatar
                    this.name = data.fullName
                })
            },
        },
        mounted() {
            this.getMessage()
        }
    }
</script>
<style scoped lang="scss">
    a{
        color: #444444;
    }
    .tab-active{
        background: #EAF6FE;
        a{
            color: #008CFA;
        }
    }
    .tab-astyle:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: #008CFA;
    }
    .left_nav{
        vertical-align: top;
        display: inline-block;
        text-align: left;
        width: 300px;
        height: 841px;
        background: #FFFFFF;
        .head{
            height: 283px;
            width: 100%;
            .avatar{
                margin: auto;
                position: relative;
                top: 61px;
                width: 117px;
                height: 117px;
                img{
                    border-radius: 117px;
                    width: 100%;
                    height: 100%;
                }
            }
            .name{
                text-align: center;
                position: relative;
                top: 72px;
                font-size: 20px;
                color: #333333;
            }
        }
    }
    .list{
        color: #444444;
        font-size: 14px;
        padding-left: 40px;
        line-height: 44px;
        position: relative;
        cursor:pointer;
    }
</style>
