/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-18 18:06:49
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-31 18:21:38
 */
import Vue from 'vue'
import Router from 'vue-router'
import shopRoute from './routes/shopRoutes/shop.js'
import loginRoute from './routes/loginRoutes/login.js'

Vue.use(Router)


// 创建一个Router实例
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    ...loginRoute.routes,
    ...shopRoute.routes
  ]
});


