<template>
    <div class="add_work">
        <Button @click="link">返回</Button>
        <div class="title">新增管理员</div>
        <div class="aname"><span>账号：</span><input type="text" v-model="adminName"/></div>
        <div class="apass"><span>密码：</span><input type="text" v-model="adminpaw"/></div>
        <div class="ades"><span>描述：</span><textarea v-model="admindes"></textarea></div>
        <div class="but">
            <Button type="primary" @click="addAdmin">确定上传</Button>
        </div>
    </div>
</template>
<script>
    export default {
        components:{
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
            //新增
            addAdmin() {
              var token = JSON.parse(sessionStorage.getItem("adminuser")).access_token
              var data = {
                  "username":this.adminName,
                  "password":this.adminpaw,
                  "label":this.admindes,
                  "type":"0"
              }
              console.log(data)
                var url = this.GLOBAL+"/board/user"
                this.$http.post(url,data,{
                    headers:{
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code == "0"){
                        alert("新增成功")
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
