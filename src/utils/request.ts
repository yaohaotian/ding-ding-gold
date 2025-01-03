import { getToken } from './auth'
import { login, logout } from './auth'
import * as dd from 'dingtalk-jsapi'
import axios from 'axios'
import storage from '@/utils/store'

// 配置 Axios
const instance = axios.create({
  baseURL: 'https://station.zdwp.tech/api/zdwp-idea', // 替换为你的 API 基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 添加 token 或其他请求头
    const token = storage.get('IdeaToken') // 假设 token 存储在 storage 中
    if (token && config.url != '/auth/login') {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 封装 GET 请求
export const get = (url, params = {}) => {
  return instance.get(url, { params })
}

// 封装 POST 请求
export const post = (url, data = {}) => {
  return instance.post(url, data)
}

export default {
  get,
  post
}
