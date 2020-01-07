/*
品类管理路由
*/
import React,{Component} from 'react'
import { Card,Table,Icon, Button, message } from 'antd';

import LinkButton from '../../../components/linkButton'
import { reqCategoryList,reqCategoryAdd,reqUpdateCategory } from "../../../api";

export default class Category extends Component {
  state = {
    loading: false, // 是否在加载
    categorys: [], // 分类列表
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
        render: () => ( // 返回需要显示的界面标签
          <span>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </span>
        )
      }
    ];
  }
  /*
  获取一级分类列表
  */
  getCategoryList = async () => {
    this.setState({loading: true})
    const result = await reqCategoryList('0');
    console.log(result)
    this.setState({loading: false})
    if (result.status === 0) {
      const categorys = result.data;
      this.setState({categorys})
    } else {
      message.error('获取分类列表失败')
    }
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
    this.getCategoryList()
  }
  render () {
    const title = '天使鹤希';
    const extra = <Button type='primary'><Icon type='plus'></Icon>添加</Button>
    const {categorys,loading} = this.state;
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table 
            dataSource={categorys} 
            columns={this.columns} 
            loading={loading}
            pagination={{defaultPageSize: 10,showQuickJumper: true}}
            bordered 
            rowKey='_id'
          />
        </Card>
      </div>
    )
  }
}