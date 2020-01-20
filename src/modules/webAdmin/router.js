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
            path:'/login',
            name: 'login',
            component: () => import('./Login/login'),
        },
        {
            path:'/layout',
            name: 'layout',
            component: () => import('./Layout/Layout'),
            children: [
                {path:'/administrator',component:() => import('./page/administrator'),name:'工作室基础信息管理'},
                {path:'/addAdmin',component:() => import('./page/administrator/addAdmin'),name:'新增管理员'},
                {path:'/editAdmin',component:() => import('./page/administrator/editAdmin'),name:'修改管理员'},
                {path:'/infor',component:() => import('./page/infor'),name:'资讯管理'},
                {path:'/add_info',component:() => import('./page/infor/addInfo'),name:'新增资讯'},
                {path:'/edit_info',component:() => import('./page/infor/editInfo'),name:'修改资讯'},
                {path:'/teacher',component:() => import('./page/teacher'),name:'名师风采管理'},
                {path:'/add_tea',component:() => import('./page/teacher/addTea'),name:'名师风采新增'},
                {path:'/edit_tea',component:() => import('./page/teacher/editTea'),name:'名师风采修改'},
                {path:'/add_work',component:() => import('./page/workAdmin/addWork'),name:'新增工作室'},
                {path:'/alter_work',component:() => import('./page/workAdmin/alterWork'),name:'修改工作室'},
                {path:'/edit_work',component:() => import('./page/workAdmin/editWork'),name:'配置管理员'},
                {path:'/workAdmin',component:() => import('./page/workAdmin'),name:'工作室管理'},
            ]


        },


    ]
})
