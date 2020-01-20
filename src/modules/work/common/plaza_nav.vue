<template>
    <div class="p_navigation">
        <div class="header">
            <div class="left_header">
                <div class="h_smgzx hds">
                    三名工作室<span>-</span>
                </div>
                <div class="h_address hds">
                    {{data.cityName}}{{data.areaName}}
                </div>
<!--                <a href="http://localhost:8080/index.html#/plaza_home">-->
                    <div class="h_gc hds" @click="linktoPlaza">
                        <img src="../resourceCommon/img/icon_all.png">
                        工作室广场
                    </div>
<!--                </a>-->
            </div>
            <div class="right_header" v-if="!islogin">
                <Button type="primary" @click="link">登录</Button>
                <Button>注册</Button>
            </div>
            <div class="right_header2" v-if="islogin">
                <span class="s1">{{myUserName}}</span>
                <span class="s2" @click="linkToEdit">个人设置</span>
                <span class="s2" @click="logout">退出</span>
            </div>
        </div>
        <div class="title-img">
            <div class="title_fot1">{{data.studioName}}</div>
            <img :src="data.bannerUrl">
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
                <div v-if="userpermission" class="right_tab header-tab" @click="link2">工作室管理</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            isManage:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                data:{},
                userpermission:true,
                myUserName:'',
                islogin:false,
                tabList:[
                    '首页','活动资讯','名师导航','成员沙龙','成果分享'
                ]
            }
        },
        methods:{
            linkToEdit() {
                window.location.href = '/index/index.html#/edit_info'
            },
            linktoPlaza() {
                window.location.href = '/index/index.html#/plaza_home'
            },
            //获取工作室详情
            getStudioDetail() {
                var url = this.GLOBAL.baseURL+"/portal/studio/" + sessionStorage.getItem('studioId')
                this.$http.get(url).then(res => {
                    console.log(res)
                    this.data = res.data.data
                    var outer_tab = document.getElementsByClassName('outer_tab')[0]
                    switch (this.data.style) {
                        case "1":
                            outer_tab.style.backgroundColor = '#008cfa'
                            break
                        case "2":
                            outer_tab.style.backgroundColor = '#ec3a46'
                            break
                        case "3":
                            outer_tab.style.backgroundColor = '#18bc62'
                            break
                        case "4":
                            outer_tab.style.backgroundColor = '#f89e02'
                            break
                    }

                })
            },
            logout() {
                sessionStorage.removeItem('user')
                // sessionStorage.clear()
                // localStorage.clear()
                this.islogin = false
            },
            changeTab(index) {
                if(index == 0){
                    this.$router.push({ path: '/plazaHome',query:{studioId:sessionStorage.getItem('studioId')} })
                }
                if(index == 1) {
                    this.$router.push({ path: '/activity_consult',query:{studioId:sessionStorage.getItem('studioId')} })
                }else if(index == 2){
                    this.$router.push({ path: '/pg_article',query:{studioId:sessionStorage.getItem('studioId')} })
                }else if(index == 3) {
                    this.$router.push({path:'/p_salon',query:{studioId:sessionStorage.getItem('studioId')}})
                }else if(index == 4) {
                    this.$router.push({path:'/pach_article',query:{studioId:sessionStorage.getItem('studioId')}})
                }
            },
            link() {
                window.location.href = '/work/work.html#/work_login'
            },
            link2() {
                if(this.islogin == true) {
                    console.log(sessionStorage.getItem('studioId'))
                    console.log(JSON.parse(sessionStorage.getItem('user')))
                    if(JSON.parse(sessionStorage.getItem('user')).type == 1&&sessionStorage.getItem('studioId') == JSON.parse(sessionStorage.getItem('user')).studioId) {
                        var new_url = '/workAdmin/workAdmin.html#/admin'
                        window.open(new_url);
                    }
                }else{
                    alert('请登录')
                }
            }
        },
        created() {
        },
        mounted() {
            this.getStudioDetail()
            var user = sessionStorage.getItem('user')
            console.log(JSON.parse(sessionStorage.getItem('user')))
            if(user) {
                this.myUserName = user.username
                this.islogin = true
            }
            if(user&&JSON.parse(sessionStorage.getItem('user')).type == 1&&sessionStorage.getItem('studioId') == JSON.parse(sessionStorage.getItem('user')).studioId&&sessionStorage.getItem('position') != '4') {
                this.userpermission = true
            }else{
                this.userpermission = false
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
                    cursor:pointer;
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
            .right_header2{
                font-size: 14px;
                font-weight: 400;
                color: #666666;
                .s2{
                    cursor: pointer;
                    margin-left: 10px;
                }
                .s2:hover{
                    color: #008cfa;
                }
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
