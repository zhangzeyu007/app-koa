/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-10 16:45:47
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-10 16:47:20
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema  // 声明Schema

const categorySchmea = new Schema({
    editorId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    compiledContent: { type: String, required: true },
    likenum: { type: String },
})

mongoose.model('AdminEidtor', categorySchmea)