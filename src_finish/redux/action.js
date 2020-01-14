/*
action creator模块
  间接修改state
*/
import {INCREMENT,DECREMENT} from './action-type'

//增加同步action 
export const increment = number => ({type: INCREMENT,data: number})
// 减少同步action
export const decrement = number => ({type: DECREMENT,data: number})

// 增加异步action
export const incrementAsync = number => {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment(number))
    }, 1000);
  }
}