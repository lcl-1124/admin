/*
reducer函数模块
  根据当前state和action生成新的state
*/
import {combineReducers} from 'redux' // 用来合并多个reducer函数

import {
  SET_HEADER_TITLE,
  RECEIVE_USER,
  ERROR_MSG,
  RESET_USER
} from './action-type'
import storageLocal from "../utils/storageLocal";
/*
头部标题的reducer函数
*/
const initHeaderTitle = ''
function headerTitle (state=initHeaderTitle,action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data
    default:
      return state
  }
}

/*
登录用户的reducer函数
*/
const initUser = storageLocal.getUser()
function user (state=initUser,action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.data
    case ERROR_MSG:
      const errMsg = action.data
      return {...state,errMsg}
    case RESET_USER:
      return {}
    default:
      return state
  }
}

/*
合并所有的reducer，生成一个新的reducer并向外暴露
*/
export default combineReducers({
  headerTitle,
  user
})