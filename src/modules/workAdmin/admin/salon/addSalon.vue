<template>
    <div class="addSalon">
        <Button @click="link">返回</Button>
        <p class="p1">新增话题</p>
        <div class="bt"><span>话题名称：</span><input type="text" v-model="name"/></div>
        <div class="nr">
            <span>话题内容: </span>
            <textarea v-model="content">

            </textarea>
            <div class="d1"><Button @click="clickqd">新增</Button></div>
        </div>
    </div>
</template>
<script>
    import edit from '../common/edit'
    export default {
        components:{edit},
        data () {
            return {
                name:'',
                content:''
            }
        },
        methods:{
            link() {
                this.$router.push({path:'/admin/salon'})
            },
            clickqd() {
                var user = JSON.parse(sessionStorage.getItem("user"))
                console.log(user)
                var token = user.access_token
                var studioId = user.studioId
                var data = {
                    "issue": {
                        "issueName": this.name,
                        "studioId": studioId
                    },
                    "issueComment": {
                        "comment": this.content
                    }
                }
                console.log(JSON.stringify(data))
                var url = this.GLOBAL+"/board/issue"
                this.$http.post(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then(res => {
                        if(res.data.code == 0){
                            alert("新增成功")
                            this.$router.go(-1)
                        }
                    })
            },
            getData(val) {
                console.log('---'+val)
            }
        },
    }
</script>
<style lang="scss" scoped>
    .addSalon{
        padding-left: 50px;
        text-align: left;
        .ivu-btn{
            width: 120px;
            height: 50px;
        }
        .p1{
            font-size: 20px;
            margin-top: 20px;
        }
        .bt{
            font-size: 16px;
            margin-top: 20px;
        }
        .ty{
            font-size: 16px;
            margin-top: 20px;
            .ivu-radio-group{
                margin-left: 10px;
            }
        }
        .nr{
            font-size: 16px;
            margin-top: 20px;
            textarea{
                width: 600px;
                height: 140px;
                vertical-align: top;
            }
            .d1{
                padding-top: 50px;
                padding-left: 319px;
            }
        }
        .ivu-table-wrapper{
            margin-top: 50px;
            width: 800px;
        }
    }
</style>
