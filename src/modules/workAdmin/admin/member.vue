<template>
  <div class="admin_member">
    <div class="pbutton">
      <Button type="primary" @click="link">新增教师</Button>
<!--      <Button type="primary">导入教师</Button>-->
<!--      <span class="s1">获取教师信息导入模板</span>-->
      <span class="s2">教师查询:</span>
      <Input  search enter-button  @on-search="search"/>
    </div>
      <Table border :columns="columns1" :data="data1"></Table>
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
      search(val) {
        this.name = val
        this.getList(1,1)
      },
      getpage(page) {
        this.currentPage = page
        this.getList(this.currentPage)
      },
      link() {
          this.$router.push({'path':'/admin/addMember'})
      },
      getList(page,tos) {
        sessionStorage.removeItem('leader')
        console.log(sessionStorage.getItem('leader'))
        var url = this.GLOBAL+"/board/user/page?page="+page+"&size=8&keyWord="+this.name
        // var url = this.GLOBAL+"/board/user/page?page="+page+"&size=8"
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
      switchPosition(code) {
        if(code == 0) {
          return '管理员'
        }else if(code == 1) {
          sessionStorage.setItem('leader',1)
          console.log(sessionStorage.getItem('leader'))
          return '领衔人'
        }else if(code == 2) {
          return '引领专家'
        }else if(code == 3) {
          return '名师团队'
        }else if(code == 4) {
          return '成员'
        }
      },
      edu(code) {
        console.log(code)
        if(code == 0) {
          return '博士'
        }else if(code == 1) {
          return '硕士'
        }else if(code == 2) {
          return '本科'
        }else if(code == 3) {
          return '专科'
        }
      }
    },
    data(){
        return {
            name:'',
            currentPage:1,
            totalPages:1,
            token:'',
            columns1: [
                {
                    title:'id',
                    key:'user_id',
                    width:200
                },
                {
                    title: '姓名',
                    key: 'full_name',
                    width:100
                },
                {
                    title: '身份证号',
                    key: 'id_number',
                    width:150
                },
                {
                    title: '手机号',
                    key: 'phone_number'
                },
                {
                    title: '性别',
                    key: 'gender',
                    width:70,
                  render: (h, params) => {
                    return h('div',params.row.gender == 1 ? "男":"女")
                  }
                },
                {
                    title:'任职学校',
                    key:'organization'
                },
                {
                    title: '毕业院校',
                    key: 'graduated_school'
                },
                {
                    title: '最高学历',
                    key: 'highest_education',
                  render: (h, params) => {
                    return h('div',this.edu(params.row.highest_education))
                  }
                },
                {
                    title: '任职职务',
                    key: 'post'
                },
                {
                    title: '职称',
                    key: 'job_title',
                    width:100
                },
                {
                    title: '备注',
                    key: 'remark'
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
                          class:{
                            'show':true,
                            'iscolor':false
                          },
                          style: {
                            marginRight: '10px'
                          },
                          on: {
                            click: () => {
                              this.$router.push({'path':'/admin/editMember',query:{id:params.row.user_id}})
                            }
                          }
                        }, '修改'),
                        h('span',{
                        },this.switchPosition(params.row.position))
                        // h('Button', {
                        //   props: {
                        //     type: 'error',
                        //     size: 'small'
                        //   },
                        //   on: {
                        //     click: () => {
                        //       console.log(h)
                        //     }
                        //   }
                        // }, params.row.createBy),
                        // h('Button', {
                        //   props: {
                        //     type: 'error',
                        //     size: 'small'
                        //   },
                        //   class:{
                        //     'show':true,
                        //     'iscolor':false
                        //   },
                        //   style: {
                        //     marginRight:'10px',
                        //     background:(params.row.address == 1) ? 'white' : 'red',
                        //     border:(params.row.address == 1) ? '1px solid white' : '1px solid red',
                        //     color:(params.row.address == 1) ? 'black' : 'white'
                        //   },
                        //   on: {
                        //     click: () => {
                        //       console.log(h)
                        //     }
                        //   }
                        // }, '领衔人'),
                        // h('Button', {
                        //   props: {
                        //     type: 'error',
                        //     size: 'small'
                        //   },
                        //   style: {
                        //     marginRight:'10px',
                        //     background:(params.row.address == 1) ? 'white' : '#63B8FF',
                        //     border:(params.row.address == 1) ? '1px solid white' : '1px solid #63B8FF',
                        //     color:(params.row.address == 1) ? 'black' : 'white'
                        //   },
                        //   on: {
                        //     click: () => {
                        //
                        //     }
                        //   }
                        // }, '引领专家'),
                        // h('Button', {
                        //   props: {
                        //     type: 'error',
                        //     size: 'small'
                        //   },
                        //   style: {
                        //     marginRight:'10px',
                        //     background:(params.row.address == 1) ? 'white' : '#9ACD32',
                        //     border:(params.row.address == 1) ? '1px solid white' : '1px solid #9ACD32',
                        //     color:(params.row.address == 1) ? 'black' : 'white'
                        //   },
                        //   on: {
                        //     click: () => {
                        //
                        //     }
                        //   }
                        // }, '名师团队')
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
          this.token = JSON.parse(sessionStorage.getItem("user")).access_token
          this.getList(1,1)
        },
        immediate:true
      }
    },
}
</script>
<style lang="scss">
.admin_member{
  .ivu-input-wrapper{
    margin-left: 20px;
    width: 300px;
    .ivu-input-group-append{
        height: 32px;
    }
  }
  .ivu-input-group{
    display: inline-block;
    .ivu-input{
        width: 250px;
    }
  }
}
</style>
<style lang="scss" scoped>
.admin_member{
    text-align: left;
    padding-left: 20px;
    padding-top: 20px;
  .ivu-table-wrapper{
    margin-top: 20px;
  }
  .pbutton{
      .s1{
          color: #008CFA;
          margin-left: 50px;
      }
      .s2{
          margin-left: 200px;
      }
    .ivu-input-wrapper{
      /deep/ .ivu-input-inner-container{
        width: 83%;
      }
    }
    .ivu-btn:nth-child(2) {
          margin-left: 30px;
      }
    .ivu-btn{
      width: 140px;
      height: 40px;
    }
  }
}
</style>
