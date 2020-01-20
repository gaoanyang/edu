<template>
    <div>
        <Header
            :msg="msg"
        ></Header>
        <router-view @getMessage="showMsg"
                    :dataZx="dataZx"
                    :dataGg="dataGg"
                    :dataFc="dataMsfc"
        ></router-view>
        <Footer></Footer>
    </div>
</template>
<script>
    import Header from '../common/header'
    import Footer from '@/components/footer'
    export default {
        components:{Header,Footer},
        data() {
            return {
                msg:'',
                dataZx:[{'newsTitle':'默认标题'}],
                dataGg:[],
                dataMsfc:[]
            }
        },
        methods:{
            showMsg (val) {   // methods方法  val即为子组件传过来的值
                this.msg = val
            },
            getAxiosZx() {
                var url =  this.GLOBAL.baseURL + '/portal/news/page?page=1&size=5&newsType=1&kind=0'
                this.$http.get(url).then(res => {
                    console.log(res)
                    this.dataZx = res.data.data.data
                    for(var i = 0;i < this.dataZx.length;i++) {
                        var y = this.dataZx[i].gmtCreate.split(' ')[0]
                        this.dataZx[i].gmtCreate = y
                    }
                });
            },
            getAxiosGg() {
                var url =  this.GLOBAL.baseURL + '/portal/news/page?page=1&size=8&newsType=0&kind=0'
                this.$http.get(url).then(res => {
                    this.dataGg = res.data.data.data
                });
            },
            getAxiosFc() {
                var url =  this.GLOBAL.baseURL + '/portal/news/page?page=1&size=9&newsType=2&kind=0'
                this.$http.get(url).then(res => {
                    this.dataMsfc = res.data.data.data
                });
            }
        },
        created() {
            this.getAxiosZx()
            this.getAxiosGg()
            this.getAxiosFc()
        }
    }
</script>
<style>
</style>
