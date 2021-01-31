/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-20 15:26:54
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-28 18:05:47
 */

import axios from '../http'

function getGoodsDetail(url, params) {
    return axios.post('/goods' + url, params)
}
// 分类大类接口
function getCategoryData(params) {
    return axios.get('/goods/category', params)
}
// 分类小类接口
function getCategorySubData(params) {
    return axios.post('/goods/categorysub', params)
}

function getSubGoodsListData(params) {
    return axios.post('/goods/getSubGoodsList', params)
}


export default {
    getGoodsDetail,
    getCategoryData,
    getCategorySubData,
    getSubGoodsListData
}