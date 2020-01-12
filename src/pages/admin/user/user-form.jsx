/*
添加角色组件
*/
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { Form,Input,Select } from "antd"

const Item = Form.Item
const Option = Select.Option

class UserForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired, // 给父组件传递form对象
    roles: PropTypes.array.isRequired, // 角色列表
    user: PropTypes.object  // 更新用户标识
  }
  componentWillMount () {
    this.props.setForm(this.props.form)
  }
  render () {
    const {form,roles} = this.props
    const { getFieldDecorator } = form
    const user = this.props.user || {}
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    return (
      <Form {...formItemLayout}>
        <Item label='用户名' colon>
          {
            getFieldDecorator('username',{
              initialValue: user.username,
              rules: [
                {required: true,message: '用户名称必须指定'}
              ]
            })(
              <Input placeholder='请输入用户名称'/>
            )
          }
        </Item>
        {
          user._id ? null : (
            <Item label='密码' colon>
              {
                getFieldDecorator('password',{
                  initialValue: user.password,
                  rules: [
                    {required: true,message: '密码必须指定'}
                  ]
                })(
                  <Input type='password' placeholder='请输入密码'/>
                )
              }
            </Item>
          )
        }
        <Item label='手机号' colon>
          {
            getFieldDecorator('phone',{
              initialValue: user.phone,
              rules: [
                {required: true,message: '手机号必须指定'}
              ]
            })(
              <Input placeholder='请输入手机号'/>
            )
          }
        </Item>
        <Item label='邮箱' colon>
          {
            getFieldDecorator('email',{
              initialValue: user.email,
              rules: [
                {required: true,message: '邮箱必须指定'}
              ]
            })(
              <Input placeholder='请输入邮箱'/>
            )
          }
        </Item>
        <Item label='角色' colon>
          {
            getFieldDecorator('role_id',{
              initialValue: user.role_id,
              rules: [
                {required: true,message: '请选择角色'}
              ]
            })(
              <Select>
                {
                  roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UserForm)