/*
商品管理路由
*/
import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import ProductHome from './home'
import ProductAddUpdate from './addUpdate'
import ProductDetail from './detail'

export default class Product extends Component {
  render () {
    return (
      <Switch>
        <Route path='/product' component={ProductHome} exact></Route> {/*路径完全匹配*/}
        <Route path='/product/addUpdate' component={ProductAddUpdate}></Route>
        <Route path='/product/detail' component={ProductDetail}></Route>
        <Redirect to='/product'/>
      </Switch>
    )
  }
}