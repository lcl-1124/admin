/*
管理路由组件
*/
import React,{Component} from 'react'
import { connect } from "react-redux"
import { Form, Icon, Input, Button } from 'antd'

import { getLogin } from "../../redux/action"
import "./login.less"
import logo from '../../assets/images/adminLogo.png'
import { Redirect } from 'react-router'

class Login extends Component {

  handleSubmit = (event) => {
    // 阻止事件默认行为
    event.preventDefault()

    // 提交前统一验证
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 发送ajax请求
        const {username,password} = values
        this.props.getLogin(username,password)
        this.props.history.replace('/home')
      } else {
        console.log('验证失败')
      }
    })
  }

  validatorPwd = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码!')
    } else if (value.length < 4) {
      callback('密码长度至少4位!')
    } else if (value.length > 12) {
      callback('密码长度最多12位!')
    } else if (!/^[A-z0-9_]+$/.test(value)) {
      callback('密码必须右字母、数字或下划线组成!')
    } else {
      callback() // 验证成功
    }
  }
  
  render () {
    const user = this.props.user
    if (user && user._id) {
      return <Redirect to='/home'/>
    }
    const form = this.props.form
    const { getFieldDecorator } = form
    return (
      <div className="loginContainer">
        <header className="loginHeader">
          <img src={logo} alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="loginContent">
          <div className={user.errMsg ? 'error-msg show' : 'error-msg'}>{user.errMsg}</div>
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username',{ // 配置对象：属性名是特定的一些名称
                  // 声明式验证：直接使用别人定义好的验证规则进行验证
                  rules: [
                    {required: true,whitespace: true,message: '请输入用户名!'},
                    {min: 4,message: '用户名长度至少4位!'},
                    {max: 12,message: '用户名长度最多12位!'},
                    {pattern: /^[A-z0-9_]+$/,message: '用户名必须是由英文、数字或下划线组成!'},
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password',{
                  rules: [
                    {validator: this.validatorPwd}
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

/*
包装From组件生成一个新的组件：Form.create()(Login)
新组件会向From组件传递一个强大的对象属性：from
*/
const WrapLogin = Form.create()(Login)
export default connect(
  state => ({user: state.user}),
  {getLogin}
)(WrapLogin)