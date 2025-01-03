import { loginApi } from '../api/sys'
import storage from './store'
import { requestLogin } from '/utils/request'

const TokenKey = 'IdeaToken'
const UserKey = 'IdeaUser'

export const getToken = () => {
  return storage.get(TokenKey)
}

export const getUser = () => {
  return storage.get(UserKey)
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
