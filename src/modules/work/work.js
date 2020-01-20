import Vue from 'vue'
import App from './work.vue'
import router from './router'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'  // 使用 CSS
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import titleLine from '@/components/titleLine'
Vue.component("titleLine",titleLine)
Vue.use(iView)
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.config.productionTip = false
import globalV from '../../common/com.js'
Vue.prototype.GLOBAL = globalV
let studioUrl = window.location.href
if(studioUrl.indexOf('oId=') != '-1'){
    sessionStorage.setItem('studioId', studioUrl.substring(studioUrl.indexOf('=')+1))
}
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
// router.beforeEach((to) => {
//     console.log(to.path)
// });
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
