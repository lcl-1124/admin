/*
首页路由
*/
import React,{Component} from 'react'
import { 
  Statistic,
  Card,
  Icon,
  Tabs,
  DatePicker,
  Row,
  Col,
  Timeline 
} from 'antd'
import moment from 'moment'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts"

const { TabPane } = Tabs
const { RangePicker } = DatePicker

export default class Home extends Component {
  render () {
    const title = (
      <Card 
        size="small" 
        title="商品总量" 
        extra={<Icon type="smile" theme="twoTone" />} 
        style={{ width: 300 ,height: 220,boxSizing: "border-box",padding: 20}}
      >
        <Statistic 
          value={112893256}  
          valueStyle={{ color: '#000', fontSize: 28}}
          suffix='个'
        />
        <Statistic
          value={ 15 + "%"}
          valueStyle={{ color: '#cf1322', fontSize: 15,margin: '10px 0',opaproduct:.6}}
          prefix='周同比'
          suffix={<Icon type="rise" />}
        />
        <Statistic
          value={10 + "%"}
          valueStyle={{ color: '#3f8600' , fontSize: 15,opaproduct:.6}}
          prefix='日同比'
          suffix={<Icon type="fall" />}
        />
      </Card>
    )
    const data = [
      {
        month: "Jan",
        product: "A货品",
        sales: 7
      },
      {
        month: "Jan",
        product: "B货品",
        sales: 3.9
      },
      {
        month: "Jan",
        product: "C货品",
        sales: 4
      },
      {
        month: "Feb",
        product: "A货品",
        sales: 6.9
      },
      {
        month: "Feb",
        product: "B货品",
        sales: 4.2
      },
      {
        month: "Feb",
        product: "C货品",
        sales: 5.3
      },
      {
        month: "Mar",
        product: "A货品",
        sales: 9.5
      },
      {
        month: "Mar",
        product: "B货品",
        sales: 5.7
      },
      {
        month: "Mar",
        product: "C货品",
        sales: 3.1
      },
      {
        month: "Apr",
        product: "A货品",
        sales: 14.5
      },
      {
        month: "Apr",
        product: "B货品",
        sales: 8.5
      },
      {
        month: "Apr",
        product: "C货品",
        sales: 3.6
      },
      {
        month: "May",
        product: "A货品",
        sales: 18.4
      },
      {
        month: "May",
        product: "B货品",
        sales: 11.9
      },
      {
        month: "May",
        product: "C货品",
        sales: 25.3
      },
      {
        month: "Jun",
        product: "A货品",
        sales: 21.5
      },
      {
        month: "Jun",
        product: "B货品",
        sales: 15.2
      },
      {
        month: "Jun",
        product: "C货品",
        sales: 16.4
      },
      {
        month: "Jul",
        product: "A货品",
        sales: 25.2
      },
      {
        month: "Jul",
        product: "B货品",
        sales: 17
      },
      {
        month: "Jul",
        product: "C货品",
        sales: 36.9
      },
      {
        month: "Aug",
        product: "A货品",
        sales: 26.5
      },
      {
        month: "Aug",
        product: "B货品",
        sales: 16.6
      },
      {
        month: "Aug",
        product: "C货品",
        sales: 40
      },
      {
        month: "Sep",
        product: "A货品",
        sales: 23.3
      },
      {
        month: "Sep",
        product: "B货品",
        sales: 14.2
      },
      {
        month: "Sep",
        product: "C货品",
        sales: 31.2
      },
      {
        month: "Oct",
        product: "A货品",
        sales: 18.3
      },
      {
        month: "Oct",
        product: "B货品",
        sales: 10.3
      },
      {
        month: "Oct",
        product: "C货品",
        sales: 27.9
      },
      {
        month: "Nov",
        product: "A货品",
        sales: 13.9
      },
      {
        month: "Nov",
        product: "B货品",
        sales: 6.6
      },
      {
        month: "Nov",
        product: "C货品",
        sales: 21.8
      },
      {
        month: "Dec",
        product: "A货品",
        sales: 9.6
      },
      {
        month: "Dec",
        product: "B货品",
        sales: 4.8
      },
      {
        month: "Dec",
        product: "C货品",
        sales: 16.9
      }
    ]
    const monthData = [
      {
        month: "1 月",
        sales: 38
      },
      {
        month: "2 月",
        sales: 52
      },
      {
        month: "3 月",
        sales: 61
      },
      {
        month: "4 月",
        sales: 145
      },
      {
        month: "5 月",
        sales: 48
      },
      {
        month: "6 月",
        sales: 38
      },
      {
        month: "7 月",
        sales: 96
      },
      {
        month: "8 月",
        sales: 43
      },
      {
        month: "9 月",
        sales: 37
      },
      {
        month: "10 月",
        sales: 74
      },
      {
        month: "11 月",
        sales: 15
      },
      {
        month: "12 月",
        sales: 26
      }
    ]
    const extra = (
      <Chart 
        height={300} 
        width={1200} 
        data={data} 
        scale={
          {
            month: {
              range: [0, 1]
            }
          }
        } 
        forceFit
      >
        <Legend />
        <Axis name="month" />
        <Axis
          name="sales"
          label={{
            formatter: val => `${val}万个`
          }}
        />
        <Tooltip
          crosshairs={{
            type: "y"
          }}
        />
        <Geom
          type="line"
          position="month*sales"
          size={2}
          color={"product"}
          shape={"smooth"}
        />
        <Geom
          type="point"
          position="month*sales"
          size={4}
          shape={"circle"}
          color={"product"}
          style={{
            stroke: "#fff",
            lineWidth: 1
          }}
        />
      </Chart>
    )
    const dateFormat = 'YYYY/MM/DD'
    const operations = (
      <RangePicker
        defaultValue={[moment('2019/01/01', dateFormat), moment('2020/01/15', dateFormat)]}
        format={dateFormat}
      />
    )
    const TimelineContent = (
      <Timeline>
        <Timeline.Item color="green">新版本迭代会</Timeline.Item>
        <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
        <Timeline.Item color="red">
          <p>联调接口</p>
          <p>功能验收</p>
        </Timeline.Item>
        <Timeline.Item color="blue">
          <p>登录功能设计</p>
          <p>权限验证</p>
          <p>页面排版</p>
        </Timeline.Item>
      </Timeline>
    )
    return (
      <div className='home'>
        <Card title={title} extra={extra}>
          <Tabs 
            defaultActiveKey="1" 
            onChange={this.callback} 
            size='large'
            tabBarExtraContent={operations}
          >
            <TabPane tab="访问量" key="1">
              <Row>
                <Col span={6} push={18}>
                  <Card title="任务" extra={<Icon type="smile" />} style={{ width: '95%',height: 500 }}>
                    {TimelineContent}
                  </Card>
                </Col>
                <Col span={18} pull={6}>
                  <Card title="访问趋势" extra={<Icon type="smile" />} style={{ width: '95%',height: 500 }}>
                    <Chart 
                      height={400} 
                      data={monthData} 
                      scale={
                        {
                          sales: {
                            tickInterval: 20
                          }
                        }
                      } 
                      forceFit
                    >
                      <Axis name="month" />
                      <Axis name="sales" />
                      <Tooltip
                        crosshairs={{
                          type: "y"
                        }}
                      />
                      <Geom type="interval" position="month*sales" />
                    </Chart>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="销售量" key="2">
              <Row>
                <Col span={6} push={18}>
                  <Card title="任务" extra={<Icon type="smile" />} style={{ width: '95%',height: 500 }}>
                    {TimelineContent}
                  </Card>
                </Col>
                <Col span={18} pull={6}>
                  <Card title="销售趋势" extra={<Icon type="smile" />} style={{ width: '95%',height: 500 }}>
                    <Chart 
                      height={400} 
                      data={monthData} 
                      scale={
                        {
                          month: {
                            alias: "月份"
                          },
                          sales: {
                            alias: "积累量"
                          }
                        }
                      } 
                      forceFit
                    >
                      <Axis
                        name="month"
                        title={null}
                        tickLine={null}
                        line={{
                          stroke: "#E6E6E6"
                        }}
                      />
                      <Axis
                        name="sales"
                        line={false}
                        tickLine={null}
                        grid={null}
                        title={null}
                      />
                      <Tooltip />
                      <Geom
                        type="line"
                        position="month*sales"
                        size={1}
                        color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
                        shape="smooth"
                        style={{
                          shadowColor: "l (270) 0:rgba(21, 146, 255, 0)",
                          shadowBlur: 60,
                          shadowOffsetY: 6
                        }}
                      />
                    </Chart>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}