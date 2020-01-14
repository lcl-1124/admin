/*
reducer模块
  根据当前state和action生成新的state
*/
import {combineReducers} from 'redux' // 合并多个reducer函数生成一个新的reducer函数并返回

import { INCREMENT,DECREMENT } from "./action-type";

function count (state=0,action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }
}

export default combineReducers({
  count
})
