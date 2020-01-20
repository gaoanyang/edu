import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}
//组件模块
import index from './pages/index/common'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/',
          name: 'common',
          component: index,
          children: [
            { path: '/index', component: () => import('./pages/index/index'), name: '公共主页', hidden: true },
            { path: '/center_index', component: () => import('./pages/center/index'), name: 'center_index', hidden: true },
            { path: '/plaza_home', component: () => import('./pages/plaza/home'), name: 'plaza_home', hidden: true },
            { path: '/activity_index', component: () => import('./pages/activity/index'), name: 'activity_index', hidden: true },
            { path: '/teach_index', component: () => import('./pages/teach/index'), name: 'teach_index', hidden: true },
        ]
        },
        {
            path:'/plazaView',
            name: 'plazaView',
            component: () => import('./pages/plaza/view'),
            children: [
                {path:'/activity_consult', component: () => import('./modules/work/activity/activity_consult'), name: '活动资讯'},
                {path:'/plazaHome', component: () => import('./modules/work/home/home'), name: '个人工作室首页'},
                {path:'/pGuide_home', component: () => import('./modules/work/guide/home'), name: '名师引领公共页'},
                {path:'/pg_article',component:() => import('./modules/work/guide/article'),name:'名师引领文章'},
                {path:'/pg_articleD',component:() => import('./modules/work/guide/article_detail'),name:'名师引领文章'},
                {path:'/pg_course',component:() => import('./modules/work/guide/course'),name:'名师引领课程'},
                {path:'/pg_courseD',component:() => import('./modules/work/guide/course_detail'),name:'名师引领课程'},
                {path:'/pg_resource',component:() => import('./modules/work/guide/resource'),name:'名师引领资源'},
                {path:'/pach_article',component:() => import('./modules/work/achievement/article'),name:'名师引领资源'},
                {path:'/pach_resource',component:() => import('./modules/work/achievement/resource'),name:'名师引领资源'},
                {path:'/p_salon',
                 component: () => import('./modules/work/salon/view'),
                 name: '沙龙首页',
                 children:[
                     {path:'/p_salon', component: () => import('./modules/work/salon/salon'), name: '沙龙首页'},
                     {path:'/salonD', component: () => import('./modules/work/salon/detail_salon'), name: '沙龙详情'}
                 ]
                },
            ]
        }
    ]
})
