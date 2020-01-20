<template>
    <div class="share_res">
        <p class="title">资源管理</p>
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
                this.$router.push({path:'/admin/add_info'})
            },
            //分页查询
            getData(page,tos) {
                var url = this.GLOBAL+"/board/resource/page?page="+page+"&size=8&resourceType=1"
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
                })
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
                        key:'resourceId',
                        width:300
                    },
                    {
                        title: '文件名称',
                        key: 'resourceName',
                    },
                    {
                        title: '上传时间',
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
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            var eleLink = document.createElement('a');
                                            eleLink.download = params.row.resourceUrl;
                                            eleLink.style.display = 'none';
                                            eleLink.href = params.row.resourceUrl;
                                            document.body.appendChild(eleLink);
                                            eleLink.click();
                                            document.body.removeChild(eleLink);
                                        }
                                    }
                                }, '下载'),
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
                                                    var url = this.GLOBAL+"/board/resource/"+params.row.resourceId
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
                                                        var url = this.GLOBAL+"/board/resource/"+params.row.resourceId
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
            }
        },
        mounted() {

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
        },

    }
</script>
<style lang="scss">
    .share_res{
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
    .share_res{
        padding-left: 50px;
        .title{
            text-align: left;
            font-size: 20px;
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
