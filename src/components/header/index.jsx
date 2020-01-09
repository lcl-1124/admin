/*
右侧头部组件
*/
import React,{Component} from 'react'
import { withRouter } from "react-router-dom";
import { Modal,message } from 'antd';

import './index.less'
import {formateDate} from '../../utils/dateUtls'
import memoryUtils from '../../utils/memoryUtils'
import storageLocal from "../../utils/storageLocal";
import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig'
import LinkButton from '../linkButton'

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
  // 获取选中菜单项title
  getTitle = () => {
    // 1.拿到当前选中菜单项的路径
    const path = this.props.location.pathname;
    let title;
    // 2.遍历
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title;
        }
      } 
    })
    return title
  }
  // 退出登录
  handleOut = () => {
    Modal.confirm({
      title: '确定退出么?',
      onOk: () => {
        // 删除储存数据
        storageLocal.removeUser() // 本地
        memoryUtils.user = {} // 内存
        message.success('退出登录')
        // 跳转到登录界面
        this.props.history.replace('/login')
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
    const {username} = memoryUtils.user;
    const title = this.getTitle();
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

export default withRouter(Header)