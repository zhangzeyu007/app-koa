/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-18 18:06:49
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-31 18:22:28
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import { Tabbar, TabbarItem, Stepper, Tab, Tabs, Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, PullRefresh, Image, Form } from 'vant'
import api from './api/api.js'
import './permission'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Tabs).use(Tab).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem).use(Image).use(Form)
Vue.prototype.$api = api
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
