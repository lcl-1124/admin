/*
用户管理路由
*/
import React,{PureComponent} from 'react'
import {Card,Button,Table,Modal, message} from 'antd'

import {reqUserList,reqAddOrUpdateUser, reqDeleteUser} from '../../../api'
import { formateDate } from '../../../utils/dateUtls'
import UserForm from './user-form'
import LinkButton from '../../../components/linkButton'
import { PAGE_NUM } from '../../../utils/constants'

export default class User extends PureComponent {
  state = {
    users: [], // 用户列表
    roles: [], // 角色列表
    isShow: false, // 是否显示创建/修改用户对话框 
  }
  // 获取列配置
  getColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdateUser(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.delateUser(user)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }
  // 显示添加用户
  showAddUser = () => {
    this.user = null
    this.setState({isShow: true})
  }
  // 显示修改用户
  showUpdateUser = (user) => {
    this.user = user
    this.setState({isShow: true})
  }  
  // 发送请求获取用户列表
  getUsers = async () => {
    const result = await reqUserList()
    if (result.status === 0) {
      message.success('获取用户列表成功')
      const {users,roles} = result.data
      // 获取角色名称
      this.initRoleName(roles)
      this.setState({users,roles})
    } else {
      message.error('获取用户列表失败')
    }
  }
  // 根据roles获取一个包含角色名称对象
  initRoleName = (roles) => {
    this.roleNames = roles.reduce((pre,role) => {
      pre[role._id] = role.name
      return pre
    },{})
  }
  // 点击确认回调，发送请求创建/修改用户 
  creatUser = () => {
    // 拿到数据
    this.form.validateFields(async (err,value) => {
      if (!err) {
        // 清除输入
        this.form.resetFields()
        // 关闭对话框
        this.setState({isShow: false})
        // console.log(value)
        if (this.user) { // 更新
          value._id = this.user._id
        }
        // 发送请求
        const result = await reqAddOrUpdateUser(value)
        
        if (result.status === 0) {
          message.success('添加用户成功')
          this.getUsers()
        } else {
          message.error('添加用户失败')
        }
      }
    })
  }
  // 点击确认回调，发送请求删除用户 
  delateUser = (user) => {
    Modal.confirm({
      content: `确认删除${user.username}么？`,
      onOk: async () => {
        // 发送请求
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success('删除用户成功')
          this.getUsers()
        }
      },
      onCancel: () => {
        message.success('删除用户取消')
      },
    })
  }
  componentWillMount () {
    this.getColumns()
  }
  componentDidMount () {
    // 获取用户列表
    this.getUsers()
  }
  render () {
    const {user} = this
    const {users,roles,isShow} = this.state
    const title = (
      <Button type='primary' onClick={this.showAddUser}>创建用户</Button>
    )
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{pageSize: PAGE_NUM,showQuickJumper: true}}
      />
        <Modal
          title={user?"修改用户":"创建用户"}
          visible={isShow}
          onOk={this.creatUser}
          onCancel={() => {
            this.form.resetFields()
            this.setState({isShow: false})
          }}
        >
          <UserForm setForm={form => this.form = form} roles={roles} user={user}/>
        </Modal>
      </Card>
    )
  }
}