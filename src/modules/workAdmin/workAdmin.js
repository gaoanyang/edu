import Vue from 'vue'
import App from './workAdmin.vue'
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
Vue.prototype.GLOBAL = 'http://sm.zgjsfz.com'
console.log(JSON.parse(sessionStorage.getItem("user")))
var token = JSON.parse(sessionStorage.getItem("user")).access_token
// 全局路由守卫，如果不是登录状态，则到登录页面
// router.beforeEach((to, from, next) => {
//     let user = JSON.parse(sessionStorage.getItem('user'))
//     if (!user && to.path !== '/index/index.html#/plaza_home') {
//         next({ path: '/index/index.html#/plaza_home' })
//     } else {
//         next()
//     }
// })
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
