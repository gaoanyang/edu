
<template>
    <div class="main">
        <navigation
            :isManage="isManage"
        >
        </navigation>
        <router-view @getMsg="showMsg"
                     :dataZx="dataZx"
                     :dataGg="dataGg"
                     :visitorData="visitorData"
        ></router-view>
        <Footer></Footer>
    </div>
</template>
<script>
    /* eslint-disable */
    import Footer from '@/components/footer'
    import navigation from './common/plaza_nav'
    /* eslint-disable */
    export default {
        components:{navigation,Footer},
        data() {
            return {
                isManage:false,
                dataZx:[],
                dataGg:[],
                visitorData:[]
            }
        },
        methods:{
            showMsg(val) {
                this.isManage = val
            },
            getAxiosZx() {
                var url =  this.GLOBAL.baseURL + '/portal/news/page?page=1&size=6&newsType=1&kind=1&studioId='+sessionStorage.getItem('studioId')
                this.$http.get(url).then(res => {
                    console.log(res)
                    this.dataZx = res.data.data.data
                });
            },
            getAxiosGg() {
                var url =  this.GLOBAL.baseURL + '/portal/news/page?page=1&size=9&newsType=0&kind=1&studioId='+sessionStorage.getItem('studioId')
                this.$http.get(url).then(res => {
                    console.log(res)
                    this.dataGg = res.data.data.data
                });
            },
            //获取名师团队

            //获取访问记录
            getVisitor() {
                var url =  this.GLOBAL.baseURL + '/board/visitor/'+sessionStorage.getItem('studioId')
                this.$http.get(url,{
                    headers:{
                        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('user')).access_token
                    }
                }).then(res => {
                    console.log('------------11111111111111111111111111---')
                    console.log(res)
                });
            }
        },
        mounted() {
            this.getAxiosZx()
            this.getAxiosGg()
            this.getVisitor()
        }
    }
</script>
<style>
</style>
