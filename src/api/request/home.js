/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-31 19:29:17
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-31 19:39:25
 */
import axios from '../http'

function getHomeDataList() {
    return axios.get('/home/getHomeDataList', {})
}

export default {
    getHomeDataList
}