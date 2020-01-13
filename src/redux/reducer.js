/*
reducer函数模块
  根据当前state和action生成新的state
*/
import {combineReducers} from 'redux' // 用来合并多个reducer函数

import storageLocal from "../utils/storageLocal";
/*
头部标题的reducer函数
*/
const initHeaderTitle = '首页'
function headerTitle (state=initHeaderTitle,action) {
  switch (action.type) {
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