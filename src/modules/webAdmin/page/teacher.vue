<template>
    <div class="teacher">
        <p class="title">名师风采管理</p>
        <div class="main">
            <Button type="primary" @click="link">发布名师风采</Button>
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <Nav1
                :total=total
                :currentPage=currentPage
                :pageSize='1'
                @workapage="getpage"
        ></Nav1>
    </div>
</template>
<script>
    import Nav1 from '@/components/pageNav'
    export default {
        components:{
            Nav1
        },
        watch: {
            "$route":{
                handler(to){
                    this.token = JSON.parse(sessionStorage.getItem("adminuser")).access_token
                    this.getData(1)
                },
                immediate:true
            }
        },
        methods:{
            getpage(val) {
                this.getData(val)
            },
            //分页查询
            getData(page) {
                var url = this.GLOBAL+"/board/news/page?page="+page+"&size=10&newsType=2"+"&kind=0"
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    this.total = res.data.data.totalPages
                    this.currentPage = res.data.data.page
                    this.data1 = res.data.data.data
                })
            },
            link() {
                this.$router.push({path:'/add_tea'})
            }
        },
        data(){
            return {
                total:1,
                currentPage:1,
                token:'',
                columns1: [
                    {
                        title:'Id',
                        key:'newsId'
                    },
                    {
                        title: '标题',
                        key: 'newsTitle'
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
                        width:200,
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
                                            this.$router.push({path:'/edit_tea',query:{id:params.row.newsId}})
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
                                                    var url = this.GLOBAL+"/board/news/"+params.row.newsId
                                                    this.$http.delete(url,{
                                                        headers:{
                                                            'Authorization': 'Bearer ' + this.token
                                                        }
                                                    }).then(res => {
                                                        this.getData(1)
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
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginLeft: '10px',
                                        background:(params.row.status == 0)?'#ed4014':'#2d8cf0',
                                        border:(params.row.status == 0) ? '1px solid #ed4014':'1px solid #2d8cf0'
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
                                                        var url = this.GLOBAL+"/board/news/"+params.row.newsId
                                                        this.$http.put(url,formData,{
                                                            headers:{
                                                                'Authorization': 'Bearer ' + this.token
                                                            }
                                                        }).then(res => {

                                                            this.getData(1)
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
                    {
                        label:'全部',
                        value:"全部",
                    },
                    {
                        label:'公告',
                        value:"公告",
                    },
                    {
                        label:'资讯',
                        value:"资讯",
                    },
                ]
            }
        }
    }
</script>
<style lang="scss">
    .teacher{
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
    .teacher{
        text-align: left;
        padding-left: 50px;
        .elePage{
            position: relative;
            bottom: 0px;
            margin-top: 20px;
        }
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
