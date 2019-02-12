import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // meta: { title: '面板', icon: 'example' },
    // name: 'Dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      meta: { title: '面板', icon: 'example' },
      component: () => import('@/views/dashboard/index')
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

let filterRouteArr = [
  {
    path: '/pictureLibrary',
    component: Layout,
    redirect: '/pictureLibrary/pictureByList',
    name: 'Pictures',
    meta: { title: '图片库', icon: 'tongjichaxun' },
    children: [
      {
        path: 'pictureByList',
        name: 'pictureByList',
        component: () => import('@/views/pictureLibrary/pictureByList/index'),
        meta: { title: '列表', icon: 'tongjichaxun'}
      }
      ,
      {
        path: 'pictureByImg',
        name: 'pictureByImg', 
        component: () => import('@/views/pictureLibrary/pictureByImg/index'),
        meta: { title: '图片墙', icon: 'table' ,roles:['admin']}
      }
      ,
      {
        path: 'uploadPictures',
        name: 'uploadPictures', 
        component: () => import('@/views/pictureLibrary/uploadPictures/index'),
        meta: { title: '图片上传', icon: 'link',roles:['admin']}
      }
      ,
      {
        path: 'picturesEdite',
        name: 'picturesEdite', 
        component: () => import('@/views/pictureLibrary/picturesEdite/index'),
        meta: { title: '详情编辑', icon: 'tudangguanli',noHistory:true}
      }
    ]
  },
  {
    path: '/articles',
    component: Layout,
    name: 'Articles',
    meta: { title: 'excel', icon: 'link' },
    children: [
      {
        path: 'articleList',
        name: 'articleList', 
        component: () => import('@/views/articles/articleList/index'),
        meta: { title: '导出excel', icon: 'jihuaguanli',noHistory:true}
      }
    ]
  }
];
 // 更新权限路由表
export  function filterRoute(role,callback){
  
  filterRouteHandle(role,filterRouteArr);
  ROUTE.addRoutes(filterRouteArr)
  store.dispatch('UpdatedRoute',filterRouteArr).then(()=>{
    if(callback) callback();
  })
  
}
function filterRouteHandle(role,arr){
  for(let  i = 0;i<arr.length;i++){
    let item = arr[i]
    if(item.meta && item.meta.roles && item.meta.roles.indexOf(role)<0){
      item.hidden = true;
    }
    if(item.children && item.children.length>0){
      filterRouteHandle(role,item.children)
    }
  };

 
}

let ROUTE = new  Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export default ROUTE