/*
右侧头部组件
*/
import React,{Component} from 'react'
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import { Modal,message } from 'antd';

import './index.less'
import {formateDate} from '../../utils/dateUtls'
import {reqWeather} from '../../api'
import LinkButton from '../linkButton'
import { getLogout } from "../../redux/action";

class Header extends Component {
  state = {
    currentDate: formateDate(Date.now()), // 当前日期时间
    dayPictureUrl: '',  // 天气图片
    weather: '' // 天气状况
  }
  // 获取当前日期时间
  getCurrentDate = () => {
    this.intervalId = setInterval(() => {
      const currentDate = formateDate(Date.now());
      this.setState({currentDate})
    }, 1000);
  }
  // 获取天气
  getWeath = async () => {
    const {dayPictureUrl,weather} = await reqWeather('临猗');
    this.setState({dayPictureUrl,weather})
  }
  // 退出登录
  handleOut = () => {
    Modal.confirm({
      title: '确定退出么?',
      onOk: () => {
        message.success('退出登录')
        this.props.getLogout()
      },
      onCancel: () => {
        message.success('退出取消')
      }
    })
  }
  componentDidMount () {
    this.getCurrentDate()
    this.getWeath()
  }
  componentWillUnmount () {
    clearInterval(this.intervalId)
  }
  render () {
    const {currentDate,dayPictureUrl,weather} = this.state;
    const {username} = this.props.user;
    // 获取选中菜单项title
    const title = this.props.headerTitle
    return (
      <div className='header'>
        <div className='header-top'>
          <span>hello,{username}</span>
          <LinkButton onClick={this.handleOut}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <p>{currentDate}</p>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

/*
将UI组件包装成容器组件并向其传递属性
*/
export default connect(
  state => ({headerTitle: state.headerTitle,user: state.user}),
  {getLogout}
)(withRouter(Header))