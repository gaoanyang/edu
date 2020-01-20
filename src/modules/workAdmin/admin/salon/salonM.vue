<template>
    <div class="salonD">
        <Button @click="link">返回</Button>
        <p class="p1">话题管理</p>
        <div class="bt"><span>话题名称：</span><input type="text" v-model="name"/></div>
        <div class="nr">
            <span>话题内容: </span>
            <textarea v-model="content">

            </textarea>
            <div class="d1"><Button @click="modifiy">修改</Button></div>
        </div>
        <Table border :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    import edit from '../common/edit'
    export default {
        components:{edit},
        data () {
            return {
                issue:{},
                issueComment:{},
                content:'',
                id:'',
                token:'',
                phone: 'apple',
                animal: '公告',
                columns1: [
                    {
                        title:'Id',
                        key:'issueCommentId',
                        width:250
                    },
                    {
                        title: '标题',
                        key: 'comment',
                    },
                    {
                        title: '发布时间',
                        key: 'gmtCreate',
                        width:180
                    },
                    {
                        title: '发布人',
                        key: 'fullName',
                        width:80
                    },
                    {
                        title: '操作',
                        key: 'address',
                        width:100,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {

                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                data1: [
                    {
                        issueCommentId:'1',
                        comment: '标题',
                        gmtCreate: '2019.1.31 12:00',
                        fullName: '高杨',
                        address: 'address'
                    },
                ],
            }
        },
        methods:{
            modifiy() {
                this.issue.issueName = this.name
                this.issueComment.comment = this.content
                var data = {
                    "issue":this.issue,
                    "issueComment":this.issueComment
                }
                var url = this.GLOBAL+"/board/issue"
                this.$http.put(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    if(res.data.code == "0") {
                        alert("修改成功")
                        this.$router.go(-1)
                    }
                })
            },
            link() {
                this.$router.push({path:'/admin/salon'})
            },
            clickqd() {

            },
            //根据id查询
            getDatabyId() {
                var url = this.GLOBAL+"/board/issue/"+this.id
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    var issue = res.data.data.issue
                    var issueComment = res.data.data.issueComment
                    this.issueComment = issueComment
                    this.issue = issue
                    this.name = issue.issueName
                    this.content = issueComment.comment
                    this.data1 = res.data.data.comments
                })
            },
        },
        watch: {
            "$route":{
                handler(to){
                    var token = JSON.parse(sessionStorage.getItem("user")).access_token
                    this.token = token
                    if(to.query.id != undefined) {
                        this.id = to.query.id
                    }
                    this.getDatabyId()
                },
                immediate:true
            }
        },
    }
</script>
<style lang="scss" scoped>
    .salonD{
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
         width: 1400px;
        }
    }
</style>
