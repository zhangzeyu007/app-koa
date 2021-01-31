/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-19 16:45:43
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-31 17:16:24
 */



const routes = [
    {
        path: '/main',
        name: 'main',
        redirect: { path: '/shopingMall' },
        component: resolve => require(['@/components/pages/Main.vue'], resolve),
        children: [
            {
                path: '/shopingMall',
                name: 'shopingMall',
                meta: {
                    roles: ['normal']
                },
                component: resolve => require(['@/components/pages/ShopingMall.vue'], resolve)
            },
            {
                path: '/categoryList',
                name: 'categoryList',
                meta: {
                    roles: ['normal']
                },
                component: resolve => require(['@/components/pages/CategoryList.vue'], resolve)
            },
            {
                path: '/cart',
                name: 'cart',
                meta: {
                    roles: ['normal']
                },
                component: resolve => require(['@/components/pages/Cart.vue'], resolve)
            },
            {
                path: '/member',
                name: 'member',
                meta: {
                    roles: ['vip']
                },
                component: resolve => require(['@/components/pages/Member.vue'], resolve)
            },

        ],

    },
    {
        path: '/goodsdetail',
        name: 'goodsDetail',
        meta: {},
        component: resolve => require(['@/components/pages/GoodsDetail.vue'], resolve)
    },

]


export default {
    routes
}