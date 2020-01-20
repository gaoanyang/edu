<template>
    <div class="plazaAch_article">
        <div class="ar_title">
            <span class="s1">工作室首页</span>
            <span class="jt">&gt;</span>
            <span class="s2">成果分享</span>
            <span class="jt">&gt;</span>
            <span class="s2">成员资源</span>
        </div>
        <div class="ar_content">
            <left_nav
                    :title=title
                    :mainList=mainList
                    :nowIndex="nowIndex"
            >
            </left_nav>
            <div class="ar_nr">
                <div class="zjwz">
                    <span class="zjwzline">成员资源</span>
                    <Button type="warning" @click="modal1 = true">上传资源</Button>
                </div>
                <articleList
                        :res="res"
                        :data="data"
                ></articleList>
                <Nav1
                        :total='1'
                        :currentPage='1'
                        :pageSize='1'
                ></Nav1>
            </div>
        </div>
        <!-- 弹出层 -->
        <Modal
                class-name="resourceModal"
                v-model="modal1"
                title="发布新话题"
                width="800"
        >
            <div style="margin-bottom: 20px;display: inline-block;">
                <span class="rName">资源名称: </span>
                <Input v-model="resourceName" clearable style="width: 200px" />
            </div>
            <div class="uploadAll">
                <div class="upload1">
                    浏览
                </div>
                <upload @uploadName="getName" @upload="getDosUrl" @uploadloading="getupload">></upload>
            </div>
            <div class="dww" style="display: none">
                <div class="downloading">正在上传中，请耐心等待</div>
                <div class="round-loading-wrap">
                    <div class="round-loading"></div>
                    <div class="round-loading round-loading-1"></div>
                </div>
            </div>
            <div slot="footer">
                <Button type="text"size="large" @click="modalCancel">取消</Button>
                <Button type="primary"size="large" @click="modalOk">确定</Button>
            </div>
        </Modal>
        <!-- -->
    </div>
</template>
<script>
    import left_nav from '../../../pages/common/left_nav'
    import upload from '@/components/uploadDos'
    import articleList from '@/components/resList'
    import Nav1 from '@/components/pageNav'
    export default {
        components:{left_nav,articleList,Nav1,upload},
        data() {
            return {
                resourceName:'',
                modal1:false,
                title:'成果分享',
                mainList:[
                    {name:'成员文章',sign:'/pach_article'},
                    {name:'成员资源',sign:'/pach_resource'}
                ],
                res:true,
                nowIndex:1,
                data:[],
                dosUrl:''
            }
        },
        methods:{
            getupload(val) {
                var dww = document.getElementsByClassName('dww')[0]
                if(val == 0) {
                    if(dww.style.display=="none")
                    {
                        dww.style.display = "block";
                    }
                }else{
                    if(dww.style.display=="block")
                    {
                        dww.style.display = "none";
                    }
                }
            },
            getDosUrl(data) {
                this.dosUrl = data
            },
            refer() {
                if(this.dosUrl == "") {
                    return
                }
                var user = JSON.parse(sessionStorage.getItem("user"))
                var data = {
                    "resourceName": this.resourceName,
                    "resourceUrl": this.dosUrl,
                    "resourceType": 1,
                    "studioId": user.studioId
                }
                var url = this.GLOBAL.baseURL+"/board/resource"
                console.log(data)
                this.$http.post(url, data,{
                    headers:{
                        'Authorization': 'Bearer ' + user.access_token
                    }
                })
                .then(res => {
                    console.log(res)
                    if(res.data.code == 0){
                        this.$Message.success('新增成功等待审核');
                        this.modal1 = false
                    }
                })
            },
            getName(data) {
                this.resourceName = data
            },
            modalCancel() {
                this.modal1 = false
            },
            modalOk() {
                this.refer()
            },
            getResourceList(page) {
                var url = this.GLOBAL.baseURL + "/portal/resource/page?page=1&size=10&studioId=" + sessionStorage.getItem('studioId') + "&resourceType=1"
                this.$http.get(url).then(res => {
                    this.data = res.data.data.content
                    console.log('--------------')
                    console.log(res)
                    console.log(this.data)
                });
            },
        },
        created() {
            this.getResourceList()
        }
    }
</script>
<style lang="scss">
    .resourceModal{
        .ivu-modal-body{
            .uploadAll{
                display: inline-block;
                position: relative;
                .upload1{
                    width: 80px;
                    height: 34px;
                    line-height: 34px;
                    text-align: center;
                    border: 1px solid;
                    margin-top: 20px;
                    margin-left: 20px;
                }
                .input-file{
                    position: absolute;
                    top: 20px;
                    width: 80px;
                    height: 34px;
                    margin-left: 20px;
                    opacity: 0;
                    cursor: pointer;
                }
            }
            .rName{
                font-size: 16px;
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
    @keyframes roundAni {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .dww{
        margin-top: 20px;
    }
    .downloading{
        vertical-align: middle;
        display: inline-block;
    }
    .round-loading-wrap {
        vertical-align: middle;
        position: relative;
        width: 25px;
        height: 25px;
        animation: roundAni 1s linear infinite;
        display: inline-block;
        left: 11px;
    }

    .round-loading {
        position: absolute;
        z-index: 2;
        border-radius: 100%;
        width: 25px;
        height: 25px;
        background-color: transparent;
        border: 2px solid #0378f4;
        border-bottom-color: transparent;
        border-left-color: transparent;
        box-sizing: border-box;
    }
    .round-loading-1 {
        transform: rotate(140deg);
    }
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
