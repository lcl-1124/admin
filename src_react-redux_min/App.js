/*
主模块
*/
import React from 'react'
// import { connect } from "react-redux";
import { connect } from "./lib/react-redux"; // 自定义react-redux

import Counter from './component/counter'
import { increment,decrement } from "./redux/action";

// 指定向Counter传入哪些一般属性(属性值的来源就是store中的state)
const mapStateToProps = (state) => ({count: state.count})

/*
指定向Counter传入哪些函数属性
  如果是函数，会自动调用得到对象，将对象中的方法作为函数属性传入UI组件
  如果是对象，将对象中的方法包装成一个新的函数，并传入UI组件
*/ 
/*
// 函数
const mapDispatchToProps = (dispatch) => {
  return {
    increment: (number) => dispatch(increment(number)),
    decrement: (number) => dispatch(decrement(number)),
  }
}
*/
// 对象
const mapDispatchToProps = {increment, decrement}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

/*
export default connect(
  state => ({count: state.count}),
  {increment,decrement}
)(Counter)
*/
