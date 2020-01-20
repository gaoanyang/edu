<template>
    <div class="tea_article">
        <p class="title">专家文章管理</p>
        <div class="main">
            <Button type="primary" @click="link">新增文章</Button>
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <Nav1
                :total=total
                :currentPage=currentPage
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
            //分页查询
            getData(page,tos) {
                var url = this.GLOBAL+"/board/article/page?page="+page+"&size=8&articleType=0"
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    var data = res.data.data
                    console.log(data)
                    this.total = data.totalPages
                    this.currentPage = data.page
                    this.data1 = res.data.data.data
                    if(tos == 1) {
                        this.$refs.child.childMethod();
                    }
                })
            },
            link() {
                this.$router.push({path:'/admin/add_article'})
            },
            getpage(page) {
                this.currentPage = page
                this.getData(this.currentPage)
            },
        },
        data(){
            return {
                total:1,
                currentPage:1,
                token:'',
                columns1: [
                    {
                        title:'Id',
                        key:'articleId',
                        width:270
                    },
                    {
                        title: '标题',
                        key: 'articleTitle'
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
                        width:250,
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
                                            this.$router.push({path:'/admin/edit_article',query:{id:params.row.articleId}})
                                        }
                                    }
                                }, '修改'),
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
                                                    var url = this.GLOBAL+"/board/article/"+params.row.articleId
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
                                                        var url = this.GLOBAL+"/board/article/"+params.row.articleId
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
        watch: {
            "$route":{
                handler(to){
                    this.token = JSON.parse(sessionStorage.getItem("user")).access_token
                    this.getData(1,1)
                },
                immediate:true
            }
        }
    }
</script>
<style lang="scss">
    .tea_article{
        .ivu-table-wrapper{
            .ivu-table-header{
                th {
                    background: #efefef;
                }
            }
        }

    }
</style>
<style lang="scss" scoped>
    .tea_article{
        text-align: left;
        padding-left: 50px;
        .title{
            font-size: 20px;
        }
        .ivu-btn{
            margin-top: 20px;
            width: 150px;
            height: 40px;
        }
        .main{
            text-align: left;
            .s1{
                margin-left: 200px;
                vertical-align: middle;
                font-size: 17px;
            }
            .ivu-table-wrapper{
                margin-top: 50px;
                width: 1200px;
            }
            .ivu-select{
                /*margin-left: 100px;*/
            }
        }
    }
</style>
