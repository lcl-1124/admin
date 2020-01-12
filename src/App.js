/*
主模块
*/

import React,{Component} from 'react'
import {message} from 'antd'
import { BrowserRouter ,Route, Switch } from 'react-router-dom';

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class App extends Component{
  handleClick = () => {
    message.success('点击成功~~~')
  }
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter >
    )
  }
}