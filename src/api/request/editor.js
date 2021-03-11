/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-03-10 15:46:42
 * @LastEditors: 海象
 * @LastEditTime: 2021-03-10 16:04:44
 */
import axios from '../http'

function getEditorDataList(params) {
    return axios.post('/editor/geteditordatalist', params)
}

export default {
    getEditorDataList
}