/*
角色管理路由
*/
import React,{Component} from 'react'
import {Card,Button,Table,Modal, message } from 'antd'

import { reqRoleList,reqAddRole,reqUpdateRole } from "../../../api"
import AddForm from './add-form'
import AuthForm from './auth-form'
import { PAGE_NUM,DEFAULT_PAGE_SIZE } from "../../../utils/constants"
import memoryUtils from '../../../utils/memoryUtils'
import {formateDate} from '../../../utils/dateUtls'
import storageLocal from '../../../utils/storageLocal'

export default class Role extends Component {
  state = {
    roles: [], // 角色列表
    role: {}, // 选中角色
    showAdd: false, // 是否显示添加对话框
    showAuth: false
  }
  constructor (props) {
    super(props)

    this.authForm = React.createRef()
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
  // 点击确定回调,发送请求添加角色(添加角色)
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
  // 点击取消回调(添加角色)
  handleShowAdd = () => {
    // 重置输入
    this.form.resetFields('roleName')
    // 隐藏添加对话框
    this.setState({showAdd: false})
  }
  // 点击确定回调,发送请求添加角色(设置权限)
  setAuth = async () => {
    const menus = this.authForm.current.getMenus()
    const {role} = this.state
    role.menus = menus
    role.auth_name = memoryUtils.user.username // 授权者
    role.auth_time = Date.now() // 授权时间
    // console.log(memoryUtils)
    this.setState({showAuth: false})
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      // 判断被修改权限的角色是当前角色，则强制退出
      const {_id} = result.data // 被修改角色_id
      const {role_id} = memoryUtils.user // 登录用户角色id
      if (_id === role_id) {
        message.error('当前用户角色权限已更改,请重新登录~~')
        // 清除保存的登录用户数据
        memoryUtils.user = {} // 内存
        storageLocal.removeUser() // 本地
        // 跳转到登录界面
        this.props.history.replace('/login')
      } else {
        message.success('角色权限设置成功')
        this.setState({
          roles: [...this.state.roles]
        })
      }
    } else {
      message.error('角色权限设置失败')
    }
  }
  // 点击取消回调(设置权限)
  handleShowAuth = () => {
    this.setState({showAuth: false})
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
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({showAuth: true})}>设置角色权限</Button>
      </span>
    )
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      }
    ]
    return (
      <Card title={title}>
        <Table 
          bordered
          rowKey='_id'
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onSelect: (role) => {
              this.setState({
                role
              })
            }
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
          onCancel={this.handleShowAdd}
        >
          <AddForm setForm={(form) => this.form = form}/>
        </Modal>
        <Modal
          title="设置角色权限"
          visible={this.state.showAuth}
          onOk={this.setAuth}
          onCancel={this.handleShowAuth}
        >
          <AuthForm role={role} ref={this.authForm}/>
        </Modal>
      </Card>
    )
  }
}