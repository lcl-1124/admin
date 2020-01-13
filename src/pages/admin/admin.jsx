/*
登录路由组件
*/
import React,{Component} from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout } from 'antd';

import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from './home/home'
import Category from './category/category'
import Product from './product/product'
import Role from './role/role'
import User from './user/user'
import Bar from './charts/bar'
import Line from './charts/line'
import Pie from './charts/pie'

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  render () {
    const user = this.props.user;
    if (!user ||　!user._id) {
      return <Redirect to='/login'/>
    }
    return (
      <div style={{height: '100%'}}>
        <Layout style={{height: '100%'}}>
          <Sider>
            <LeftNav />
          </Sider>
          <Layout>
            <Header>Header</Header>
            <Content style={{margin: 20,backgroundColor: '#fff',minHeight: '100%'}}>
              <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/category' component={Category}/>
                <Route path='/product' component={Product}/>
                <Route path='/role' component={Role}/>
                <Route path='/user' component={User}/>
                <Route path='/charts/bar' component={Bar}/>
                <Route path='/charts/line' component={Line}/>
                <Route path='/charts/pie' component={Pie}/>
                <Redirect to='/home'/>
              </Switch>
            </Content>
            <Footer style={{color: '#ccc',textAlign: 'center'}}>推荐使用Chrome浏览器,以便您可以进行更好的操作,得到更好的效果</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {}
)(Admin)