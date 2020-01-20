<template>
    <div class="editPassword">
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
            <div class="zjwz"><span class="zjwzline">修改密码</span></div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="账号" prop="number" :width="200">
                    <Input v-model="formValidate.number" readonly /><span style="padding-left: 20px;color:red">只能查看不能修改</span>
                </FormItem>
                <FormItem label="原密码" prop="oldPassword" :width="200">
                    <Input v-model="formValidate.oldPassword" />
                </FormItem>
                <FormItem label="新密码" prop="newPassword" :width="200">
                    <Input v-model="formValidate.newPassword" />
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    import Utils from '@/common/util'
    import Left_nav from './common'
    import Nav1 from '@/components/pageNav'
    import articleList from '@/components/articleList'
    export default {
        components:{Left_nav,Nav1,articleList},
        data() {
            return {
                dataZx:'',
                currentPage:1,
                title:'三名工作室',
                mainList:[
                    {name:'修改个人信息',sign:'/edit_info'},
                    {name:'修改密码',sign:'/edit_password'},
                ],
                formValidate:{
                    number:'',
                    oldPassword:'',
                    newPassword:''
                },
                ruleValidate:{
                    number: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    oldPassword: [
                        { required: true, message: '原密码不能为空', trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, message: '新密码不能为空', trigger: 'blur' }
                    ],
                },
                nowIndex:1,
                url:'/b'
            }
        },
        methods:{
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
                    this.formValidate.number = data.username
                    var studiodata = res.data.data.studioUser
                    this.studioUserId = studiodata.studioUserId
                })
            },
            //修改密码
            editPass() {
                var userId = JSON.parse(sessionStorage.getItem("user")).userId
                var url = this.GLOBAL.baseURL + "/board/user/pwd?userId=" + userId + '&pwd_=' + Utils.encrypt(this.formValidate.oldPassword,'wuhanzhilijiaoyu') + '&pwd=' + Utils.encrypt(this.formValidate.newPassword,'wuhanzhilijiaoyu')
                console.log(url)
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("user")).access_token
                    }
                }).then(res => {
                        console.log(res)
                        if(res.data.code == 0){
                            alert("修改成功")
                        }
                    })
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.editPass()
                    }
                })
                }
            },
            created() {
                this.$emit('getMessage', 0);
                this.getAxiosZx(1)
                this.getDataByid()
            }
    }
</script>
<style lang="scss">
    .editPassword{
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
    .editPassword{
        /deep/ .ivu-form-item-content{
            width: 450px;
        }
        /deep/ .ivu-input-wrapper{
            width: 281px;
        }
        .rightMain{
            margin-left:14px;
            display: inline-block;
            width: 886px;
            height: 841px;
            background: #ffffff;
            text-align: left;
            form{
                padding-left: 50px;
                margin-top: 19px;
            }
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
