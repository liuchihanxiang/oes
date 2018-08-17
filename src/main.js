// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
// import 'animate.css'
import  '@/styles/index.scss' 

import ElementUI from 'element-ui'
import {Message} from 'element-ui'
import router from './router'
import store from './store'
import i18n from './lang'  
import  './icons' //全局图标组件
// import './globalMethod/dialog'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
