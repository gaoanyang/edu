<template>
    <div class="administrator">
        <p class="title">管理员设置</p>
        <Button type="primary" @click="link">新增管理员</Button>
<!--        <Select v-model="model1" style="width:200px">-->
<!--            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
<!--        </Select>-->
        <Table border :columns="columns1" :data="data1"></Table>
        <div class="navOuter">
            <Nav1
                    :total=total
                    :currentPage=currentPage
                    :pageSize='1'
                    @sendPage="getpage"
                    ref="child"
            ></Nav1>
        </div>
    </div>
</template>
<script>
import Nav1 from '@/components/pageNav'
export default {
    components:{
        Nav1
    },
    methods:{
        getpage(val) {
            console.log(sessionStorage.getItem("adminuser"))
            this.getList(val)
        },
        link() {
            if(this.username == 'admin') {
                this.$router.push({path:'/addAdmin'})
            }else{
                alert('无此权限')
            }
        },
        getList(page,tos) {
            var url = this.GLOBAL+"/board/user/admin/page?page="+page+"&size=8"
            this.$http.get(url,{
                headers:{
                    'Authorization': 'Bearer ' + this.token
                }
            }).then(res => {
                console.log(res)
                var data = res.data.data.data
                this.total = res.data.data.totalPages
                this.currentPage = res.data.data.page
                this.data1 = data
                if(tos == 1) {
                    this.$refs.child.childMethod();
                }
            }).catch(error=>{

            });
        }
    },
    watch: {
        "$route":{
            handler(to){
                var user = JSON.parse(sessionStorage.getItem("adminuser"))
                console.log(user)
                this.token = user.access_token
                this.username = user.username
                this.getList(1,1)
            },
            immediate:true
        }
    },
    data() {
        return {
            username:'',
            total:1,
            currentPage:1,
            model1:'',
            columns1: [
                {
                    title:'编号',
                    key:'userId'
                },
                {
                    title: '账号名',
                    key: 'username'
                },
                {
                    title: '添加时间',
                    key: 'gmtCreate'
                },
                {
                    title: '权限类型',
                    key: 'type',
                    render:(h,params) => {
                        return h('div',params.row.type=='0'? '网站管理员':'管理员')
                    }
                },
                {
                    title: '备注',
                    key: 'label'
                },
                {
                    title: '当前状态',
                    key: 'state',
                    render:(h,params) => {
                        return h('div',params.row.status=='0'? '禁用':'启动')
                    }
                },
                {
                    title: '操作',
                    key: 'handle',
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
                                        console.log(params.row.userId)
                                        this.$router.push({path:'/editAdmin',query:{id:params.row.userId}})
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
                                        this.token = JSON.parse(sessionStorage.getItem("adminuser")).access_token
                                        var formData = new FormData();
                                        formData.append("status", "1");
                                        var url = this.GLOBAL+"/board/user/"+params.row.userId
                                        this.$http.put(url, formData, {
                                            headers:{
                                                'Authorization': 'Bearer ' + this.token
                                            }
                                        }).then(res => {
                                            console.log(res)

                                        })
                                    }
                                }
                            }, params.row.type=='0'? '启用':'停用')
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
                    label:'正常',
                    value:"正常",
                },
                {
                    label:'已停用',
                    value:"已停用",
                },
            ]
        }
    }
}
</script>
<style lang="scss">
.administrator{
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
.administrator{
    text-align: left;
    padding: 30px;
    .navOuter{
        position: absolute;
        width: 1200px;
        height: 100px;
        margin-top: 50px;
    }
  .title{
    font-size: 20px;
  }
  .ivu-btn{
    margin-top: 20px;
    width: 150px;
    height: 40px;
  }
  .ivu-select{
      margin-left: 200px;
      vertical-align: top;
      margin-top: 20px;
  }
  .ivu-table-wrapper{
      width: 1200px;
      margin-top: 20px;
  }
}
</style>
