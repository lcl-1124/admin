/*
添加分类表单组件
*/
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { Form,Select,Input } from "antd";

const Item = Form.Item;
const Option = Select.Option;

class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired, // 给父组件传递form对象
    categorys: PropTypes.array.isRequired, // 一级分类列表
    parentId: PropTypes.string.isRequired // 父级分类id
  }
  componentWillMount () {
    this.props.setForm(this.props.form)
  }
  render () {
    const {categorys,parentId} = this.props;
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('parentId',{
              initialValue: parentId
            })(
              <Select>
                <Option value='0'>一级分类列表</Option>
                {
                  categorys.map((category,index) => <Option value={category._id} key={index}>{category.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
        <Item>
          {
            getFieldDecorator('categoryName',{
              initialValue: '',
              rules: [
                {required: true,message: '分类名称必须指定'}
              ]
            })(
              <Input placeholder='请输入分类名称'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)