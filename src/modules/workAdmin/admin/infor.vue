<template>
    <div class="admin_infor">
        <p class="title">资讯管理</p>
        <div class="main">
            <Button type="primary" @click="link">新增资讯</Button>
            <span class="s1">筛选： </span>
            <Select v-model="model1" style="width:200px" @on-change="typeChange">
                <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                >{{ item.label }}</Option>
            </Select>
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
            //分页查询   0为公告 1为资讯   type公告或资讯  val当前请求页
            getData(page,type,tos) {
                if(type == undefined) {
                    type = ""
                }
                var url = this.GLOBAL+"/board/news/page?page="+page+"&size=10&newsType="+type+"&kind=1"
                console.log(url)
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    console.log(res)
                    var data = res.data.data
                    this.total = data.totalPages
                    this.currentPage = data.page
                    this.data1 = res.data.data.data
                    if(tos == 1) {
                        this.$refs.child.childMethod();
                    }
                })
            },
            getpage(page) {
                this.currentPage = page
                this.getData(page,this.newsType)
            },
            link() {
                this.$router.push({path:'/admin/add_info'})
            },
            typeChange(val) {
                this.newsType = val
                this.getData(1,this.newsType,1)
            }
        },
        data(){
            return {
                newsType:'',
                total:1,
                currentPage:1,
                token:'',
                model1:'',
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
                        title: '类型',
                        key: 'type',
                        render:(h,params) => {
                            return h('div',params.row.newsType=='0'? '公告':'资讯')
                        }
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
                                            this.$router.push({path:'/admin/edit_info',query:{id:params.row.newsId}})
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
                                                        console.log(res)
                                                        this.getData(1,this.newsType,1)
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
                                                        var url = this.GLOBAL+"/board/news/"+params.row.newsId
                                                        this.$http.put(url,formData,{
                                                            headers:{
                                                                'Authorization': 'Bearer ' + this.token
                                                            }
                                                        }).then(res => {
                                                            console.log(res)
                                                            this.getData(this.currentPage,this.newsType)
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
                        value:"",
                    },
                    {label:'公告',
                        value:"0",
                    },
                    {label:'资讯',
                        value:"1",
                    },
                ]
            }
        },
        watch: {
            "$route":{
                handler(to){
                    console.log(JSON.parse(sessionStorage.getItem("user")))
                    this.token = JSON.parse(sessionStorage.getItem("user")).access_token
                    this.getData(1,this.newsType,1)
                },
                immediate:true
            }
        },
    }
</script>
<style lang="scss">
.admin_infor{
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
    .admin_infor{
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
