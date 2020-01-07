/*
管理路由组件
*/
import React,{Component} from 'react'
import { Form, Icon, Input, Button ,message} from 'antd';

import "./login.less";
import logo from '../../assets/images/adminLogo.png'
import {reqLogin} from "../../api";
import memoryUtils from '../../utils/memoryUtils'
import storageLocal from '../../utils/storageLocal'
import { Redirect } from 'react-router';

class Login extends Component {

  handleSubmit = (event) => {
    // 阻止事件默认行为
    event.preventDefault();

    // 提交前统一验证
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('验证成功', values);
        // 发送ajax请求
        const {username,password} = values
        const result = await reqLogin({username,password})
        if (result.status === 0) { // 登录成功
          message.success('登录成功')
          const user = result.data;
          // 保存到内存中
          memoryUtils.user = user;
          // 保存到本地
          storageLocal.saveUser(user)
          // 跳转到管理界面(不需要再回退回来)
          this.props.history.replace('/')
          // console.log(memoryUtils.user)
        } else { // 登录失败
          message.error('登录失败')
        }
      } else {
        console.log('验证失败')
      }
    });
    // 得到from对象
    // const form = this.props.form;
    // // 拿到输入数据
    // const values = form.getFieldsValue();
    // console.log(values)
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
    
    const user = memoryUtils.user;
    if (user._id) {
      return <Redirect to='/'/>
    }

    const form = this.props.form;
    const { getFieldDecorator } = form;
    return (
      <div className="loginContainer">
        <header className="loginHeader">
          <img src={logo} alt="logo"/>
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="loginContent">
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
export default WrapLogin