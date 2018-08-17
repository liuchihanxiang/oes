import axios from 'axios'
import {
    Message
} from 'element-ui'
import store from '@/store'
import qs from 'qs'
import httpCode from '@/config/httpCode'
import NProgress from "nprogress";
import {
    showFullScreenLoading,
    tryHideFullScreenLoading
} from './loading'

import {
    getToken,
    removeToken
} from '@/utils/token'
const service = axios.create({
    // timeout:10000,
    baseURL: '/api/',
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json'
    }
})
NProgress.configure({ showSpinner: true })
service.interceptors.request.use(config => {
    if (!config.config || config.config && (config.config.loading === undefined || config.config.loading)) {
        // showFullScreenLoading()
    }
    NProgress.start()
        //时间戳
    config.url = config.url + '?' + new Date().getTime()
        //序列化数据 
        // config.loading
        // if(
        //     config.method==='post'||
        //     config.method==="put"||
        //     config.method==="delete"
        // ){
        //     config.data=JSON.stringify(config.data)
        // }
        //头部添加token
    if (store.getters.usertoken) {
        config.headers['token'] = getToken()
    }

    return config
}, error => {
    Message({
        showClose: true,
        message: error,
        type: "error"
    })
    return Promise.reject(error.message)
})

service.interceptors.response.use(response => {
        const res = response.data
        if (!response.config.config || response.config.config && (response.config.config.loading === undefined || response.config.config.loading)) {
            // tryHideFullScreenLoading()
        }
        NProgress.done()
        if (res && res.code != httpCode.SUCCESS_CODE) {
            if (res.code == httpCode.TIMEOUT_CODE) { //token过期
                removeToken()
                location.reload()
                Message({
                    message: '登录已过期，请重新登录',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else {
                Message({
                    message: res.msg,
                    type: 'error',
                    duration: 5 * 1000
                })
            }
            return Promise.reject(res.msg)
        } else {
            return res
        }
    },
    error => {
        // tryHideFullScreenLoading()
        NProgress.done()
        Message({
            message: error.response.data.msg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    })
export default service