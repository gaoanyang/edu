<template>
    <div class="editWork">
        <div class="uploding">
<!--            <upload :uploadType="`head`" :imgWidth="`180px`" :imgHeight="`165px`" :imgUrl="imgUrl" :message="message"-->
<!--                    @upload="getImgUrl"></upload>-->
<!--            <span class="s1">上传电子照片</span>-->
        </div>

        <Button @click="link">返回</Button>
        <div class="title">配置管理员</div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="姓名" prop="name">
                <Input v-model="formValidate.name"></Input>
<!--                <span style="color:red">必填项</span>-->
            </FormItem>
            <FormItem label="用户名" prop="username">
                <Input v-model="formValidate.username" :readonly="dis"></Input>
<!--                <span style="color:red">用户名不能重复</span>-->
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="formValidate.password"></Input>
<!--                <span style="color:red">必填项</span>-->
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
<!--                <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>-->
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import Utils from '@/common/util'
    import upload from '../../common/upload'
    export default {
        components:{
            upload
        },
        data () {
            return {
                studioUserId:'',
                edit:true,
                userId:'',
                dis:true,
                imgUrl:'https://gzs-file.oss-cn-beijing.aliyuncs.com/4573b6e0-2537-421b-b630-b72d1179a749.jpg',
                message:"确认上传",
                formValidate: {
                    username:'',
                    password:undefined,
                    email:'',
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: '',
                    duty: '',
                    label:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    hostId: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            //根据Id查询
            getImgUrl(data) {
                this.imgUrl = data
                console.log(this.imgUrl)
            },
            //提交和修改
            handleSubmit (name) {
                if(this.imgUrl == '') {
                    alert('请上传头像')
                    return
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var au = JSON.parse(sessionStorage.getItem("adminuser")).access_token
                        var url = ''
                        if(this.edit) {
                            var pass = ''
                            if(this.formValidate.password == '') {
                                pass = undefined
                            }else{
                                pass = Utils.encrypt(this.formValidate.password,'wuhanzhilijiaoyu')
                            }
                            var data = {
                                "user":{
                                    "username":this.formValidate.username,
                                    "password":pass,
                                    "avatar":this.imgUrl, //头像
                                    "fullName":this.formValidate.name,
                                    "userId":this.userId,
                                },
                                "studioUser":{
                                    "userId":this.userId,
                                    "studioUserId":this.studioUserId,
                                    "studioId":this.$route.query.id,
                                    "position":0,
                                    "sort":1
                                }
                            }
                            console.log(data)
                            url = this.GLOBAL+"/board/studio/user/update"
                            this.editMess(url,data,au)
                        }else{
                            var data = {
                                "user":{
                                    "username":this.formValidate.username,
                                    "password":Utils.encrypt(this.formValidate.password,'wuhanzhilijiaoyu'),
                                    "avatar":this.imgUrl, //头像
                                    "fullName":this.formValidate.name,
                                },
                                "studioUser":{
                                    "studioId":this.$route.query.id,
                                    "position":0,
                                    "sort":1
                                }
                            }
                            console.log(data)
                            url = this.GLOBAL+"/board/studio/user"
                            this.subMessage(url,data,au)
                        }
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            link() {
                this.$router.push({'path':'/workAdmin'})
            },
            //提交
            subMessage(url,data,au) {
                this.$http.post(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + au
                    }
                }).then(res => {
                        if(res.data.code == "0"){
                            alert("提交成功")
                            this.$router.go(-1);
                        }else{
                            alert("提交失败")
                        }
                    })
            },
            //修改
            editMess(url,data,au) {
                this.$http.put(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + au
                    }
                }).then(res => {
                        if(res.data.code == "0"){
                            alert("修改成功")
                            this.$router.go(-1);
                        }else{
                            alert("修改失败")
                        }
                    })
            },
            //根据Id查询人员
            getDataByid() {
                var url = this.GLOBAL+"/board/studio/admin/"+this.$route.query.id
                console.log(url)
                this.$http.get(url, {
                    headers:{
                        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("adminuser")).access_token
                    }
                }).then(res => {
                    console.log(res)
                    var data = res.data.data
                    console.log(data)
                    if(data == null) {
                        this.dis = false
                        this.edit = false
                    }else{
                        this.formValidate.username = data.username
                        this.formValidate.name = data.fullName
                        this.userId = data.userId
                        this.studioUserId = data.studioUserId
                    }
                })
            },
        },
        mounted() {
            console.log(this.$route.query)
            console.log(JSON.parse(sessionStorage.getItem("adminuser")))
        },
        watch: {
            "$route":{
                handler(to){
                    if(to.path == "/edit_work") {
                        this.edit = true
                        this.dis = true
                        this.formValidate.name = ''
                        this.formValidate.username = ''
                        this.formValidate.password = ''
                        this.getDataByid()
                    }
                },
                immediate:true
            }
        },
    }
</script>
<style lang="scss">
    .editWork{
        .ivu-form{
            width: 800px;
            .ivu-form-item-content{
                width: 321px;
                .ivu-input-wrapper{
                    textarea{
                        width: 500px;
                    }
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
    .editWork{
        text-align: left;
        padding: 30px;
        .uploding{
            height: 200px;
            width: 180px;
            cursor: pointer;
            position: absolute;
            right: 0px;
            margin-right: 425px;
            text-align: center;
            .s1{
                display: inline-block;
                margin-top: 10px;
                font-size: 16px;
                color: #008CFA;
            }
        }
        .avatar{

        }
        .title{
            font-size: 20px;
        }
        .ivu-btn{
            width: 120px;
            height: 50px;
        }
    }
</style>
