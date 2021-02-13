/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-24 15:13:57
 * @LastEditors: 海象
 * @LastEditTime: 2021-02-12 17:53:13
 */
const Router = require('koa-router')
const mongoose = require('mongoose')
const svgCaptcha = require('svg-captcha')
const config = require('../config/config.default.js')
const jwt = require('jsonwebtoken')



let router = new Router()

// 验证码服务接口
router.get('/captcha', async (ctx) => {
    const captcha = svgCaptcha.create({
        size: 4,
        fontSize: 50,
        width: 80,
        height: 35,
        noise: 3
    })

    ctx.session.captcha = captcha.text
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data
})

// 注册接口
router.post('/register', async (ctx) => {
    ctx.checkBody('userName').optional().len(2, 20, "name is too long");
    ctx.checkBody('email').isEmail("invalid email");
    ctx.checkBody('password').notEmpty().md5()
    ctx.checkBody('captcha').notEmpty()
    const { captcha } = ctx.request.body
    if (captcha.toUpperCase() != ctx.session.captcha.toUpperCase()) {
        ctx.body = {
            code: -1,
            message: '验证码错误'
        }
        return
    }
    if (ctx.errors) {
        ctx.body = {
            code: -1,
            message: ctx.errors
        }
        return;
    }
    const User = mongoose.model('users')
    let newUser = new User(ctx.request.body)
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: '注册成功'
        }
    }).catch((error) => {
        let err = '服务器错误'
        let code = 500
        if (error.code == 11000) {
            err = '邮箱或者用户名已被注册'
            code = 11000
        }
        ctx.body = {
            code: code,
            message: err
        }

    })
})

// 登录接口
router.post('/login', async (ctx) => {
    ctx.checkBody('email').isEmail("invalid email");
    ctx.checkBody('password').notEmpty().md5()
    const { email, password, captcha } = ctx.request.body

    if (captcha.toUpperCase() != ctx.session.captcha.toUpperCase()) {
        ctx.body = {
            code: -1,
            message: '验证码错误'
        }
        return
    }
    if (ctx.errors) {
        ctx.body = {
            code: -1,
            message: ctx.errors
        }
        return;
    }
    // 引入user的 model
    const User = mongoose.model('users')
    await User.findOne({ email: email }).exec().then(async result => {
        if (result) {
            let newUser = new User()
            await newUser.comparePassword(password, result.password)
                .then(isMatch => {
                    if (isMatch) {
                        const token = jwt.sign({
                            email
                        }, config.jwt.secret, { expiresIn: '1h' })
                        ctx.body = {
                            code: 200,
                            message: "请求成功",
                            data: {
                                token: token
                            }
                        }
                    } else {
                        ctx.body = {
                            code: 200,
                            message: '密码或者邮箱不正确',
                            data: {
                                token: ''
                            }
                        }
                    }
                }).catch(error => {
                    console.log(error);
                    ctx.body = {
                        code: 500,
                        message: '服务器错误'
                    }
                })
        } else {
            ctx.body = {
                code: 200,
                message: "用户名不存在",
                data: {
                    exist: false
                }
            }
        }
    }).catch(error => {
        console.log(error);
        ctx.body = {
            code: 500,
            message: error,
            data: {
            }
        }
    })
})



module.exports = router