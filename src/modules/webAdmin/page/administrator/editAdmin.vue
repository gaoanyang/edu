<template>
    <div class="add_work">
        <Button @click="link">返回</Button>
        <div class="title">修改管理员</div>
        <div class="aname"><span>账号：</span><input type="text" v-model="adminName"/></div>
        <div class="apass"><span>密码：</span><input type="text" v-model="adminpaw"/></div>
        <div class="ades"><span>描述：</span><textarea v-model="admindes"></textarea></div>
        <!--        <div class="duty">-->
        <!--            <span>职务：</span>-->
        <!--            <Select v-model="duty" style="width:200px">-->
        <!--                <Option v-for="item in items" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
        <!--            </Select>-->
        <!--        </div>-->
        <div class="but">
            <Button type="primary" @click="addAdmin">确定上传</Button>
        </div>
    </div>
</template>
<script>
    export default {
        components:{
        },
        watch: {
            "$route":{
                handler(to){
                    var token = JSON.parse(sessionStorage.getItem("adminuser")).access_token
                    this.token = token
                    if(to.query.id != undefined) {
                        this.id = to.query.id
                        this.getDatabyId()
                    }
                },
                immediate:true
            }
        },
        data() {
            return {
                adminName:'',
                adminpaw:'',
                admindes:'',
                token:'',
                items: [
                    {
                        value: '0',
                        label: '超级管理员'
                    },
                    {
                        value: '1',
                        label: '领衔人'
                    },
                    {
                        value: '2',
                        label: '引领专家'
                    },
                    {
                        value: '3',
                        label: '名师团队成员'
                    },
                ],
                duty: '0'
            }
        },
        methods:{
            //根据id查询
            getDatabyId() {
                var url = this.GLOBAL+"/board/user/"+this.id
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    var data = res.data.data.user
                    console.log(data)
                    this.adminName = data.username
                    this.adminpaw = data.password
                    this.admindes = data.label
                })
            },
            //确认修改
            addAdmin() {
                // var token = JSON.parse(sessionStorage.getItem("adminuser")).access_token
                var data = {
                    "username":this.adminName,
                    "password":this.adminpaw,
                    "label":this.admindes,
                    "type":"0",
                    "userId":this.id
                }
                console.log(data)
                var url = this.GLOBAL+"/board/user"
                this.$http.put(url,data,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code == "0"){
                        alert("修改成功")
                    }
                })
            },
            link() {
                this.$router.push({path:'/administrator'})
            },
        },
        mounted() {
        }
    }
</script>
<style lang="scss" scoped>
    .add_work{
        padding-left: 67px;
        text-align: left;
        .distpicker-address-wrapper{
            display: inline-block;
            margin-top: 40px;
        }
        .ivu-btn{
            width: 120px;
            height: 50px;
        }
        .title{
            font-size: 20px;
        }
        .aname{
            font-size: 16px;
            margin-top: 60px;
        }
        .apass{
            font-size: 16px;
            margin-top: 60px;
        }
        .ades{
            font-size: 16px;
            margin-top: 20px;
            textarea{
                vertical-align: top;
                width: 400px;
                height: 100px;
            }
        }
        .duty{
            margin-top: 20px;
            .ivu-select{
                padding-left: 10px;
            }
        }
        .but{
            padding-left: 200px;
            padding-bottom: 50px;
            margin-top: 50px;
            .ivu-btn{
                width: 100px;
                height: 40px;
            }
            .ivu-btn:nth-child(2){
                margin-left: 50px;
            }
        }
        img{
            width: 200px;
            border-style: none;
            height: 150px;
        }

    }
</style>
