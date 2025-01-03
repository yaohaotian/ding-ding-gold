import { loginApi } from '@/api/sys.js'
import * as dd from 'dingtalk-jsapi'
import storage from './store'

const TokenKey = 'IdeaToken'
const UserKey = 'IdeaUser'

export const getToken = () => {
  return storage.get(TokenKey)
}

export const getUser = () => {
  return storage.get(UserKey)
}

export const requestLogin = () => {
  return new Promise((resolve, reject) => {
    dd.getAuthCode({
      corpId: 'dingbb84806e22b02664a1320dcb25e91351',
      clientId: 'ding8q0j8mvh1gzutmeu',
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

/**
 * 初始打开时登录
 */
export const login = (authCode) => {
  return new Promise(async (resolve, reject) => {
    // const result = await loginApi(authCode)
    loginApi(authCode)
      .then(({ data }) => {
        storage.set(TokenKey, data.token)
        storage.set(UserKey, {
          userId: data.userId,
          nickName: data.nickName,
          // 是否为板块管理员
          approveUser: data.approveUser,
          finalApproveUser: data.finalApproveUser,
          middleApproveUser: data.middleApproveUser
        })
        resolve(data)
      })
      .catch((err) => reject(err))
  })
}

/**
 * 退出
 */
export const logout = () => {
  storage.remove(TokenKey)
  storage.remove(UserKey)
}

// ios用户登录
// export const iosRelogin = () => {
//   return new Promise((resolve, reject) => {
//     dd.getSystemInfo({
//       success: async (res) => {
//         if (res.platform === 'iOS') {
//           resolve(await requestLogin())
//         } else {
//           reject()
//         }
//       }
//     })
//   })
// }
