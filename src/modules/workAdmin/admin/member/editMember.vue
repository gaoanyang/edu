<template>
    <div class="editWork">
        <div class="uploding">
            <upload :uploadType="`head`" :imgWidth="`180px`" :imgHeight="`165px`" :imgUrl="imgUrl" :message="message"
                    @upload="getImgUrl"></upload>
            <span class="s1">上传电子照片</span>
        </div>

        <Button @click="link">返回</Button>
        <div class="title">修改教师</div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="姓名" prop="name">
                <Input v-model="formValidate.name"></Input>
            </FormItem>
            <FormItem label="用户名" prop="username">
                <Input v-model="formValidate.username"></Input>
                <span>用户名不能重复</span>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="formValidate.password"></Input>
            </FormItem>
            <FormItem label="身份证号" prop="hostId">
                <Input v-model="formValidate.hostId"></Input>
            </FormItem>
            <FormItem label="手机号" prop="pNumber">
                <Input v-model="formValidate.pNumber"></Input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
                <Input v-model="formValidate.email"></Input>
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
<!--                    <Option value="4">中专/高中</Option>-->
<!--                    <Option value="5">初中</Option>-->
<!--                    <Option value="6">小学</Option>-->
<!--                    <Option value="7">其他</Option>-->
                </Select>
            </FormItem>
            <FormItem label="岗位" prop="duty">
                <Select v-model="formValidate.duty">
                    <Option value="1">领衔人</Option>
                    <Option value="2">引领专家</Option>
                    <Option value="3">名师团队成员</Option>
                    <Option value="4">成员</Option>
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
            <FormItem label="称谓" prop="label">
                <Input v-model="formValidate.label" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="个人简介" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
            </FormItem>
            <FormItem label="备注" prop="mark">
                <Input v-model="formValidate.mark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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
                token:'',
                id:'',
                imgUrl:'',
                message:"确认上传",
                formValidate: {
                    label:'',
                    pNumber:'',
                    hostId:'',
                    username:'',
                    password:'',
                    email:'',
                    office:'',
                    graduation:'',
                    edu:'',
                    takeoff:'',
                    rank:'',
                    mark:'',
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: '',
                    duty: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: false, message: '密码不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            getImgUrl(data) {
                this.imgUrl = data
                console.log(this.imgUrl)
            },

            //根据Id查询
            getDataByid() {
                var url = this.GLOBAL + "/board/studio/user/"+this.id
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    console.log(res)
                    var data = res.data.data.user
                    var studiodata = res.data.data.studioUser
                    this.studioUserId = studiodata.studioUserId
                    this.formValidate.duty = String(studiodata.position)
                    this.formValidate.username = data.username  //用户名
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
                    this.formValidate.label = data.label
                    this.imgUrl = data.avatar
                    console.log(this.imgUrl)
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
                        console.log(sessionStorage.getItem('leader'))
                        if(sessionStorage.getItem('leader')&&this.formValidate.duty == "1") {
                            alert('一个工作室只能有唯一的领衔人')
                            return
                        }
                        var user = JSON.parse(sessionStorage.getItem("user"))
                        this.$Message.success('Success!');
                        var data = {
                            "user":{
                                "userId":this.id,
                                "username":this.formValidate.username,
                                "password":Utils.encrypt(this.formValidate.password,'wuhanzhilijiaoyu'),
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
                                "label":this.formValidate.label,
                            },
                            "studioUser":{
                                "studioUserId":this.studioUserId,
                                "studioId":user.studioId,
                                "userId":this.id,
                                "position":Number(this.formValidate.duty),
                                "sort":1
                            }
                        }
                        if(this.formValidate.password == '') {
                            data.user.password = undefined
                        }
                        console.log(data)
                        var url = this.GLOBAL+"/board/studio/user/update/"
                        this.$http.put(url, data,{
                            headers:{
                                'Authorization': 'Bearer ' + user.access_token
                            }
                        }).then(res => {
                                if(res.data.code == "0"){
                                    alert("提交成功")
                                    this.$router.go(-1)
                                }else{
                                    alert("提交失败")
                                }
                            })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            link() {
                this.$router.push({'path':'/admin/member'})
            }
        },
        watch: {
            "$route":{
                handler(to){
                    var user = JSON.parse(sessionStorage.getItem("user"))
                    this.token  = user.access_token
                    this.formValidate.password = ''
                    if(to.query.id != undefined) {
                        this.id = to.query.id
                        this.getDataByid()
                    }
                },
                immediate:true
            }
        },
        mounted() {

        }
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
