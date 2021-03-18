// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 1.引入重置样式
import "./assets/css/reset.css";
// 2.引入公共组件
import comComponents from './components'
for(let i in comComponents){
  Vue.component(i,comComponents[i])
}
// 3.引入全局过滤器
import comFilters from './filters'
for(let i in comFilters){
  Vue.filter(i,comFilters[i])
}
// 引入路由
import router from './router'
// 4.引入element-ui模板
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import  store from "./store";
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
})
