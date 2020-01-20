<template>
    <div class="salon">
        <p class="title">话题管理</p>
        <Button type="primary" @click="link">新增话题</Button>
        <div class="main">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <Nav1
                :total="totalPages"
                :currentPage="currentPage"
                :pageSize='1'
                @sendPage="getpage"
                ref="child"
        ></Nav1>
    </div>
</template>
<script>
    import Nav1 from '@/components/pageNav'
    export default {
        components:{Nav1},
        methods:{
            getpage(page) {
                this.currentPage = page
                this.getData(this.currentPage)
            },
            link() {
                this.$router.push({path:'/admin/addSalon'})
            },
            getData(page,tos) {
                console.log(this.token)
                var url = this.GLOBAL+"/board/issue/page?page="+page+"&size=10"
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    console.log(res)
                    this.totalPages = res.data.data.totalPages
                    this.currentPage = res.data.data.page
                    this.data1 = res.data.data.data
                    if(tos == 1) {
                        this.$refs.child.childMethod();
                    }
                }).catch(error=>{

                });
            },
        },
    data(){
        return {
            currentPage:1,
            totalPages:1,
            token:'',
            columns1: [
                {
                    title:'编号',
                    key:'issueId'
                },
                {
                    title: '话题名称',
                    key: 'issueName',

                },
                {
                    title: '发布时间',
                    key: 'gmtCreate'
                },
                {
                    title: '发布人',
                    key: 'fullName'
                },
                {
                    title: '操作',
                    key: 'address',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '50px'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({'path':'/admin/salonM',query:{id:params.row.issueId}})
                                    }
                                }
                            }, '管理'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.$Modal.confirm({
                                            title: '删除！',
                                            content: '<p>您是否确定删除此条内容</p>',
                                            onOk: () => {
                                                var url = this.GLOBAL+"/board/issue/"+params.row.issueId
                                                this.$http.delete(url,{
                                                    headers:{
                                                        'Authorization': 'Bearer ' + this.token
                                                    }
                                                }).then(res => {
                                                    console.log(res)
                                                    this.getData(1,1)
                                                })
                                            },
                                            onCancel: () => {
                                            }
                                        })
                                    }
                                }
                            }, '删除'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft: '10px'
                                },
                                on: {
                                    click: () => {
                                        if(params.row.status == 0) {
                                            this.$Modal.confirm({
                                                title: '你是否确认审批通过该报道！',
                                                content: '<p>通过后项目状态变更为“已审批”，网页上将会出现该报道的详情查看。</p>',
                                                onOk: () => {
                                                    var formData = new FormData();
                                                    formData.append("status", "1");
                                                    var url = this.GLOBAL+"/board/issue/"+params.row.issueId
                                                    this.$http.put(url,formData,{
                                                        headers:{
                                                            'Authorization': 'Bearer ' + this.token
                                                        }
                                                    }).then(res => {
                                                        console.log(res)
                                                        this.getData(this.currentPage)
                                                    })
                                                },
                                                onCancel: () => {
                                                }
                                            })
                                        }
                                    }
                                }
                            }, params.row.status == 0?' 待审批':'已审批')
                        ])
                    }
                }
            ],
            data1: [],
            cityList:[
                {label:'全部',
                    value:"全部",
                },
                {label:'公告',
                    value:"公告",
                },
                {label:'资讯',
                    value:"资讯",
                },
            ]
        }
    },
    watch: {
        "$route":{
            handler(to){
                var user = JSON.parse(sessionStorage.getItem("user"))
                this.token  = user.access_token
                this.getData(1,1)
            },
            immediate:true
        }
    }
}
</script>
<style lang="scss">
    .share_article{
        .ivu-table-wrapper{
            .ivu-table{
                th{
                    height: 40px;
                    white-space: nowrap;
                    overflow: hidden;
                    background-color: #efefef;
                    text-align: center;
                }
                .ivu-table-body{
                    .ivu-table-row{
                        td{
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
    .salon{
        padding-left: 50px;
        .title{
            text-align: left;
            font-size: 20px;
        }
        .ivu-btn{
            float: left;
        }
        .main{
            text-align: left;
            .ivu-table-wrapper{
                margin-top: 50px;
                width: 1200px;
            }
            .ivu-select{
                margin-left: 100px;
            }
        }
    }
</style>
