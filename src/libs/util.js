import axios from 'axios'
import router from '@/router/index'
import store from '@/store/index'
import config from '@/config/config'
import * as types from '@/store/mutation-types'

let util = {

}
util.title = (title) => {
  title = title || '致美'
  window.document.title = title
}

//  创建axiox 实例
util.http = axios.create({
  baseURL: config.api,
  timeout: 30000
})

// http request 拦截器
util.http.interceptors.request.use(
  config => {
    if (localStorage.token) {
      const token = localStorage.token
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
util.http.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
        case 402:
          // 402 用户未注册跳转注册页面
          router.replace({
            path: '/bind',
            query: {}
          })
          break
        case 403:
          //  403 token 不存在，跳转授权页面
          location.href = config.loginUrl + '/api/core/login'
          break
      }
    }
    // console : Error: Request failed with status code 402
    console.log(error)
    return Promise.reject(error.response.message)
  })

export default util
