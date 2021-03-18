import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// import login from '../pages/login'
const login = () => Promise.resolve(import('../pages/login/login'))
const index = () => Promise.resolve(import('../pages/index/index'))
const menu = () => Promise.resolve(import('../pages/menu/menu'))
const home = () => Promise.resolve(import('../pages/home/home'))
const role = () => Promise.resolve(import('../pages/role/role'))
const manager= () => Promise.resolve(import('../pages/manager/manager'))
export default new Router({
  routes: [
    {
      path: '/login',
      alias: '/l',
      component: login
    },
    {
      path: '/',
      component: index,
      children: [
        {
          path: 'home',
          name: '首页',
          component: home
        },
        {
          path: 'menu',
          name: '菜单',
          component: menu
        },
        {
          path: 'role',
          name: '角色',
          component: role
        },
        {
          path: 'manager',
          name: '管理员',
          component: manager
        },
        {
          path: '',
          redirect: '/home'
        },
      ]
    },
  ]
})
