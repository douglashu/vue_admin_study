import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        // 进行用户权限判断
        console.log('权限',store.getters.roles,to.meta); 
        let role = store.getters.roles;
        if(!to.meta.roles || to.meta.roles.length == 0 ){
          // 没有标注表示不需要验证的验证
          next()
        }else{
          // 有的话  进行权限比对
          let roleArr = to.meta.roles;
          if(roleArr.indexOf(role)>=0){
            // 有权限
            console.log('yes')
            next()
          }else{
            // 没有权限
            console.log('no')
            next({ path: '*' })
          }
        }
        
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
  store.dispatch('UpdatedHistory',to)
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
