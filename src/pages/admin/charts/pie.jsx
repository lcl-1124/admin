/*
饼图路由
*/
import React from 'react'
import {Card,Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

export default class Pie extends React.Component {
  state = {
    scales: [
      {value: 335, name: '衬衫'},
      {value: 310, name: '羊毛衫'},
      {value: 274, name: '雪纺衫'},
      {value: 235, name: '裤子'},
      {value: 400, name: '高跟鞋'},
      {value: 400, name: '袜子'}
    ], // 单货销售总量列表
    stores: [
      {value: 335, name: '衬衫'},
      {value: 310, name: '羊毛衫'},
      {value: 274, name: '雪纺衫'},
      {value: 235, name: '裤子'},
      {value: 400, name: '高跟鞋'},
      {value: 400, name: '袜子'}
    ], // 单货库存总量列表
  }
  // 更新数据
  updateData = () => {
    let {scales,stores} = this.state

    scales = scales.map(scale => {
      scale.value = Math.round(Math.random()*520+80)
      return scale
    })

    stores = stores.reduce((pre,store) => {
      console.log('math前',store.value)
      store.value = Math.round(Math.random()*520+80)
      console.log('math后',store.value,store)
      pre.push(store)
      return pre
    },[])

    this.setState((state) => {
      return {
        scales: state.scales,
        stores: state.stores
      }
    })
  }
  // 获取option1
  getScalesOption = (scales) => {
    return {
      backgroundColor: '#2c343c',
  
      title: {
          text: '货品总销售比例',
          left: 'center',
          top: 20,
          textStyle: {
              color: '#ccc'
          }
      },
  
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
  
      visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
              colorLightness: [0, 1]
          }
      },
      series: [
          {
              name: '货品总销售比例',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: scales.sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                  color: 'rgba(255, 255, 255, 0.3)'
              },
              labelLine: {
                  lineStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
              },
              itemStyle: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
  
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                  return Math.random() * 200;
              }
          }
      ]
    }
  }
  // 获取option2
  getStoresOption2 = (stores) => {
    return {
      title: {
          text: '货品总库存比例',
          subtext: '纯属虚构',
          left: 'center'
      },
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
          orient: 'vertical',
          left: 'left',
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
      },
      series: [
          {
              name: '货品总库存比例',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: stores,
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                  return Math.random() * 200;
              }
          }
      ]
    }
  }
  render () {
    const {scales,stores} = this.state
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.updateData}>更新</Button>
        </Card>
        <Card>
          <ReactEcharts option={this.getScalesOption(scales)} style={{height: 385}}/>
        </Card>
        <Card>
          <ReactEcharts option={this.getStoresOption2(stores)} style={{height: 385}}/>
        </Card>
      </div>
    )
  }
}