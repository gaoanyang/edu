import Vue from 'vue'
import App from './webAdmin.vue'
import router from './router'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'  // 使用 CSS
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VDistpicker from 'v-distpicker'
Vue.use(iView)
Vue.use(ElementUI)
Vue.component('v-distpicker', VDistpicker)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.GLOBAL = 'http://sm.zgjsfz.com'
// 全局路由守卫，如果不是登录状态，则到登录页面
router.beforeEach((to, from, next) => {
    let user = JSON.parse(sessionStorage.getItem('adminuser'))
    console.log(user)
    if (!user && to.path !== '/login') {
        next({ path: '/login' })
    } else {
        next()
    }

    // if(pd>-1||to.path=="/Main"||(to.path=="/operationLog"&&sessionStorage.getItem('uname') == "admin")){
    //     next()
    // }else if(to.path!='/login'){
    //     next({path:'login'})
    // }
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
