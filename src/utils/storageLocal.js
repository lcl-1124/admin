/*
保存到本地的模块
*/
import store from 'store'
const USERITEM = 'user_item';
export default {
  /*
  保存
  */
  saveUser (user) {
    // localStorage.setItem(USERITEM,JSON.stringify(user))
    store.set(USERITEM,user)
  },
  /*
  读取
  */
  getUser () {
    // return JSON.parse(localStorage.getItem(USERITEM) || "{}")
    return store.get(USERITEM) || "{}"
  },
  /*
  删除
  */
  removeUser () {
    // localStorage.removeItem(USERITEM)
    store.remove(USERITEM)
  }
}