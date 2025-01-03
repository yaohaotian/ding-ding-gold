import * as dd from 'dingtalk-jsapi'
/**
 * 本地数据缓存
 */
const storage = {
  /**
   * 读取数据
   */
  get: (key) => {
    return localStorage.getItem( key )
  },
  /**
   * 保存数据
   */
  set: (key, data) => {
    return localStorage.setItem( key, data )
  },
  /**
   * 删除数据
   */
  remove: (key) => {
    localStorage.removeItem( key )
  }
}

export default storage
