import Vue from 'vue'
import App from './index.vue'
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
Vue.config.productionTip = false
import globalV from '../../common/com.js'
Vue.prototype.GLOBAL = globalV
// const whiteList = ["/login", "/loginpassword","/center_index"];
// 全局路由守卫，如果不是登录状态，则到登录页面
// router.beforeEach((to, from, next) => {
//         if (to.path === "/index" || 1<2) {
//             next('/center_index');
//         } else {
//             next("/center_index");
//         }
// });
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

