/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-26 17:09:55
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-26 17:14:39
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema  // 声明Schema


const categorySubSchmea = new Schema({
    ID: { unique: true, type: String },
    MALL_CATEGORY_ID: { type: String },
    MALL_SUB_NAME: { type: String },
    COMMENTS: { type: String },
    SORT: { type: Number },
})


mongoose.model('categorySub', categorySubSchmea)