import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}
//组件模块


Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/',
            redirect:'/memberList',
            name: 'plazaView',
            component: () => import('./view'),
            children: [
                {path:'/memberList',component:() => import('./memberList/view'),name:'名师引领资源'},
                {path:'/activity_consult', component: () => import('./activity/activity_consult'), name: '活动资讯'},
                {path:'/activityD', component: () => import('./activity/activityD'), name: '活动资讯详情'},
                {path:'/notice', component: () => import('./activity/notice'), name: '公告通知'},
                // {path:'/noticeD', component: () => import('./activity/noticeD'), name: '详情'},
                {path:'/a', component: () => import('./activity/noticeD'), name: '活动资讯详情'},
                {path:'/b', component: () => import('./activity/noticeD'), name: '公告通知详情'},
                {path:'/plazaHome', component: () => import('./home/home'), name: '个人工作室首页'},
                {path:'/pGuide_home', component: () => import('./guide/home'), name: '名师引领公共页'},
                {path:'/pg_article',component:() => import('./guide/article'),name:'名师引领文章'},
                {path:'/pg_articleD',component:() => import('./guide/article_detail'),name:'名师引领文章'},
                {path:'/pg_course',component:() => import('./guide/course'),name:'名师引领课程'},
                {path:'/pg_courseD',component:() => import('./guide/course_detail'),name:'名师引领课程'},
                {path:'/pg_resource',component:() => import('./guide/resource'),name:'名师引领资源'},
                {path:'/pach_article',component:() => import('./achievement/article'),name:'成员文章'},
                {path:'/pach_resource',component:() => import('./achievement/resource'),name:'成员资源'},
                {path:'/ac_articleD',component:() => import('./achievement/article_detail'),name:'成员文章详情'},
                {path:'/p_salon',
                    component: () => import('./salon/view'),
                    name: '沙龙首页',
                    children:[
                        {path:'/p_salon', component: () => import('./salon/salon'), name: '沙龙首页'},
                        {path:'/salonD', component: () => import('./salon/detail_salon'), name: '沙龙详情'}
                    ]
                },
            ]
        },
        {
            path:'/work_login',
            name:'work_login',
            component:() => import('./login/login'),
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
