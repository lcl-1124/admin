/*
主模块
*/
import { connect } from "react-redux"; // 高阶组件，将UI组件包装成容器组件

import Counter from './component/counter'
import {increment,decrement,incrementAsync} from './redux/action'

export default connect(
  state => ({count: state.count}),
  {increment,decrement,incrementAsync}
)(Counter)


/*
connect

mapStateToprops = (state) => {
  return {
    count: state
  }
}
mapDispatchToProps = (dispatch) => {
  return {
    increment: (number) => dispatch(increment(number)),
    decrement: (number) => dispatch(decrement(number))
  }
}
connect(
  mapStateToprops,
  mapDispatchToProps
)()
*/