<template>
    <div class="editInfo">
        <div class="ar_title">
            <span class="s1">首页</span>
            <span class="jt">&gt;</span>
            <span class="s2">个人中心</span>
        </div>
        <Left_nav
                :title=title
                :mainList=mainList
                :nowIndex="nowIndex"
        >
        </Left_nav>
        <div class="rightMain">
            <div class="zjwz"><span class="zjwzline">修改个人信息</span></div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="姓名" prop="name" :width="200">
                    <Input v-model="formValidate.name" readonly /> <span style="padding-left: 20px;color:red">只能查看不能修改</span>
                </FormItem>
                <FormItem label="身份证号" prop="hostId">
                    <Input v-model="formValidate.hostId"></Input>
                </FormItem>
                <FormItem label="手机号" prop="pNumber">
                    <Input v-model="formValidate.pNumber"></Input>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="1">男</Radio>
                        <Radio label="0">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="任职学校" prop="office">
                    <Input v-model="formValidate.office"></Input>
                </FormItem>
                <FormItem label="毕业院校" prop="graduation">
                    <Input v-model="formValidate.graduation"></Input>
                </FormItem>
                <FormItem label="最高学历" prop="edu" class="xl">
                    <Select v-model="formValidate.edu" :label-width="300">
                        <Option value="0">博士</Option>
                        <Option value="1">硕士</Option>
                        <Option value="2">本科</Option>
                        <Option value="3">专科</Option>
                        <Option value="4">中专/高中</Option>
                        <Option value="5">初中</Option>
                        <Option value="6">小学</Option>
                        <Option value="7">其他</Option>
                    </Select>
                </FormItem>
                <FormItem label="任职职务" prop="takeoff">
                    <Input v-model="formValidate.takeoff"></Input>
                </FormItem>
                <FormItem label="职称" prop="rank">
                    <Select v-model="formValidate.rank">
                        <Option value="0">正高级教师</Option>
                        <Option value="1">高级教师</Option>
                        <Option value="2">一级教师</Option>
                        <Option value="3">二级教师</Option>
                        <Option value="4">三级教师</Option>
                    </Select>
                </FormItem>
                <FormItem label="个人简介" prop="desc">
                    <Input size="large"  class="desc" v-model="formValidate.desc" type="textarea" :maxlength="200" placeholder="请输入个人简介，不超过200字"></Input>
                </FormItem>
                <FormItem label="备注" prop="mark">
                    <Input v-model="formValidate.mark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注，不超过100字"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
            <upload :uploadType="`head`" :imgWidth="`126px`" :imgHeight="`127px`" :imgUrl="imgUrl" :message="message"
                    @upload="getImgUrl"></upload>
        </div>
    </div>
</template>
<script>
    import Left_nav from './common'
    import upload from '@/components/upload'
    export default {
        components:{Left_nav,upload},
        data() {
            return {
                name:'',
                avatar:'',
                imgUrl:'',
                message:"确认上传",
                dataZx:'',
                currentPage:1,
                title:'三名工作室',
                mainList:[
                    {name:'修改个人信息',sign:'/edit_info'},
                    {name:'修改密码',sign:'/edit_password'},
                ],
                nowIndex:0,
                url:'/b',
                formValidate: {
                    username:'',
                    password:'',
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
                    label:'',
                    hostId:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    // username: [
                    //     { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    // ],
                    // password: [
                    //     { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    // ],
                    // hostId: [
                    //     { required: true, message: '身份证号不能为空', trigger: 'blur' },
                    // ],
                    // pNumber: [
                    //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    // ],
                    // email: [
                    //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    // ],
                    // office: [
                    //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    // ],
                    // graduation: [
                    //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    // ],
                    // edu: [
                    //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    // ],
                    // takeoff: [
                    //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    // ],
                    // rank: [
                    //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    // ],
                    // duty: [
                    //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    // ],
                    // mark: [
                    //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    // ],
                    //
                    // gender: [
                    //     { required: true, message: 'Please select gender', trigger: 'change' }
                    // ],
                    // desc: [
                    //     { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                    // ],
                    // label: [
                    //     { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                    // ]
                }
            }
        },
        methods:{
            getImgUrl(data) {
                this.imgUrl = data
            },
            getpage(page) {
                this.currentPage = page
                this.getAxiosZx(this.currentPage)
            },
            getAxiosZx(page) {
                var url =  this.GLOBAL.baseURL + '/portal/news/page?page='+page+'&size=10&newsType=1'
                this.$http.get(url).then(res => {
                    this.dataZx = res.data.data
                });
            },
            //根据Id查询
            getDataByid() {
                var url = this.GLOBAL.baseURL + "/board/studio/user/"+JSON.parse(sessionStorage.getItem("user")).userId
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).access_token
                    }
                }).then(res => {
                    console.log(res)
                    var data = res.data.data.user
                    var studiodata = res.data.data.studioUser
                    this.studioUserId = studiodata.studioUserId
                    this.formValidate.duty = String(studiodata.position)
                    this.formValidate.username = data.username  //用户名
                    this.formValidate.password = data.password
                    this.formValidate.name =  data.fullName  //姓名
                    this.formValidate.hostId = data.idNumber
                    this.formValidate.email = data.emailAddress
                    this.formValidate.pNumber = data.phoneNumber
                    this.formValidate.gender = String(data.gender)
                    this.formValidate.office = data.organization
                    this.formValidate.graduation = data.graduatedSchool
                    this.formValidate.edu = String(data.highestEducation)
                    this.formValidate.takeoff = data.post
                    this.formValidate.rank = data.jobTitle
                    this.formValidate.desc = data.introduction
                    this.formValidate.mark = data.remark
                    this.imgUrl = data.avatar
                })
            },
            //修改
            handleSubmit (name) {
                if(this.imgUrl == '') {
                    alert('请上传头像')
                    return
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var user = JSON.parse(sessionStorage.getItem("user"))
                        this.$Message.success('Success!');
                        var data = {
                            "user":{
                                "userId":JSON.parse(sessionStorage.getItem("user")).userId,
                                "username":this.formValidate.username,
                                "fullName":this.formValidate.name,
                                "idNumber":this.formValidate.hostId,
                                "emailAddress":this.formValidate.email,
                                "phoneNumber":this.formValidate.pNumber,
                                "gender":Number(this.formValidate.gender), //性别
                                "organization":this.formValidate.office,  //任职学校
                                "graduatedSchool":this.formValidate.graduation,  //毕业院校
                                "highestEducation":Number(this.formValidate.edu),  //最高学历
                                "post":this.formValidate.takeoff, //任职职务
                                "jobTitle":this.formValidate.rank,  //职称
                                "introduction":this.formValidate.desc,  //简介
                                "remark":this.formValidate.mark, //备注
                                "avatar":this.imgUrl, //头像
                                "label":'ddddd',
                            },
                            "studioUser":{
                                "studioUserId":this.studioUserId,
                                "studioId":user.studioId,
                                "userId":JSON.parse(sessionStorage.getItem("user")).userId,
                                "position":Number(this.formValidate.duty),
                                "sort":1
                            }
                        }
                        var url = this.GLOBAL.baseURL+"/board/studio/user/update/"
                        console.log(data)
                        this.$http.put(url, data,{
                            headers:{
                                'Authorization': 'Bearer ' + user.access_token
                            }
                        }).then(res => {
                            if(res.data.code == "0"){
                                alert("修改成功")
                                this.$router.push({path:'/index'})
                            }else{
                                alert("提交失败")
                            }
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },

        },
        created() {
            this.$emit('getMessage', 0);
            this.getAxiosZx(1)
            this.getDataByid()
        }
    }
</script>
<style lang="scss">
    .editInfo{
        background: #E7F5FE;
        padding-bottom: 14px;
        .rightMain{
            position: relative;
            .myUi1{
                width: 838px;
                margin-top: 18px;
                margin: auto;
                li{
                    margin-top: 20px;
                }
            }
        }
    }
</style>
<style scoped lang="scss">
    .editInfo{
        /deep/ .ivu-form-item-content{
            width: 450px;
        }
        /deep/ .ivu-input-wrapper{
            width: 281px;
        }
        .desc{
            width: 400px;
            .ivu-input{
                height: 300px !important;
            }
        }
        .rightMain{
            margin-left:14px;
            display: inline-block;
            width: 886px;
            height: 841px;
            background: #ffffff;
            text-align: left;
            .zjwz{
                font-size:18px;
                height: 60px;
                font-weight:400;
                color:rgba(34,34,34,1);
                padding-top: 30px;
                border-bottom: 1px solid #EAEAEA;
                width: 838px;
                margin: auto;
                .zjwzline{
                    padding-bottom: 7px;
                    border-bottom: 2px solid #008CFA;
                }
            }
            form{
                padding-left: 50px;
                margin-top: 19px;
                width: 600px;
                display: inline-block;
            }
        }
        .ar_title{
            width: 1200px;
            height: 56px;
            line-height: 56px;
            font-size: 14px;
            margin: auto;
            text-align: left;
            .s1{
                color: #444444;
            }
            .s2{
                color: #888888;
            }
            .jt{
                color: #888888;
                margin-left: 5px;
                margin-right: 5px;
            }
        }
    }

</style>
