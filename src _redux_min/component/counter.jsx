/*
UI组件
*/
import React from 'react'

import {increment,decrement,asyncIncrement} from '../redux/action'

export default class Counter extends React.Component{
  constructor (props) {
    super(props)
    // 创建ref
    this.myNumber = React.createRef() 
  }
  // 增加
  increment = () => {
    // 访问ref
    const number = this.myNumber.current.value * 1
    // 分发action
    this.props.store.dispatch(increment(number))
  }
  // 减少
  decrement = () => {
    // 访问ref
    const number = this.myNumber.current.value * 1
    // 分发action
    this.props.store.dispatch(decrement(number))
  }
  // 奇数增加
  incrementOdd = () => {
    const {count} = this.props.store.getState()
    // 访问ref
    const number = this.myNumber.current.value * 1
    // 分发action
    if (count % 2) {
      this.props.store.dispatch(increment(number))
    }
  }
  // 异步增加
  incrementAsync = () => {
    // 访问ref
    const number = this.myNumber.current.value * 1
    // 分发action
    this.props.store.dispatch(asyncIncrement(number))
  }
  render () {
    const state = this.props.store.getState()
    const {count} = state
    return (
      <div style={{margin: 10}}>
        <div>Click {count} times</div>
        <select defaultValue='1' ref={this.myNumber}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select> 
        <button style={{marginLeft: 10}} onClick={this.increment}> + </button>
        <button style={{marginLeft: 10}} onClick={this.decrement}> - </button>
        <button style={{marginLeft: 10}} onClick={this.incrementOdd}> increment of odd </button>
        <button style={{marginLeft: 10}} onClick={this.incrementAsync}> increment async </button>
      </div>
    )
  }
}