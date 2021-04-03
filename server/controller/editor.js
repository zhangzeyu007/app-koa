/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-10 16:05:24
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-31 17:36:57
 */
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const mongoose = require('mongoose')
const jwt = require('../middleware/jwt.js')(app)


// 获取文章列表数据
router.post('/geteditordatalist', jwt, async (ctx) => {
    const AdminEidtor = mongoose.model('AdminEidtor')
    let result = await AdminEidtor.find()
    ctx.body = {
        code: 200,
        data: result
    }
})






module.exports = router