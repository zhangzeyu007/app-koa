/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-31 08:53:17
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-09 22:28:53
 */

const jwt = require('jsonwebtoken')
const config = require('../config/config.default.js')

module.exports = ({ app }) => {
    return async function verify(ctx, next) {
        if (!ctx.request.header.authorization) {
            ctx.body = {
                code: -1,
                message: '用户没有登录'
            }
            return
        }

        const token = ctx.request.header.authorization.replace('Bearer ', '')
        try {
            const ret = await jwt.verify(token, config.jwt.secret)
            ctx.state.email = ret.email
            await next()
        } catch (error) {
            if (error) {
                console.log(error.name);
                if (error.name == 'TokenExpiredError') {
                    ctx.body = {
                        code: -666,
                        message: '登录过期了'
                    }
                } else {
                    ctx.body = {
                        code: -1,
                        message: '用户信息出错'
                    }
                }
            }
        }
    }
}
