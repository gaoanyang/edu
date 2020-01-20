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
            name: 'layout',
            component: () => import('./Layout/Layout'),
            children: [
                {path:'/admin',component:() => import('./admin/admin'),name:'工作室基础信息管理'},
                {path:'/admin/infor',component:() => import('./admin/infor'),name:'资讯管理'},
                {path:'/admin/tea_article',component:() => import('./admin/tea_article'),name:'专家文章管理'},
                {path:'/admin/tea_res',component:() => import('./admin/tea_res'),name:'学习资源管理'},
                {path:'/admin/addTea_res',component:() => import('./admin/res/addTea_res'),name:'学习资源管理'},
                {path:'/admin/tea_course',component:() => import('./admin/tea_course'),name:'名师课程管理'},
                {path:'/admin/tea_upcourse',component:() => import('./admin/tea_course/up_course'),name:'上传课程'},
                {path:'/admin/edit_upcourse',component:() => import('./admin/tea_course/edit_course'),name:'编辑课程'},
                {path:'/admin/tea_cicourse',component:() => import('./admin/tea_course/cite'),name:'引用课程'},
                {path:'/admin/preview',component:() => import('./admin/tea_course/preview'),name:'引用课程'},
                {path:'/admin/share_article',component:() => import('./admin/share_article'),name:'文章管理'},
                {path:'/admin/share_look',component:() => import('./admin/share/look'),name:'文章管理详情'},
                {path:'/admin/share_modifi',component:() => import('./admin/share/modifi'),name:'文章管理修改'},
                {path:'/admin/share_addArticle',component:() => import('./admin/share/share_addArticle'),name:'文章管理新增'},
                {path:'/admin/share_res',component:() => import('./admin/share_res'),name:'资源管理'},
                {path:'/admin/member',component:() => import('./admin/member'),name:'工作室成员管理'},
                {path:'/admin/addMember',component:() => import('./admin/member/addMember'),name:'新增教师'},
                {path:'/admin/editMember',component:() => import('./admin/member/editMember'),name:'修改教师'},
                {path:'/admin/add_info',component:() => import('./admin/sub/addInfo'),name:'新增资讯'},
                {path:'/admin/edit_info',component:() => import('./admin/sub/editInfo'),name:'编辑资讯'},
                {path:'/admin/edit_article',component:() => import('./admin/sub/editArticle'),name:'编辑专家文章'},
                {path:'/admin/add_article',component:() => import('./admin/sub/addArticle'),name:'发布文章'},
                {path:'/admin/salon',component:() => import('./admin/salon'),name:'成员沙龙'},
                {path:'/admin/addSalon',component:() => import('./admin/salon/addSalon'),name:'新增沙龙'},
                {path:'/admin/salonM',component:() => import('./admin/salon/salonM'),name:'成员沙龙编辑'},
            ]
        },

    ]
})
