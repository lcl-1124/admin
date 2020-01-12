/*
添加分类表单组件
*/
import React,{Component} from 'react'
import { Form,Input } from "antd"
import PropTypes from 'prop-types'

const Item = Form.Item

class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }
  componentWillMount () {
    // 调用函数将form对象传给父组件
    this.props.setForm(this.props.form)
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const {categoryName} = this.props
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName',{
              initialValue: categoryName,
              rules: [
                {required: true,message: '分类名称必须输入'}
              ]
            })(
              <Input placeholder='请输入更新分类名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateForm)