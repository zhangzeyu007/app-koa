/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-24 15:37:12
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-31 20:08:52
 */
const Router = require('koa-router')
const fs = require('fs')
let router = new Router()

// 导入首页数据接口
router.get('/getHomeDataList', async (ctx) => {
    let data = fs.readFileSync('./data_json/home.json', 'utf8')
    data = JSON.parse(data)
    ctx.body = {
        code: 200,
        message: "请求成功",
        data: data
    }
})


module.exports = router