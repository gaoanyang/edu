<template>
    <div class="login-box">
        <div class="login-ad">
        </div>
        <el-form v-show="signIn" :model="ruleForm2" :rules="rules2" ref="rulesForm" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <h3 class="title">用户登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="ruleForm2.password" auto-complete="off" placeholder="密码" type="password"></el-input>
            </el-form-item>
            <p class="p3">
                <input class="codeInput logininput" v-model="code" id="code" name="code" type="text" placeholder="请输入验证码">
                <img class="myCodeImg" :src="codeImg" @click="getCode" v-model="code">
            </p>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="onSubmit('rulesForm')" :loading="logining">登录</el-button>
            </el-form-item>
            <div class="bot-tools">还未注册?
                <router-link to="/login">注册</router-link>
            </div>
        </el-form>
    </div>
</template>

<script>
    import Utils from '@/common/util'
    export default {
        data () {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm3.passwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                code:'',
                codeImg:'',
                timeA:'',
                zhaohui:false,
                acc:"",
                signIn:true,
                logining: false,
                mima:false,
                ruleForm1: {
                    phone: '',
                    code: ''
                },
                ruleForm2: {
                    username: '',
                    password: ''
                },
                ruleForm3: {
                    passwd: '',
                    newpasswd: ''
                },
                rules2: {
                    username: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { type: 'string', min: 1, message: '手机号不能为空', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', min:1, message: '密码不能为空', trigger: 'blur' },
                    ]
                },
                checked: true
            }
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.loginIn()
                        console.log("success submit!!");
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            loginIn(){
                let url = this.GLOBAL+'/auth/oauth/token?grant_type=password&username='+this.ruleForm2.username+'&password='+Utils.encrypt(this.ruleForm2.password,'wuhanzhilijiaoyu')+'&randomStr='+this.timeA+'&code='+this.code
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Basic ' + 'Y2xpZW50SWQ6c2VjcmV0'
                    }
                }).then(res => {
                        this.getCode()
                        if(res.status == 200&&res.data.type=='0') {
                            console.log(res)
                            this.$router.push({ path: '/administrator' })
                            sessionStorage.setItem('adminuser', JSON.stringify(res.data))
                        }else{
                            alert('无此权限')
                        }
                    }).catch(error=>{
                        this.getCode()
                         alert('账号/密码或验证码错误')
                });
            },
            //获取验证码
            getCode() {
                let a = Date.now();
                this.timeA = a
                let url = this.GLOBAL+'/code?randomStr='+this.timeA
                this.$http.get(url).then(res => {
                    this.codeImg = this.GLOBAL+'/code?randomStr='+this.timeA
                })
            },
        },
        created() {
            this.getCode()
        }
    }

</script>
<style>
    .el-checkbox__input.is-checked+.el-checkbox__label{
        vertical-align: top;
        width: 85%;
    }
    .el-checkbox__label {
        display: inline-block;
        padding-left: 10px;
        line-height: 19px;
        font-size: 14px;
        vertical-align: top;
        width: 85%;
    }
    .login-ad img{
        width: 100%;
        height: 100%;
    }
    .login-box{
        /*box-shadow: 11px 13px 32px #e0e0e0;*/
        /*display: flex;*/
        /*width: 100%;*/
        /*background: #fff;*/
        /*height: auto;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        /*-webkit-box-align: center;*/
    }
</style>
<style lang="scss" scoped>

    .el-checkbox{
        word-wrap:normal;
    }
    .el-button--primary{
        border-radius: 20px;
    }
    .group-c{
        margin: 20px 0 20px;
    }
    .slot{
        color: black;
    }
    a{
        color: #2d8cf0;
        background: transparent;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        transition: color .2s ease;
    }
    .get-code{
        position: absolute;
        right: 0%;
        width: 20%;
    }
    .wjmm{
        text-align: right;
        color: #2d8cf0;
        margin-top: 20px;
        margin-bottom: 40px;
    }
    .wjmm a{
        cursor: pointer;
    }
    .bot-tools{
        margin-top: 80px;
        text-align: center;
        color: #cbd1d8;
    }
    .bot-tools a {
        color: #1f96ee;
        margin-left: 10px;
        background: transparent;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        transition: color .2s ease;
    }
    .login-container {
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        -webkit-box-shadow: 0 0 25px #cac6c6;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .p3{
            width: 278px;
            height: 40px;
            line-height: 40px;
            color: #ffffff;
            text-align: center;
            font-size: 16px;
            border-radius: 6px;
            margin-top: 10px;
            margin-bottom: 20px;
            input{
                float: left;
                vertical-align: top;
                width: 127px;
                height: 100%;
                padding-left: 10px;
            }
        }
        .remember {
            margin: 0px 0px 0px 0px;
        }
    }
</style>
