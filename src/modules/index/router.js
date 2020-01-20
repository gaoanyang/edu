import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}
//组件模块
import index from './index/common'

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            redirect:'/index',
            name: 'common',
            component: index,
            children: [
                { path: '/index', component: () => import('./index/index'), name: '公共主页', hidden: true },
                { path: '/center_index', component: () => import('./center/index'), name: 'center_index', hidden: true },
                { path: '/plaza_home', component: () => import('./plaza/home'), name: 'plaza_home', hidden: true },
                { path: '/activity_index', component: () => import('./activity/index'), name: 'activity_index', hidden: true },
                { path: '/activity_notice', component: () => import('./activity/notice'), name: 'activity_notice', hidden: true },
                { path: '/teach_index', component: () => import('./teach/index'), name: 'teach_index', hidden: true },
                { path: '/edit_info', component: () => import('./index/person_center/editInfo'), name: 'edit_info', hidden: true },
                { path: '/edit_password', component: () => import('./index/person_center/editPassword'), name: 'edit_info', hidden: true },
                { path: '/a', component: () => import('./activity/indexD'), name: 'activityindexD', hidden: true },
                { path: '/b', component: () => import('./activity/indexD'), name: 'activityindexD', hidden: true },
                { path: '/c', component: () => import('./teach/teachD'), name: 'teachD', hidden: true },
            ]
        },
        {
            path: '/abc',
            name: 'home',
            component: () => import('./activity/index'),
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
