/*
添加角色组件
*/
import React,{PureComponent} from 'react'
import PropTypes from 'prop-types'
import { Form,Input,Tree  } from "antd"

import menuList from '../../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree

export default class AuthForm extends PureComponent {
  static propTypes = {
    role: PropTypes.object
  }
  constructor (props) {
    super(props)

    const {menus} = this.props.role
    this.state = {checkedKeys: menus} // 选中权限节点数组
  }
  // 添加树节点
  addTreeNodes = (menuList) => {
    return menuList.reduce((pre,item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {
            item.children ? this.addTreeNodes(item.children) : null
          }
        </TreeNode>
      )
      return pre
    },[])
  }
  // 更新选中树节点
  updateMenus = checkedKeys => {
    this.setState({checkedKeys})
  }
  // 向父节点传递数据
  getMenus = () => this.state.checkedKeys
  componentWillMount () {
    // 添加树节点
    this.treeNode = this.addTreeNodes(menuList)
  }
  /**
   * 此生命周期函数只会在接收到新属性时调用，初次渲染不会调用
   * @param {最新的props} nextProps 
   */
  componentWillReceiveProps (nextProps) {
    const {menus} = nextProps.role
    this.setState({checkedKeys: menus})
    // this.state.checkedKeys = menus
  }
  render () {
    const {role} = this.props
    const {checkedKeys} = this.state
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    return (
      <div>
        <Item label='角色名称' colon {...formItemLayout}>
          <Input value={role.name} disabled/>
        </Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.updateMenus}
        >
          <TreeNode title="平台权限" key="all">
            {
              this.treeNode
            }
          </TreeNode>
        </Tree>
      </div>
    )
  }
}
