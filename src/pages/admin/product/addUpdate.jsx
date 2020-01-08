/*
商品添加更新组件
*/
import React,{Component} from 'react'
import {
  Card,
  Icon,
  Input,
  Form,
  Button,
  Upload, // 上传
  Cascader // 级联选择
} from 'antd'
import LinkButton from '../../../components/linkButton'
import './addUpdate.less'
const {Item} = Form;
const { TextArea } = Input;
export default class ProductAddUpdate extends Component {
  render () {
    const title = (
      <span>
        <LinkButton>
          <Icon 
            type='arrow-left' 
            style={{fontSize: 25,marginRight: 15}}
            onClick={() => this.props.history.push('/product')}  
          />
        </LinkButton>
        <span style={{fontSize: 25,fontWeight: 400}}>添加商品</span>
      </span>
    )
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    }
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ]
    const uploadButton = (
      <div>
        <Icon type='plus' style={{fontSize: 30}}/>
        <div className="ant-upload-text">上传图片</div>
      </div>
    )
    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label="商品名称" colon>
            <Input placeholder='请输入商品名称'/>
          </Item>
          <Item label="商品描述" colon>
            <TextArea
              placeholder="请输入商品描述"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Item>
          <Item label="商品价格" colon>
            <Input placeholder='请输入商品价格' addonAfter="元"/>
          </Item>
          <Item label="商品分类" colon>
            <Cascader options={options} placeholder="请选择商品分类" />
          </Item>
          <Item label="上传图片" colon>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              {uploadButton}
            </Upload>
          </Item>
          <Item>
            <Button type='primary' style={{marginLeft: 70}}>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}