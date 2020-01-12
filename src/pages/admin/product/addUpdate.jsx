/*
商品添加更新组件
  1.子组件调用父组件方法：将父组件方法以函数属性的形式传递给自组件进行调用
  2.父组件调用子组件方法：在父组件中通过ref得到子组件标签对象(也就是组件对象)，调用其方法
*/
import React,{PureComponent,} from 'react'
import {
  Card,
  Icon,
  Input,
  Form,
  Button,
  Cascader, // 级联选择
  message
} from 'antd'

import PicturesWall from './picturesWall'
import RichTextEditor from './rich-text-editor'
import LinkButton from '../../../components/linkButton'
import { reqCategoryList,reqUpdateProduct,reqAddProduct } from "../../../api"

const {Item} = Form
const { TextArea } = Input


class ProductAddUpdate extends PureComponent {

  state = {
    options: [],
  }

  constructor (props) {
    super(props)

    // 创建refs
    this.pw = React.createRef()
    this.editor = React.createRef()
  }
  /*
  提交表单
  */
  submit = () => {
    // 进行总体表单验证
    this.props.form.validateFields(async (err,value) => {
      if (!err) {
        // 请求参数：{_id,categoryId,pCategoryId,name,desc,price,detail,imgs}
        // 访问refs
        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()
        // console.log(imgs,detail,value)
        const {name,desc,price,categoryIds} = value
        let categoryId
        let pCategoryId
        if (value.categoryIds.length === 1) { // 一级列表
          categoryId = categoryIds[0]
          pCategoryId = '0'
        } else { // 二级列表
          categoryId = categoryIds[1]
          pCategoryId = categoryIds[0]
        }
        const productInfo = {categoryId,pCategoryId,name,desc,price,imgs,detail} 
        let result
        if (this.isUpdate) { // 更新商品
          const {_id} = this.product
          productInfo._id = _id
          result = await reqUpdateProduct(productInfo)
        } else { // 添加商品
          result = await reqAddProduct(productInfo)
        }
        if (result.status === 0) {
          message.success(`${this.isUpdate ? '更新' : '添加'}成功`)
        } else {
          message.error(`${this.isUpdate ? '更新' : '添加'}失败`)
        }
      }
    })
  }
  /*
  自定义表单验证
  */
  validatorPrice = (rule,value,callback) => {
    // console.log(value,typeof value)
    if (value*1 > 0) { // 验证通过
      callback()
    } else {
      callback('价格指定必须大于0')
    }
  }
  /*
  初始化options
  */
  initOptions = async (categorys) => {
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }))

    const {isUpdate,product} = this
    const {pCategoryId} = product
    if (isUpdate && pCategoryId !== '0') { // 有二级分类
      // 发送请求获取二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId)
      // 得到二级分类列表
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))

      // 拿到当前二级分类的父级分类,通过数组的find()
      const targetOption = options.find(option => option.value === pCategoryId)

      // 将二级分类添加到父级分类上
      targetOption.children = childOptions
    }

    this.setState({
      options,
    })
  }
  /*
  获取一级/二级分类列表
    async函数返回的是一个promise对象，这个promise对象的结果和值取决于async的返回值
  */
  getCategorys = async (parentId) => {
    const result = await reqCategoryList(parentId)
    if (result.status === 0) {
      const categorys = result.data
      // 判断获取的是几级列表
      if (parentId === '0') { // 一级列表
        this.initOptions(categorys)
      } else { // 二级列表
        return categorys
      }
    } else {
      message.error('获取分类失败')
    }
  }
  /*
  加载叶子，动态获取分类列表
  */
  loadData = async selectedOptions => {
    // 获取父级分类项
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    // 发送请求获取二级列表
    const cCategorys = await this.getCategorys(targetOption.value)
    targetOption.loading = false
    // 判断是否获取到cCategorys并且cCategorys是否有值
    if (cCategorys && cCategorys.length > 0) {
      targetOption.children = cCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))
    } else {
      targetOption.isLeaf = true
    }

    // 更新状态
    this.setState({
      options: [...this.state.options],
    })
  }
  componentWillMount () {
    // 判断是否是修改商品
    if (this.props.location.state) {
      var {product} = this.props.location.state
    }
    this.isUpdate = !!product  // 是否是更新商品 强制转换布尔值
    this.product = product || {}
}
  componentDidMount () {
    // 获取分类列表
    this.getCategorys('0')
  }
  render () {
    const {isUpdate,product} = this
    const {categoryId,pCategoryId,imgs,detail} = product
    // console.log(product)
    // 存放商品分类的数组
    const categoryIds = []
    if (isUpdate) {
      if (pCategoryId === '0') {
        categoryIds.push(categoryId)
      } else {
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }
    
    const title = (
      <span>
        <LinkButton>
          <Icon 
            type='arrow-left' 
            style={{fontSize: 25,marginRight: 15}}
            onClick={() => this.props.history.push('/product')}  
          />
        </LinkButton>
        <span style={{fontSize: 25,fontWeight: 400}}>{isUpdate? '修改商品' : '添加商品'}</span>
      </span>
    )
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    }
    const {getFieldDecorator} = this.props.form
    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label="商品名称" colon>
            {
              getFieldDecorator('name',{
                initialValue: product.name,
                rules: [
                  {required: true,message: '商品名称必须输入'}
                ]
              })(
                <Input placeholder='请输入商品名称'/>
              )
            }
          </Item>
          <Item label="商品描述" colon>
            {
              getFieldDecorator('desc',{
                initialValue: product.desc,
                rules: [
                  {required: true,message: '商品描述必须输入'}
                ]
              })(
                <TextArea
                  placeholder="请输入商品描述"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              )
            }
          </Item>
          <Item label="商品价格" colon>
            {
              getFieldDecorator('price',{
                initialValue: product.price,
                rules: [
                  {required: true,message: '商品价格必须输入'},
                  {validator: this.validatorPrice}
                ] 
              })(
                <Input placeholder='请输入商品价格' addonAfter="元"/>
              )
            }
          </Item>
          <Item label="商品分类" colon>
            {
              getFieldDecorator('categoryIds',{
                initialValue: categoryIds,
                rules: [
                  {required: true,message: '商品分类必指定入'},
                ] 
              })(
                <Cascader
                  options={this.state.options}
                  loadData={this.loadData}
                  placeholder="请选择商品分类"
                />
              )
            }
          </Item>
          <Item label="上传图片" colon>
            <PicturesWall ref={this.pw} imgs={imgs}/>
          </Item>
          <Item label="商品详情" colon labelCol={{span: 2}} wrapperCol={{span: 20}}>
            <RichTextEditor ref={this.editor} detail={detail}/>
          </Item>
          <Item>
            <Button 
              type='primary' 
              style={{marginLeft: 70}} 
              onClick={this.submit}
            >提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)
