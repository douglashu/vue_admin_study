import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  
  // console.log(to)

  // 检测本地token 存在
  if (getToken()) {    
    if (to.path === '/login') {    
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      let lastr = JSON.parse(sessionStorage.getItem("lastRoute")) ;     
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          if(lastr && from.name === null && to.name!='dashboard'){
            // 是否是刷新页面操作    
            next({path:lastr.fullPath})      
          }else{
            next()
          }
          
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      console.log(-1)
      // next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      next(`/login`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
  store.dispatch('UpdatedHistory',to)
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
