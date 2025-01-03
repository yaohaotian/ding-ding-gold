import { getToken } from './auth'
import { login, logout } from './auth'
import * as dd from 'dingtalk-jsapi'

const getBaseUrl = () => {
  return 'https://station.zdwp.tech/api/zdwp-idea'
  // return getApp().globalData.env === 'dev'
  //   ? 'https://station.zdwp.tech/api/zdwp-idea'
  //   : 'https://hh.zdwp.net/api/zdwp-idea'
}

export const requestLogin = () => {
  return new Promise((resolve, reject) => {
    dd.getAuthCode({
      corpId: 'dingbb84806e22b02664a1320dcb25e91351',
      clientId: 'ding44qiejdpfeezamy1',
      onSuccess: async function (res) {
        try {
          const r = await login(res.code)
          resolve(r)
        } catch (e) {
          console.log(e)
          reject(e)
        }
      },
      onFail: function (err) {
        dd.alert({
          title: '登录提示',
          content: '当前用户验证失败，' + JSON.stringify(err),
          buttonText: '确定'
        })
        reject()
      }
    })
  })
}

const getFullUrl = (url, params) => {
  const baseUrl = getBaseUrl()
  if (!params) {
    return `${baseUrl}${url}`
  }
  const p = new URLSearchParams()
  for (const key in params) {
    p.append(key, params[key])
  }
  const queryStr = p.toString()
  return url.indexOf('?') > -1
    ? `${baseUrl}${url}&${queryStr}`
    : `${baseUrl}${url}?${queryStr}`
}

const getHeaders = (headers) => {
  const h = headers || {}
  const token = getToken()
  if (token) {
    h['Authorization'] = `Bearer ${token}`
  }
  return h
}

const request = {
  getBaseUrl,
  get: function (url, params, httpHeaders) {
    let that = this
    const headers = getHeaders(httpHeaders)
    return new Promise((resolve, reject) => {
      fetch({
        url: getFullUrl(url),
        method: 'GET',
        dataType: 'json',
        headers,
        data: { ...params },
        success: (res) => {
          resolve(res)
        },
        fail: async (err) => {
          if (err.status === 401) {
            logout()
            await requestLogin()
            resolve(that.get(url, params))
          } else {
            dd.showToast({
              type: 'fail',
              content: JSON.stringify(err) || '发生了错误'
            })
            reject(err)
          }
        }
      })
    })
  },
  post: function (
    url,
    data,
    httpHeaders = { 'Content-Type': 'application/json' },
    dataType = 'json'
  ) {
    let that = this
    const headers =
      url === '/auth/login'
        ? { 'Content-Type': 'application/json' }
        : getHeaders(httpHeaders)
    return new Promise((resolve, reject) => {
      fetch({
        url: getFullUrl(url),
        method: 'POST',
        dataType,
        headers,
        data: JSON.stringify(data),
        success: (res) => {
          resolve(res)
        },
        fail: async (err) => {
          if (err.status === 401) {
            logout()
            await requestLogin()
            resolve(that.post(url, data))
          } else {
            dd.showToast({
              type: 'fail',
              content: JSON.stringify(err) || '发生了错误'
            })
            reject(err)
          }
        }
      })
    })
  }
}

export default request
