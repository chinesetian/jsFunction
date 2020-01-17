import AxiosFetch from '@huangjingjing/axios-fetch'
import { getCacheItem, setCacheItem } from './Tools'
import { message } from 'antd'
import { createBrowserHistory } from 'history'

const config = {
  // baseURL: '/',
  timeout: 10000,
  headers: {
    'Accept':'text/html,application/xhtml+xml,application/xml,application/json; charset=utf-8',
    'Content-Type': 'application/json; charset=utf-8'
  },
   xhrMode:'fetch',
}
const $http = AxiosFetch.create(config)

const $httpUpload = AxiosFetch.create({
  timeout: 10000,
  xhrMode:'fetch',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

/**
 * 请求之前拦截动作
 */
$http.interceptors.request.use(
  response => {
    return response
  },
  error => {
    console.log(error)
  }
)

/**
 * 请求之后拦截动作
 */
$http.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    if (response.data.code === 200) {
      return response.data
    } else if(response.data.code === 407){ 
      setCacheItem('isLogin', false, 'session');
      //createBrowserHistory().push("/");
      setTimeout(() => {
        window.location.href = '/login';
      }, 500);
      return message.error("登录信息已失效，请重新登录！")
    }else {
      message.error(response.data.message)
      return Promise.reject(response.data)
    }
  },
  function(error) {
    // 对响应错误做点什么
    message.error('系统异常')
    return Promise.reject(error)
  }
)

const $httpRequest = function({ url, type, data, method }) {
  let options = {}
  options.url = url
  options.method = method || 'get'
  options.headers = {
    Authorization: getCacheItem('token', 'cookie')
    // Authorization: '9527'
  }
  if (type === 'query') {
    options.params = data || {}
  } else {
    options.data = data || {}
  }
  return $http(options)
}


export function httpRequest(component) {
  component.prototype.$http = $http
  component.prototype.$httpRequest = $httpRequest
  component.prototype.$httpUpload = $httpUpload
  return component
}
