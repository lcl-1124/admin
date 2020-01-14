/*
UI组件
*/
import React from 'react'

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
    this.props.increment(number)
  }
  // 减少
  decrement = () => {
    // 访问ref
    const number = this.myNumber.current.value * 1
    // 分发action
    this.props.decrement(number)
  }
  // 奇数增加
  incrementOdd = () => {
    const {count} = this.props
    // 访问ref
    const number = this.myNumber.current.value * 1
    // 分发action
    if (count % 2) {
      this.props.increment(number)
    }
  }
  // 异步增加
  incrementAsync = () => {
    // 访问ref
    const number = this.myNumber.current.value * 1
    // 分发action
    this.props.incrementAsync(number)
  }
  render () {
    const {count} = this.props
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