<template>
    <div class="plazaAch_article">
        <div class="ar_title">
            <span class="s1">工作室首页</span>
            <span class="jt">&gt;</span>
            <span class="s2">成果分享</span>
            <span class="jt">&gt;</span>
            <span class="s2">成员文章</span>
        </div>
        <div class="ar_content">
            <left_nav
                    :title=title
                    :mainList=mainList
            >
            </left_nav>
            <div class="ar_nr">
                <div class="zjwz">
                    <span class="zjwzline">成员文章</span>
<!--                    <Button type="warning" @click="modal1 = true">发布文章</Button>-->
                    <Button type="warning" @click=changeModal>发布文章</Button>
                    <Modal
                        class-name="articleModal"
                        v-model="modal1"
                        title="发布新文章"
                        width="800"
                    >
                        <span class="mname">文章名称: </span>
                        <Input v-model="articleTitle"  clearable style="width: 200px" />
                        <edit @reloadData="getData"></edit>
                        <div slot="footer">
                            <Button type="text" size="large" @click="modalCancel">取消</Button>
                            <Button type="primary" size="large" @click="modalOk">确定</Button>
                        </div>
                    </Modal>
                </div>
                <workArticleList
                        :res="res"
                        :data="data"
                        :url="url"
                ></workArticleList>
                <Nav1
                        :total="totalPages"
                        :currentPage="currentPage"
                        :pageSize='1'
                        @sendPage="getpage"
                        ref="child"
                ></Nav1>
            </div>
        </div>
    </div>
</template>
<script>
    import left_nav from '../../../pages/common/left_nav'
    import workArticleList from '@/components/workArticleList'
    import Nav1 from '@/components/pageNav'
    import edit from '../common/edit'
    export default {
        components:{left_nav,workArticleList,Nav1,edit},
        data() {
            return {
                login:false,
                totalPages:1,
                currentPage:1,
                articleTitle:'',
                modal1: false,
                title:'成果分享',
                mainList:[
                    {name:'成员文章',sign:'/pach_article'},
                    {name:'成员资源',sign:'/pach_resource'}
                ],
                res:false,
                nowIndex:0,
                data:[],
                newsContent:'',
                url:'/ac_articleD'
            }
        },
        methods:{
            changeModal() {

                if(this.login == true) {
                    this.modal1 = true
                }else{
                    alert('请登录')
                }
            },
            getpage(val) {

            },
            getData(val) {
                this.newsContent = val
                console.log('---'+val)
            },
            modalCancel() {
                this.modal1 = false
            },
            modalOk() {
                var user = JSON.parse(sessionStorage.getItem("user"))
                var token = user.access_token
                var studioId = user.studioId
                var data = {
                    "articleTitle":this.articleTitle,
                    "articleType":1,
                    "articleContent":this.newsContent,
                    "studioId":studioId,
                }
                var url = this.GLOBAL.baseURL+"/board/article"
                console.log(data)
                this.$http.post(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(res => {
                    if(res.data.code == 0) {
                        this.$Message.success('新增成功');
                        this.modal1 = false
                    }
                    console.log(res)
                })
            },
            //查询文章
            getArticleList(page) {
                var url =  this.GLOBAL.baseURL + "/portal/article/page?page=1&size=10&articleType=1&studioId="+sessionStorage.getItem('studioId')
                this.$http.get(url).then(res => {
                    this.data = res.data.data.data
                    console.log('----------------------------------------')
                    console.log(this.data)
                });
            },
        },
        created() {
            this.$emit('getMsg',false)
            if(sessionStorage.getItem("user")) {
                var token = JSON.parse(sessionStorage.getItem("user")).access_token
            }
            if(token) {
                this.login = true
            }else{
                this.login = false
            }
            this.getArticleList()
        }
    }
</script>
<style lang="scss">
    .articleModal{
        .ivu-modal-content{
            .mname{
                font-size: 16px;
            }
            #wangeditor{
                margin-top: 20px;
            }
        }
    }
    .plazaAch_article{
        padding-bottom: 13px;
        .ar_nr{
            position: relative;
            .myUi1{
                width: 838px;
                margin-top: 18px;
                margin: auto;
                li{
                    margin-top: 24px;
                }

            }
        }
    }
</style>
<style scoped lang="scss">
    .plazaAch_article{
        background: #EAF6FE;
        .ar_title{
            width: 1200px;
            height: 56px;
            line-height: 56px;
            font-size: 14px;
            margin: auto;
            text-align: left;
            .s1{
                color: #444444;
            }
            .s2{
                color: #888888;
            }
            .jt{
                color: #888888;
                margin-left: 5px;
                margin-right: 5px;
            }
        }
        .ar_content{
            width: 1200px;
            margin: auto;
            height: 720px;
            .ar_nr{
                margin-left:14px;
                display: inline-block;
                width: 886px;
                height: 720px;
                background: #ffffff;
                text-align: left;
                .zjwz{
                    font-size:18px;
                    height: 60px;
                    font-weight:400;
                    color:rgba(34,34,34,1);
                    padding-top: 30px;
                    border-bottom: 1px solid #EAEAEA;
                    width: 838px;
                    margin: auto;
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
        }
    }
</style>
