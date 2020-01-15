/*
商品home组件
*/
import React,{Component} from 'react'
import {Card, Select, Icon, Button, Input, Table} from 'antd'

import LinkButton from '../../../components/linkButton'
import { reqProductList,reqSearchProduct,reqUpdateStatusProduct } from "../../../api"
import {PAGE_NUM} from '../../../utils/constants'
import memoryUtils from '../../../utils/memoryUtils'

const Option = Select.Option;

export default class ProductHome extends Component {
  state = {
    loading: false, // 是否正在加载
    total: 0, // 商品总数
    products: [], // 商品数组
    searchName: '', // 搜索关键字
    productType: 'productName' // 搜索依据类型
  }
  /*
  配置商品
  */
  setColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price,
      },
      {
        title: '状态',
        width: 200,
        render: (product) => {
          const {status,_id} = product
          return (<span style={{marginLeft: 15}}>
            {status===1? '在售' : '已下架'} 
            <Button 
              type='primary'  
              style={{marginLeft: 30}}
              onClick={() => this.updateStatus(_id,status===1 ? 2 : 1)}
            >
              {status===1? '下架' : '上架'} 
            </Button>
          </span>)  
        },
      },
      {
        title: '操作',
        width: 100,
        render: (product) => (
          <span>
            <LinkButton onClick={() => this.showDetail(product)}>详情</LinkButton>
            <LinkButton onClick={() => this.showUpdate(product)}>修改</LinkButton>
          </span>
        ),
      },
    ];
  }
  /*
  获取商品列表
  */
  getProducts = async (pageNum) => {
    // 将当前页码保存到this中，让其他函数也可以看到
    this.pageNum = pageNum;
    const {searchName,productType} = this.state;
    // 发送请求获取数据
    this.setState({loading: true})
    let result;
    if (searchName) {
      result = await reqSearchProduct({pageNum,pageSize: PAGE_NUM,searchName,productType});
    } else {
      result = await reqProductList(pageNum,PAGE_NUM);
    }
    this.setState({loading: false})
    if (result.status === 0) {
      const {total,list} = result.data;
      this.setState({
        total,
        products: list
      })
    }
  }
  /*
  更新商品状态
  */
  updateStatus = async (_id,status) => {
    const result = await reqUpdateStatusProduct(_id,status)
    if (result.status === 0) {
      this.getProducts(this.pageNum)
    }
  }
  /*
  显示商品详情页
  */
  showDetail = (product) => {
    // 将商品数据储存到内存
    memoryUtils.product = product
    // 跳转到商品详情页(HashRouter)
    this.props.history.push('/product/detail')
  }
  /*
  显示商品修改页
  */
  showUpdate = (product) => {
    // 将商品数据储存到内存
    memoryUtils.product = product
    // 跳转到商品修改页(HashRouter)
    this.props.history.push('/product/addUpdate')
  }
  componentWillMount () {
    this.setColumns()
  }
  componentDidMount () {
    this.getProducts(1)
  }
  render () {
    const {total,products,loading,searchName,productType} = this.state;
    const title = (
      <div>
        <Select 
          value={productType} 
          style={{width: 150}}
          onChange={value => this.setState({productType:value})}
        >
          <Option value='productName'>按名称查询</Option>
          <Option value='productDesc'>按描述查询</Option>
        </Select>
        <Input 
          placeholder='关键字' 
          style={{margin: '0 15px',width: 200}} 
          value={searchName}
          onChange={e => this.setState({searchName:e.target.value})}
        />
        <Button type='primary' onClick={() => {this.getProducts(1)}}>查询</Button>
      </div>
    )
    const extra = (
      <span>
        <Button type='primary' onClick={() => this.props.history.push('/product/addUpdate')}>
          <Icon type='plus'></Icon>
          添加商品
        </Button>
      </span>
    )
    return (
      <Card title={title} extra={extra}>
        <Table 
          bordered
          loading={loading}
          pagination={{
            total,
            current: this.pageNum, // 可以确保搜索完成后分页器在第一页
            defaultPageSize:PAGE_NUM,
            showQuickJumper:true,
            onChange: this.getProducts
          }}
          rowKey='_id'
          dataSource={products} 
          columns={this.columns} 
        />
      </Card>
    )
  }
}