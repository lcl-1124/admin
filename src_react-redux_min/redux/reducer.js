/*
reducer模块
  根据当前state和action生成新的state
*/
// import {combineReducers} from 'redux'  // 合并多个reducer函数生成一个新的reducer函数并返回
import {combineReducers} from '../lib/redux'  // 自定义redux

import { INCREMENT,DECREMENT } from "./action-type";

function count (state=0,action) {
  console.log('count()', state, action)
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }
}

function user (state={},action) {
  console.log('user()', state, action)
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  count,
  user
})
