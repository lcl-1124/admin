/*
商品详情组件
*/
import React,{Component} from 'react'
import {Card,List,Icon} from 'antd'

import './detail.less'
import LinkButton from '../../../components/linkButton'
import { reqCategoryInfo } from "../../../api";
import {BASE_IMG_URL} from '../../../utils/constants' 
import memoryUtils from '../../../utils/memoryUtils'
const Item = List.Item;

export default class ProductDetail extends Component {
  state = {
    pName: '', // 一级分类名称
    cName: '', // 二级分类名称
  }
  componentWillMount () {
    const {product} = memoryUtils
    this.product = product
  }
  async componentDidMount () {
    if (!this.product._id) {
      this.props.history.replace('/product')
      return
    }
    const {categoryId,pCategoryId} = this.product;
    if (pCategoryId === '0') { // 一级分类下的商品
      const result = await reqCategoryInfo(categoryId)
      if (result.status === 0) {
        this.setState({pName: result.data.name})
      }
    } else { // 二级分类下的商品
      const results = await Promise.all([reqCategoryInfo(pCategoryId),reqCategoryInfo(categoryId)])
      const pName = results[0].data.name
      const cName = results[1].data.name
      this.setState({pName,cName})
    }
  }
  render () {
    const {name,desc,price,detail,imgs} = this.product;
    const {pName,cName} = this.state;
    const title = (
      <span>
        <LinkButton>
          <Icon 
            type="arrow-left" 
            style={{marginRight: 15,fontSize:25}}
            onClick={() => {this.props.history.push('/product')}}
          />
        </LinkButton>
        <span style={{fontWeight: 400,fontSize: 23}}>商品详情</span>
      </span>
    )
    return (
      <Card title={title} bordered={false} className="detailCotainer">
        <List>
          <Item>
            <h2 className='left'>商品名称:</h2>
            <p className='right'>{name}</p>
          </Item>
          <Item>
            <h2 className='left'>商品描述:</h2>
            <p className='right'>{desc}</p>
          </Item>
          <Item>
            <h2 className='left'>商品价格:</h2>
            <p className='right'>{price}</p>
          </Item>
          <Item>
            <h2 className='left'>所属分类:</h2>
            <p className='right'>{pName} {cName!==''?'--->':''} {cName}</p>
          </Item>
          <Item>
            <h2 className='left'>商品图片:</h2>
            <p className='right'>
              {
                imgs? imgs.map(img => (
                  <img 
                  key={img}
                    src={BASE_IMG_URL + img}
                    alt="img"
                    className="img"
                  />
                )) : ''
              }
              
            </p>
          </Item>
          <Item>
            <h2 className='left'>商品详情:</h2>
            <p className='right' dangerouslySetInnerHTML={{__html: detail}}></p>
          </Item>
        </List>
      </Card>
    )
  }
}
