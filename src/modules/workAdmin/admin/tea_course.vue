<template>
    <div class="tea_course">
        <p class="title">学习资源管理</p>
        <div class="main">
            <div class="main_btn">
                <Button type="primary" @click="link_load">上传课程</Button>
                <Button type="primary" @click="link_cite">引用课程</Button>
            </div>
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
            link_load() {
                this.$router.push({path:'/admin/tea_upcourse'})
            },
            link_cite() {
                this.$router.push({path:'/admin/tea_cicourse'})
            },
            getpage(page) {
                this.currentPage = page
                this.getData(this.currentPage)
            },
            //分页查询
            getData(page,tos) {
                var url = this.GLOBAL+"/board/course/page?page="+page+"&size=8&studioId="+JSON.parse(sessionStorage.getItem("user")).studioId
                // var url = this.GLOBAL+"/board/course/page?page="+page+"&size=8&courseType=0&studioId="+JSON.parse(sessionStorage.getItem("user")).studioId
                console.log(url)
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
            }
        },
        data(){
            return {
                currentPage:1,
                totalPages:1,
                columns1: [
                    {
                        title:'编号',
                        key:'courseId'
                    },
                    {
                        title: '课程名称',
                        key: 'courseName'
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
                        width:200,
                        render: (h, params) => {
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight:'10px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.$router.push({path:'/admin/edit_upcourse',query:{id:params.row.courseId}})
                                //         }
                                //     }
                                // }, '修改'),
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
                                                    var url = this.GLOBAL+"/board/course/"+params.row.courseId
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
                                                        var url = this.GLOBAL+"/board/course/"+params.row.courseId
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
                data1: []
            }
        },
        watch: {
            "$route":{
                handler(to){
                    var user = JSON.parse(sessionStorage.getItem("user"))
                    console.log(user)
                    this.token  = user.access_token
                    this.getData(1,1)
                },
                immediate:true
            }
        },
    }
</script>
<style lang="scss">
    .tea_course{
        padding-left: 50px;
        .title{
            text-align: left;
            font-size: 20px;
        }
        .main{
            margin-top: 20px;
            text-align: left;
            .main_btn{
                .ivu-btn:nth-child(2) {
                    margin-left: 30px;
                }
                .ivu-btn{
                    width: 150px;
                    height: 40px;
                }
            }
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
