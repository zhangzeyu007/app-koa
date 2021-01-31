/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-01-09 22:09:44
 * @LastEditors: 海象
 * @LastEditTime: 2021-01-31 13:05:20
 */

import axios from 'axios'
import qs from 'qs'

/**
 * 根据环境变量进行接口区分
*/

switch (process.env.NODE_ENV) {
    case "development":
        axios.defaults.baseURL = "http://localhost:3000"
        break;
    case "test":
        axios.defaults.baseURL = ""
        break;
    case "production":
        axios.defaults.baseURL = ""
        break;
}

/**
 * 设置超时时间和跨域是否允许携带凭证
 * 
*/
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

/**
 * 设置数据请求传递 的格式x-www-form-urlencoded
 * (看服务器要求什么格式)
*/

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = data => qs.stringify(data)

/**
 * 设置请求截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器 
 * TOKEN校验(JWT), 接收服务器返回的token,存储到vuex中
 * 每一次向服务器发请求, 我们应该把tken带上
*/
axios.interceptors.request.use(config => {
    // 携带token
    let token = localStorage.getItem('token');
    token && (config.headers.Authorization = 'Bearer ' + token);
    return config
}, error => {
    return Promise.reject(error)
})

/**
 *响应拦截器
 服务返回信息 -> [拦截统一处理] -> 客户端JS获取到的信息
*/
// axios.defaults.validateStatus = status => {
//     // 自定义响应成功的HTTP 状态码
//     return /^(2|3)\d{2}$/.test(status)
// }

axios.interceptors.response.use(response => {
    if (response.data.code == -666) {
        localStorage.removeItem('token')
    }
    return response.data;
}, error => {
    let { response } = error

    if (response) {
        //  服务器最起码返回结果
        switch (response.status) {
            case 401: // 权限
                break;
            case 403: // 服务理解请求,但拒绝请求
                break;
            case 404:// 资源文件不存在
                break;
        }

    } else {
        //=> 服务器连接结果都没有返回
        if (!window.navigator.online) {
            // 断网处理: 可以跳转到断网页面

            return;
        }

        return Promise.reject(error)
    }
})


export default axios;
