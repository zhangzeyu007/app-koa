/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-22 13:17:04
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-09 22:30:10
 */

const mongoose = require('mongoose')
const Config = require('./config.js')
const glob = require('glob')
const { resolve } = require('path')

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}


exports.connect = () => {
    // 链接数据库
    mongoose.connect(Config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {

    })
    mongoose.set('useCreateIndex', true)
    let maxConnectTimes = 0;
    return new Promise((resolve, reject) => {
        // 增加数据库监听事件
        mongoose.connection.on("disconnected", () => {
            console.log('*******数据库断链');
            if (maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(Config.dbUrl)
            } else {
                reject()
                throw new Error("数据库出现问题,程序无法搞定")
            }
        })
        mongoose.connection.on("error", () => {
            console.log('*******数据库错误');
            if (maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(Config.dbUrl)
            } else {
                reject()
                throw new Error("数据库出现异常")
            }
        })
        //链接打开时
        mongoose.connection.once("open", (db) => {
            console.log('*******链接成功 ');
            mongoose.connect(Config.dbUrl)
            resolve(db)
        })
    })

}