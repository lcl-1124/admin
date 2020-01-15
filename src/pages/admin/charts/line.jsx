/*
折线图路由
*/
import React from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

export default class Line extends React.Component {
  state = {
    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"], // 货品
    scales: [5, 20, 36, 10, 10, 20], // 销量
    stores: [15, 30, 46, 20, 20, 40] // 库存
  }
  // 更新option
  updateOption = () => {
    let {data,stores} = this.state
    var scales = []
    for (let i = 0; i < data.length; i++) {
      let scale = Math.round(Math.random()*100)
      scales.push(scale)
    }
    stores = stores.reduce((pre,store) => {
      if (store%2) {
        store = store + 10
      } else {
        store = store - 10
      }
      
      if ( store <= 0 || store >= 100 ) {
        store = Math.round(Math.random()*100)
      }
      pre.push(store)
      return pre
    },[])
    
    this.setState({
      scales,
      stores: [...stores]
    })
  }
  // 获取option
  getOption = (data,scales,stores) => {
    return {
      title: {
        show: true,
        text: '货品天销售/库存量'
      },
      legend: {},
      tooltip: {},
      xAxis: {
        type: 'category',
        data: data
      },
      yAxis: {
        type: 'value'
      },
      series: [
          {
            name: '销量',
            type: 'line',
            data: scales
          },
          {
            name: '库存',
            type: 'line',
            data: stores
          }
      ]
    }
  }
  render () {
    const {data,scales,stores} = this.state
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.updateOption}>更新</Button>
        </Card>
        <Card>
          <ReactEcharts option={this.getOption(data,scales,stores)} style={{height: 700}}/>
        </Card>
      </div>
    )
  }
}