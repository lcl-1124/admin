/*
action creator模块
  生成多个间接修改state的action函数
*/
import { message } from "antd";
import { 
  SET_HEADER_TITLE,
  RECEIVE_USER,
  ERROR_MSG,
  RESET_USER
} from "./action-type";
import { 
  reqLogin
} from "../api";
import storageLocal from '../utils/storageLocal'

// 设置头部标题的同步action
export const setHeaderTitle = headerTitle => ({type: SET_HEADER_TITLE, data: headerTitle})
// 接收用户信息的同步action
const receiveUser = user => ({type: RECEIVE_USER,data: user})
// 接收错误信息的同步action
const errorMsg = errMsg => ({type: ERROR_MSG,data: errMsg})

// 退出请求的同步action
export const getLogout = () => {
  // 清除storage中的数据
  storageLocal.removeUser()
  // 返回一个action
  return {type: RESET_USER}
}

// 发送登录请求的异步action
export const getLogin = (username,password) => {
  return async dispatch => {
    const result = await reqLogin({username,password})
    if (result.status === 0) {
      message.success('登录成功')
      const user = result.data
      // 保存到本地
      storageLocal.saveUser(user)

      dispatch(receiveUser(user))
    } else {
      const errMsg = result.msg
      dispatch(errorMsg(errMsg))
    }
  }
}


