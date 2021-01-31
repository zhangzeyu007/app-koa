/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-26 16:19:39
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-26 16:56:08
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema  //声明Schema

const categorySchmea = new Schema({
    ID: { unique: true, type: String },
    MALL_CATEGORY_NAME: { type: String },
    IMAGE: { type: String },
    TYPE: { type: Number },
    SORT: { type: Number },
    COMMENTS: { type: String },
})

mongoose.model('category', categorySchmea)