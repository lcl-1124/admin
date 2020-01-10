/*
角色管理路由
*/
import React,{Component} from 'react'
import {Card,Button,Table,Modal, message } from 'antd'

import { reqRoleList,reqAddRole } from "../../../api"
import AddForm from './add-form'
import { PAGE_NUM,DEFAULT_PAGE_SIZE } from "../../../utils/constants"

export default class Role extends Component {
  state = {
    roles: [], // 角色列表
    role: {}, // 选中角色
    showAdd: false, // 是否显示添加对话框
  }
  // 选中行
  onRow = (role) => {
    return {
      onClick: event => {
        // 获取当前被点击的角色行
        this.setState({role})
      }
    }
  }
  // 发送请求获取角色列表
  getRoles = async () => {
    const result = await reqRoleList()
    if (result.status === 0) {
      const roles = result.data
      this.setState({roles})
    }
  }
  // 点击确定回调,发送请求添加角色
  addCatgorys = () => {
    this.form.validateFields(async (err,value) => {
      if (!err) {
        const {roleName} = value
        // 重置输入
        this.form.resetFields('roleName')
        this.setState({showAdd: false})

        const result = await reqAddRole(roleName)
        if (result.status === 0) {
          message.success('添加成功')
          const role = result.data

          /*
          React不推荐使用
            let roles = [...this.state.roles]
            roles.push(role)
            this.setState({
              roles
            })
          */
          // 推荐使用
          this.setState(state => ({
            roles: [...state.roles, role]
          }))

        } else {
          message.error('添加成功')
        }
      }
    })
  }
  // 点击取消回调
  handleShowState = () => {
    // 重置输入
    this.form.resetFields('roleName')
    // 隐藏添加对话框
    this.setState({showAdd: false})
  }
  componentDidMount () {
    // 获取角色列表
    this.getRoles()
  }
  render () {
    const {roles,role} = this.state
    const title = (
      <span>
        <Button type='primary' style={{margin: '0 15px'}} onClick={() => this.setState({showAdd: true})}>添加角色</Button>
        <Button type='primary' disabled={!role._id}>设置角色权限</Button>
      </span>
    )
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time'
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time'
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      }
    ]
    return (
      <Card title={title}>
        <Table 
          rowKey='_id'
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
          }} 
          columns={columns} 
          dataSource={roles} 
          onRow={this.onRow}
          pagination={{
            defaultPageSize: PAGE_NUM,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: DEFAULT_PAGE_SIZE,
          }}
        />
        <Modal
          title="添加角色"
          visible={this.state.showAdd}
          onOk={this.addCatgorys}
          onCancel={this.handleShowState}
        >
          <AddForm setForm={(form) => this.form = form}/>
        </Modal>
      </Card>
    )
  }
}