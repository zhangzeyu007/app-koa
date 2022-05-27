/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-24 15:52:03
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-29 23:08:27
 */

import axios from '../http'

function setRegister(url, pararms) {
    return axios.post('/user' + url, pararms)
}

function Login(url, params) {
    return axios.post('/user' + url, params)
}

function getCaptcha() {
    return axios.get('/user/captcha')
}

export default {
    setRegister,
    Login,
    getCaptcha
}
