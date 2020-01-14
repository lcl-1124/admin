/*
首页路由
*/
import React,{Component} from 'react'
import { Statistic, Card, Icon } from 'antd'

export default class Home extends Component {
  render () {
    const title = (
      <Card size="small" title="商品总量" extra={<Icon type="smile" theme="twoTone" />} style={{ width: 260 ,height: 200,boxSizing: "border-box",padding: 20}}>
        <Statistic 
          value={112893256}  
          valueStyle={{ color: '#000', fontSize: 28}}
          suffix='个'
        />
        <Statistic
          value={10 + "%"}
          valueStyle={{ color: '#000' , fontSize: 15,opacity:.6}}
          prefix='日同比'
          suffix={<Icon type="fall" />}
        />
        <Statistic
          value={ 15 + "%"}
          valueStyle={{ color: '#000', fontSize: 15,margin: '10px 0',opacity:.6}}
          prefix='周同比'
          suffix={<Icon type="rise" />}
        />
      </Card>
    )
    const extra = (
      <div></div>
    )
    return (
      <div className='home'>
        <Card title={title} extra={extra}>
          
        </Card>
      </div>
    )
  }
}