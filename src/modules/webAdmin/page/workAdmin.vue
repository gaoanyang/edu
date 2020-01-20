<template>
    <div class="workAdmin">
        <p class="title">工作室管理</p>
        <div class="main">
            <Button type="primary" @click="link">新增工作室</Button>
<!--            <Select v-model="model1" style="width:200px" @on-change="screeninfo">-->
<!--                <Option v-for="item in screen" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
<!--            </Select>-->
            <Table size="large" border :columns="columns1" :data="data1" width="1242"></Table>
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
        components:{
          Nav1
        },
        data(){
            return {
                token:'',
                data:[],
                total:1,
                currentPage:1,
                screen: [
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '校园长，书记学习共同体',
                        label: '校园长，书记学习共同体'
                    },
                    {
                        value: '名师工作室',
                        label: '名师工作室'
                    },
                    {
                        value: '名班主任(德育导师)工作室',
                        label: '名班主任(德育导师)工作室'
                    }
                ],
                model1:'',
                data:[],
                columns1: [
                    {
                        title:'Id',
                        key:'studioId',
                        width:200
                    },
                    {
                        title: '工作室名称',
                        key: 'studioName',
                        width:150
                    },
                    {
                        title: '管理员',
                        key: 'manager',
                        width:200,
                        render:(h,params) => {
                            return h('div',params.row.admins[0])
                        }
                    },
                    {
                        title: '提交时间',
                        key: 'gmtCreate',
                        width:180
                    },
                    {
                        title: '当前状态',
                        key: 'status',
                        width:100,
                        render:(h,params) => {
                            return h('div',params.row.status=='1'? '开放':'关闭')
                        }
                    },
                    {
                        title: '成员总人数',
                        key: 'memberNumber',
                        width:110
                    },
                    {
                        title: '操作',
                        key:'switch',
                        width:300,
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
                                            console.log(params)
                                            this.$router.push({path:'/alter_work',query:{id:params.row.studioId}})
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
                                                    var url = this.GLOBAL+"/board/studio/"+params.row.studioId
                                                    this.$http.delete(url,{
                                                        headers:{
                                                            'Authorization': 'Bearer ' + this.token
                                                        }
                                                    }).then(res => {
                                                        if(res.data.code == 0) {
                                                            this.getlist(1,1)
                                                        }
                                                        console.log(res)
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
                                        marginLeft: '10px'
                                    },
                                    on: {
                                        click: () => {
                                                this.$router.push({path:'/edit_work',query:{id:params.row.studioId}})
                                        }
                                    }
                                }, '配置管理员'),
                                h('Button', {
                                    props: {
                                        type: 'error',
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
                                                        var url = this.GLOBAL+"/board/studio/"+params.row.studioId
                                                        this.$http.put(url,formData,{
                                                            headers:{
                                                                'Authorization': 'Bearer ' + this.token
                                                            }
                                                        }).then(res => {
                                                            console.log(res)
                                                            this.getlist(this.currentPage,1)
                                                        })
                                                    },
                                                    onCancel: () => {
                                                    }
                                                })
                                            }
                                        }
                                    }
                                }, this.switch(params.row.status))
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
        methods:{
            getpage(val) {
                this.getlist(val)
            },
            getlist(page,tos) {
                var url = this.GLOBAL+"/board/studio/page?page="+page+"&size=8"
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(res => {
                    console.log(res)
                    this.total = res.data.data.totalPages
                    this.currentPage = res.data.data.page
                    var data = res.data.data.data
                    this.data1 = data
                    console.log(this.data1)
                    if(tos == 1) {
                        this.$refs.child.childMethod();
                    }
                }).catch(error=>{

                });
            },
            //筛选
            screeninfo(val) {
            },
            switch(val) {
                if(val == true) {
                    return "开放"
                }else{
                    return "关闭"
                }
            },
            link() {
                this.$router.push({path:'/add_work'})
            }
        },
        watch: {
            "$route":{
                handler(to){
                    this.token = JSON.parse(sessionStorage.getItem("adminuser")).access_token
                    this.getlist(1,1)
                },
                immediate:true
            }
        },
    }
</script>
<style lang="scss">
    .workAdmin{
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
    .workAdmin{
        text-align: left;
        padding-left: 50px;
        .elePage{
            position: relative;
            bottom: 0px;
            top:10px;
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
            width: 1200px;
            text-align: left;
            .ivu-select{
                width: 200px;
                float: right;
                margin-right: 101px;
                padding-top: 50px;
            }
            .s1{
                margin-left: 200px;
                vertical-align: middle;
                font-size: 17px;
            }
            .ivu-table-wrapper{
                margin-top: 50px;
                width: 1300px;
            }
            .ivu-select{
                /*margin-left: 100px;*/
            }
        }
    }
</style>
