<template>
    <div class="plaza_salonList">
        <div class="zjwz">
            <span class="zjwzline">话题列表</span>
        </div>
        <div class="salon_search">
          <Button type="warning" @click="modal1 = true">发布新话题</Button>
          <Modal
                class-name="salonModal"
                v-model="modal1"
                title="发布新话题"
                width="800"
          >
              <div style="margin-bottom: 20px">
                  <span class="mname">话题名称: </span>
                  <Input v-model="value1" clearable style="width: 200px" />
              </div>
              <span class="mname">话题内容: </span>
              <Input class="textarea1" v-model="value2" type="textarea" :rows="6" />
              <div slot="footer">
                <Button type="text"size="large" @click="modalCancel">取消</Button>
                <Button type="primary"size="large" @click="modalOk">确定</Button>
              </div>
          </Modal>
          <Input search enter-button="Search" placeholder="请输入关键词搜索" @on-search="search"/>
        </div>
        <div class="tListAll">
            <div class="ulTitle">
              <div class="htTitle">话题标题</div>
              <div class="fb">
                  <span style="margin-right: 82px;">发表人</span>
                  <span style="margin-right: 144px;">发表日期</span>
                  <span style="margin-right: 26px;">讨论数</span></div>
            </div>
            <articleList
                    :data="data"
                    :count="count"
                    :url="url"
            ></articleList>
            <Nav1
                    :total=totalPages
                    :currentPage=currentPage
                    :pageSize='1'
                    @sendPage="getPage"
                    ref="child"
            ></Nav1>
        </div>
    </div>
</template>
<script>
    import Nav1 from '@/components/pageNav'
    import articleList from './articleList'
    import edit from '../../common/edit'
    export default {
        components:{articleList,Nav1,edit},
        data() {
            return {
                totalPages:1,
                currentPage:1,
                value1: '',
                value2: '',
                modal1: false,
                data:[],
                count:true,
                url:'/salonD'
            }
        },
        methods:{
            search(val) {
                this.getAxios(val)
            },
            getPage(val) {

            },
            modalCancel() {
                this.modal1 = false
            },
            modalOk() {
                var user = JSON.parse(sessionStorage.getItem("user"))
                var token = user.access_token
                var studioId = user.studioId
                var data = {
                    "issue": {
                        "issueName": this.value1,
                        "studioId": studioId
                    },
                    "issueComment": {
                        "comment": this.value2
                    }
                }
                var url = this.GLOBAL.baseURL+"/board/issue"
                this.$http.post(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then(res => {
                        if(res.data.code == 0){
                            this.$Message.success('新增成功等待审核');
                            this.modal1 = false
                        }
                    })
            },
            getAxios(val) {
                var url =  this.GLOBAL.baseURL + '/portal/issue/page?page=1&size=6&studioId='+sessionStorage.getItem('studioId') + '&issueName=' + val
                // var url =  this.GLOBAL.baseURL + '/portal/issue/page?page=1&size=10' + '&issueName=' + val
                console.log(url)
                this.$http.get(url).then(res => {
                    console.log(res)
                    this.data = res.data.data.data
                    this.totalPages = res.data.data.totalPages
                    this.currentPage = res.data.data.page
                });
            },
        },
        created() {
            this.getAxios("")
        }
    }
</script>
<style lang="scss">
    .salonModal{
        .ivu-modal-content{
            .mname{
                font-size: 16px;
            }
            .textarea1 {
                margin-top: 10px;
            }
        }
    }
.plaza_salonList{
    position: relative;
    .tListAll{
        margin: auto;
        width: 838px;
        .ulTitle{
            color: #222222;
            display: flex;
            justify-content: space-between;
            line-height: 40px;
            font-size: 14px;
          .htTitle{
              margin-left: 24px;
          }
          div{
              display: inline-block;
          }
        }
        .myUi1{
            li{
                margin-top: 20px;
                .lit{
                    margin-left: 10px;
                }
                .nd{
                  .name{
                      font-size: 14px;
                      color: #008cfa;
                      margin-right: 62px;
                      width: 61px;
                      display: inline-block;
                  }
                  .date{
                      margin-right: 73px;
                  }
                  .count{
                    display: inline-block;
                    width: 64px;
                  }
                }
            }
        }
        .ulTitle{
            width:100%;
            height:40px;
            background:rgba(234,234,234,1);
            margin: auto;
            margin-top: 22px;
        }
    }
    .salon_search{
        display: flex;
        justify-content: space-between;
        width: 838px;
        margin: auto;
        margin-top: 20px;

        .ivu-btn-warning{
            width:100px;
            height:40px;
            font-size: 14px;
        }
        .ivu-input-wrapper{
            display: inline-block;
            width: 360px;
            .ivu-input-inner-container{
                width: 280px;
                .ivu-input{
                    width: 280px;
                    height: 40px;
                    font-size: 14px;
                }
            }
            .ivu-input-search{
                width: 80px;
                height: 40px;
            }
        }
    }
}
</style>
<style scoped lang="scss">
.ivu-modal-content{
    padding: 100px;
}
.plaza_salonList{
    display: inline-block;
    width: 886px;
    height: 720px;
    background: #FFFFFF;
    .salon_search{
        display: flex;
        justify-content: space-between;
        width: 838px;
        margin: auto;
        margin-top: 20px;
      .ivu-btn-warning{
        width:100px;
        height:40px;
        font-size: 14px;
      }
      .ivu-input-wrapper{
          display: inline-block;
          width: 360px;
        .ivu-input{
          width: 280px;
          height: 40px;
          font-size: 14px;
        }
        .ivu-input-search{
          width: 80px;
          height: 40px;
        }
      }
    }
    .zjwz{
        font-size:18px;
        height: 60px;
        font-weight:400;
        color:rgba(34,34,34,1);
        padding-top: 30px;
        border-bottom: 1px solid #EAEAEA;
        width: 838px;
        margin: auto;
        text-align: left;
        .ivu-btn-warning{
            width: 100px;
            height: 40px;
            margin-top: -20px;
            float: right;
        }
        .zjwzline{
            padding-bottom: 7px;
            border-bottom: 2px solid #008CFA;
        }
    }
}
</style>
