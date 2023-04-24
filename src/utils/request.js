import axios from 'axios';
import { baseURL } from '@/config';
import { Message } from 'element-ui';

// 创建axios实例
const service = axios.create({
    baseURL,
    timeout: 20000
})

/**
 * 请求拦截器
 * 参数1：req, request的实例
 * 参数2：error, 请求失败的回调，返回一个失败的Promise, 后续通过.then()方法获取失败原因
 **/
service.interceptors.request.use(req => {
    // 获取服务器传来的token并缓存在本地
    // 用于携带在请求头中进行用户的合法校验
    let token = localStorage.getItem('token');
    if (token) {
        req.headers['X-token'] = token;  // 请求头token的标识X-token是和后端约定好的
    }
    return req;
}, error => {
    return Promise.reject(error);
})

/**
 * 响应拦截器
 * 后端返回数据格式: { code: 10000, data: xxx, message: 'success'}
 **/
service.interceptors.response.use(res => {
    const result = res.data;
    /**
     * 先判断后端返回的token是否正常
     * 并对外一个友好的提示
     **/
    if (result.code !== 10000) {
        Message.error(result.message);
    }
    /**
     * 登录超时, 后端说如果返回-2代表登录超时
     * 长时间未请求接口，一直挂着不动
     * 清除登录的状态(token)，跳转回登录页
     **/
    if (result.code === -2) {
        localStorage.removeItem('token');
        window.location.href = location.origin + '/cms-manage/#/login'
    }
    return result;

}, error => {
    console.log('Error:' + error);
    return Promise.reject(error);
})

export default service;