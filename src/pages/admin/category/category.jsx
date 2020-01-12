/*
品类管理路由
*/
import React,{Component} from 'react'
import { Card,Table,Icon, Button, message,Modal } from 'antd';

import AddForm from './add-form'
import UpdateForm from './update-form'
import LinkButton from '../../../components/linkButton'
import { reqCategoryList,reqCategoryAdd,reqUpdateCategory } from "../../../api";
import { PAGE_NUM,DEFAULT_PAGE_SIZE } from "../../../utils/constants"


export default class Category extends Component {
  state = {
    loading: false, // 是否在加载
    categorys: [], // 一级分类列表
    subCategorys: [], // 二级分类列表
    parentId: '0', // 父级分类_id
    parentName: '', // 父级分类名称
    showState: 0, // 是否显示对话框 0：不显示 1：显示添加对话框 2：显示更新对话框
  }
  /*
  设置表格列配置
  */
  handleColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name', // 指定显示数据对应的属性名
      },
      {
        title: '操作',
        width: 400,
        render: (category) => ( // 返回需要显示的界面标签
          <span>
            <LinkButton onClick={() => this.showUpdateCatgorys(category)}>修改分类</LinkButton>
            {
            /*解决react在绑定事件回调函数里传入形参问题，在绑定监听外在包一层匿名函数*/
            this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null
            }
          </span>
        )
      }
    ];
  }
  /*
  显示二级分类列表
  */
  showSubCategorys = (category) => {
    /*
    修改parentId和拿到parentName
      this.setState()异步修改状态
        它的第二个参数是一个回调函数，在数据更新和render()后被调用
    */ 
    this.setState({
      parentId: category._id,
      parentName: category.name
    },() => {
      // 获取二级分类列表
      this.getCategoryList()
      // console.log('回调函数中' + this.state.parentId) // 当前点击的父级分类的_id
    })
    // console.log('回调函数外' + this.state.parentId) // '0'
  }
  /*
  显示一级分类列表
  */
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }
  /*
  获取一级/二级分类列表
  */
  getCategoryList = async (parentId) => {

    this.setState({loading: true})

    parentId = parentId ||　this.state.parentId;
    const result = await reqCategoryList(parentId);

    this.setState({loading: false})

    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === '0') {
        // 更新一级分类列表
        this.setState({categorys})
      } else {
        // 更新二级分类列表
        this.setState({subCategorys:categorys})
      }
    } else {
      message.error('获取分类列表失败')
    }
  }
  /*
  关闭对话框
  */
  handleShowState = () => {
    // 清除输入缓存
    this.form.resetFields()
    // 关闭对话框
    this.setState({showState: 0})
  }
  /*
  显示添加分类对话框
  */
  showAddCatgorys = () => {
    this.setState({showState: 1})
  }
  /*
  显示更新分类对话框
  */
  showUpdateCatgorys = (category) => {
    this.category = category;
    this.setState({showState: 2})
  }
  /*
  修改分类
  */
  updateCatgorys = () => {
    this.form.validateFields(async (err,value) => {
      if (!err) {
        // 拿到请求参数数据
        const categoryId = this.category._id;
        const {categoryName} = value;
        // 清除输入缓存
        this.form.resetFields()
        // 修改状态，取消对话框
        this.setState({showState: 0})
        // 发送异步修改分类请求
        const result = await reqUpdateCategory({categoryId,categoryName})
        if (result.status === 0) {
          message.success('修改分类成功')
          // 重新获取列表渲染页面
          this.getCategoryList()
        } else {
          message.error('修改分类失败')
        }
      }
    })
  }
  /*
  添加分类
  */
  addCatgorys = () => {
    this.form.validateFields(async (err,value) => {
      if (!err) {
        // 获取请求参数
        const {parentId,categoryName} = value;
        // 清除输入数据
        this.form.resetFields()
        // 隐藏对话框
        this.setState({showState: 0})
        // 发送异步添加请求
        const result = await reqCategoryAdd({parentId,categoryName})
        if (result.status === 0) {
          message.success('添加分类成功')
          if (parentId === this.state.parentId) { // 添加的分类就是当前分类
            // 重新获取分类列表
            this.getCategoryList()
          } else if(parentId === '0') {  // 在二级分类添加一级分类，需要更新但不需要显示
            this.getCategoryList('0')
          }
        } else {
          message.error('添加分类失败')
        }
      }
    })
  }
  /*
  为第一次渲染做准备
  */
  componentWillMount () {
    this.handleColumns()
  }
  /*
  发送异步请求或者定时器
  */
  componentDidMount () {
    // 获取一级分类列表
    this.getCategoryList()
  }
  render () {
    const {categorys,loading,subCategorys,parentName,parentId} = this.state;
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{marginRight: 15,marginLeft: 15}}/>
        <span>{parentName}</span>
      </span>
    ); 
    const extra = <Button type='primary' onClick={this.showAddCatgorys}>
                    <Icon type='plus'></Icon>
                    添加分类
                  </Button>
    const category = this.category ||　{};
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table 
            dataSource={parentId === '0' ? categorys : subCategorys} 
            columns={this.columns} 
            loading={loading}
            pagination={{defaultPageSize: PAGE_NUM,showQuickJumper: true,showSizeChanger: true,pageSizeOptions: DEFAULT_PAGE_SIZE}}
            bordered 
            rowKey='_id'
          />

        <Modal
          title="添加分类"
          visible={this.state.showState === 1}
          onOk={this.addCatgorys}
          onCancel={this.handleShowState}
        >
          <AddForm categorys={categorys} parentId={parentId} setForm={(form) => this.form = form}/>
        </Modal>

        <Modal
          title="更新分类"
          visible={this.state.showState === 2}
          onOk={this.updateCatgorys}
          onCancel={this.handleShowState}
        >
          <UpdateForm categoryName={category.name} setForm={(form) => this.form = form}/>
        </Modal>
        </Card>
      </div>
    )
  }
}