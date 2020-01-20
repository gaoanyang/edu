<template>
    <div class="editWork">
        <div class="uploding">
            <upload :uploadType="`head`" :imgWidth="`180px`" :imgHeight="`165px`" :imgUrl="imgUrl" :message="message"
                    @upload="getImgUrl"></upload>
            <span class="s1">上传电子照片</span>
        </div>

        <Button @click="link">返回</Button>
        <div class="title">新增教师</div>
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
                    <Option value="4">中专/高中</Option>
                    <Option value="5">初中</Option>
                    <Option value="6">小学</Option>
                    <Option value="7">其他</Option>
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
<!--            <FormItem label="岗位" prop="duty">-->
<!--                <Select v-model="formValidate.duty" placeholder="岗位">-->
<!--                    <Option value="0">领衔人</Option>-->
<!--                    <Option value="1">引领专家</Option>-->
<!--                    <Option value="2">名师团队</Option>-->
<!--                    <Option value="3">成员</Option>-->
<!--                </Select>-->
<!--            </FormItem>-->
            <FormItem label="称谓" prop="label">
                <Input v-model="formValidate.label" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="个人简介" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </FormItem>
            <FormItem label="备注" prop="mark">
                <Input v-model="formValidate.mark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
    // import upload from '../../common/upload'
    export default {
        components:{
            upload
        },
        data () {
            return {
                imgUrl:'https://gzs-file.oss-cn-beijing.aliyuncs.com/4573b6e0-2537-421b-b630-b72d1179a749.jpg',
                message:"确认上传",
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
                    duty: '4',
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
                }
            }
        },
        methods: {
            getImgUrl(data) {
                this.imgUrl = data
            },
            handleSubmit (name) {
                if(this.imgUrl == '') {
                    alert('请上传头像')
                    return
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(sessionStorage.getItem('leader')&&this.formValidate.duty == "1") {
                            alert('一个工作室只能有唯一的领衔人')
                            return
                        }
                        var user = JSON.parse(sessionStorage.getItem("user"))
                        var data = {
                            "user":{
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
                                "label":this.formValidate.label
                            },
                            "studioUser":{
                                "studioId":user.studioId,
                                "position":Number(this.formValidate.duty),
                                "sort":1
                            }
                        }
                        var url = this.GLOBAL+"/board/studio/user"
                        this.$http.post(url, data,{
                            headers:{
                                'Authorization': 'Bearer ' + user.access_token
                            }
                        })
                            .then(res => {
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
            /*width: 128px;*/
            /*height: 129px;*/
            /*cursor: pointer;*/
            /*position: absolute;*/
            /*right: 0px;*/
            /*margin-right: 425px;*/
            /*text-align: center;*/
            .avatar{
                position: relative;
                top: 0px;
                right: 0px;
            }
            .s1{
                display: inline-block;
                margin-top: 10px;
                font-size: 16px;
                color: #008CFA;
            }
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
