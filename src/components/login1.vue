<template>
    <div>
        <div class="loginDiv" v-if="!islogin">
            <div class="title"><span class="s1">用户登录</span>
<!--                <span class="s2">立即注册</span>-->
            </div>
            <p class="p1">
                <img class="userInputIcon" src="../assets/icon_user.png">
                <input id="username" name="username" v-model="username" tabindex="1" placeholder="请输入用户名" class="userInput logininput" type="text" value="" size="25" autocomplete="false">
            </p>
            <p>
                <img class="userInputIcon" src="../assets/icon_password.png">
                <input id="password" name="password" v-model="password" tabindex="2" placeholder="请输入密码" class="userInput logininput" value="" type="password" size="25" autocomplete="false" >
            </p>
            <p class="p3">
                <input class="codeInput logininput" v-model="code" id="code" name="code" type="text" placeholder="请输入验证码">
                <img class="myCodeImg" :src="codeImg" @click="getCode" v-model="code">
            </p>
<!--            <p class="p4">-->
<!--                <Checkbox>自动登录</Checkbox>-->
<!--                <span>忘记密码?</span>-->
<!--            </p>-->
            <i-button type="primary" @click="login">立即登录</i-button>
        </div>
        <div class="logged" v-if="islogin">
            <p class="p1">
                <Icon type="md-person" /><span class="shy">欢迎您!</span><span class="sname">{{myUserName}}</span>
            </p>
            <div v-if="stuType">
                <p class="p2">我的工作室</p>
                <p class="p3" @click="linkToStudio">{{studioData.studioName}}</p>
            </div>
            <p class="p4">
                <Button @click="logout">退出</Button>
                <Button type="primary" @click="linkToEdit">个人设置</Button>
            </p>
        </div>
    </div>

</template>
<script>
    import Utils from '@/common/util'
    let keyOne = '313233343536373a'
    export default {
        data() {
            return {
                stuType:true,
                username:'',
                password:'',
                code:'',
                islogin:false,
                myUserName:'',
                studioData:{},
                codeImg:'',
                timeA:''
            }
        },
        methods:{
            linkToEdit() {
              this.$router.push({'path':'/edit_info'})
            },
            //获取验证码
            getCode() {
                let a = Date.now();
                this.timeA = a
                let url = this.GLOBAL.baseURL+'/code?randomStr='+this.timeA
                this.$http.get(url).then(res => {
                    this.codeImg = this.GLOBAL.baseURL+'/code?randomStr='+this.timeA
                })
            },
            //获取所有信息
            getMessage(user) {
                if(user.type == 0) {
                    this.myUserName = user.username
                    this.stuType = false
                }else{
                    let url = this.GLOBAL.baseURL+'/board/user/info'
                    this.$http.get(url,{
                        headers:{
                            'Authorization': 'Bearer ' +  JSON.parse(sessionStorage.getItem("user")).access_token
                        }
                    }).then(res => {
                        console.log(res)
                        this.stuType = true
                        this.studioData = res.data.data.studio
                        this.myUserName = res.data.data.user.username
                        sessionStorage.setItem('position', res.data.data.studioUser.position)
                    })
                }
            },
            linkToStudio() {
                window.location.href="/work/work.html#/memberList?studioId=" + JSON.parse(sessionStorage.getItem("user")).studioId
            },
            logout() {
                sessionStorage.removeItem('user')
                this.islogin = false
            },
            login() {
                console.log(Utils.encrypt(this.password,'wuhanzhilijiaoyu'))
                let url = this.GLOBAL.baseURL+'/auth/oauth/token?grant_type=password&username='+this.username+'&password='+Utils.encrypt(this.password,'wuhanzhilijiaoyu')+'&randomStr='+this.timeA+'&code='+this.code
                console.log(url)
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Basic ' + 'Y2xpZW50SWQ6c2VjcmV0'
                    }
                }).then(res => {
                    this.getCode()
                    console.log(res)
                        if(res.status == 200) {
                            if(res.data.type == 0) {
                                this.myUserName = res.data.username
                            }
                            sessionStorage.setItem('user', JSON.stringify(res.data))
                            this.token = JSON.parse(sessionStorage.getItem("user")).access_token
                            console.log(this.token)
                            this.getMessage(res.data)
                            if(this.$route.path == '/work_login') {
                                this.$router.go(-1)
                            }
                            this.islogin = true
                        }
                    }).catch(error=>{
                        this.getCode()
                        alert('账号/密码或验证码错误')
                      });
            }
        },
        mounted() {
            this.getCode()
            var user = sessionStorage.getItem('user')
            if(user) {
                user = JSON.parse(user)
                this.islogin = true
                this.getMessage(user)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .logged{
        width: 290px;
        height: 270px;
        background: #ffffff;
        position: absolute;
        top: 35px;
        right: 18%;
        padding: 40px 30px 15px 30px;
        text-align: left;
        .p1{
            font-size: 16px;
            color: #222222;
            .ivu-icon{
                color: #008CFA;
            }
            .shy{
                margin-left: 25px;
            }
            .sname{
                margin-left: 10px;
            }
        }
        .p2{
            margin-top: 25px;
            color: #888888;
        }
        .p3{
            width: 230px;
            height: 40px;
            background: #008CFA;
            line-height: 40px;
            color: #ffffff;
            text-align: center;
            font-size: 16px;
            border-radius: 6px;
            margin-top: 10px;
        }
        .p4{
            width: 230px;
            text-align: center;
            .ivu-btn{
                width: 100px;
                height: 35px;
                margin-top: 50px;
            }
            .ivu-btn-default{
                float: left;
            }
            .ivu-btn-primary{
                float: right;
            }
        }
    }
    .loginDiv{
        width: 340px;
        height: 380px;
        background: #ffffff;
        position: absolute;
        top: 35px;
        right: 18%;
        padding: 30px;
        p{
            position: relative;
            margin-top: 20px;
            img{
                position: absolute;
                top: 10px;
                width: 25px;
                height: 25px;
                margin-left: 10px;
            }
            .myCodeImg{
                position: absolute;
                top: 0px;
                width: 80px;
                height: 40px;
                margin-left: 10px;
            }
            input{
                border: 1px solid #bfbfbf;
                line-height: 40px;
                height: 40px;
                width: 280px;
                padding-left: 39px;
                background-color: #FFF;
                font-size: 14px;
            }
        }
        .p3{
            width: 160px;
            input{
                width: 160px;
                padding-left: 10px;
            }
        }
        .p4{
            display: flex;
            justify-content: space-between;
        }
        .ivu-btn-primary{
            width: 280px;
            height: 44px;
            margin-top: 31px;
            font-size: 14px;
        }
        .title{
            display: flex;
            justify-content: space-between;
            .s1{
                vertical-align: middle;
                color: #222222;
                font-size:20px;
            }
            .s2{
                vertical-align: middle;
                color: #008CFA;
                font-size:14px;
                padding-top: 5px;
            }
        }
    }
</style>
