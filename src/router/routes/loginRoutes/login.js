/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-23 21:57:54
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-31 17:47:29
 */
const routes = [
    {
        path: '/register',
        name: 'Register',
        meta: {},
        component: resolve => require(['@/components/pages/Register.vue'], resolve),
    },
    {
        path: '/login',
        name: 'Login',
        meta: {},
        component: resolve => require(['@/components/pages/Login.vue'], resolve),
    },
]

export default {
    routes
}