import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import App from './App'
import router from './router'
import store from './store'


// 全部部分
import '@/styles/index.scss' // global css
// 图片预览插件
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
//  全局过滤器
import * as Filters from './utils/filters.js'
Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key])
})


import '@/icons' // icon  基础模板中的图标
import '@/permission' // permission control权限引用管理

//  自定义全局指令
Vue.directive('hover',{
  inserted:function(el,binding){
    // console.log(el)
    el.addEventListener('mouseover',function(){
      // console.log(binding.value)
    })
  }
})

Vue.use(Viewer);
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
