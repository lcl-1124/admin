/*
左侧导航列表组件
*/
import React,{Component} from 'react'
import { Link,withRouter } from "react-router-dom";
import { Menu, Icon } from 'antd';

import './index.less'
import logo from '../../assets/images/adminLogo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

class LeftNav extends Component {
  /*
  map() + 递归
  */
  handleMenuNode_map = menuList => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
            }
          >
            {this.handleMenuNode(item.children)}
          </SubMenu>
        )
      }
    })
  }
  /*
  reduce() + 递归
  */
  handleMenuNode = menuList => {
    return menuList.reduce((pre,item) => {
      // 得到当前选中菜单项标识
      const path = this.props.location.pathname;
      if (!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {
        /*
        拿到子菜单中与选中菜单项标识一致的
          判断是否存在，如果有则拿到当前菜单的标识
        */ 
        const cItem = item.children.find((cItem) => cItem.key === path)
        
        if (cItem) {
          this.openKey = item.key
        }

        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
            }
          >
            {this.handleMenuNode(item.children)}
          </SubMenu>
        ))
      }
      return pre
    },[])
  }

  /*
  在第一次render前执行
    用来在渲染前做准备
  */
  componentWillMount () {
    /*
    只用执行一次就行
      在渲染之前拿到选中的需要展开的菜单和菜单项标识
    */
    this.menuNode = this.handleMenuNode(menuList)
  }

  render () {
    // 得到当前选中菜单项标识
    const path = this.props.location.pathname;
    return (
      <div className='left-nav'>
        <Link to='/home' className='left-nav-header'>
          <img src={logo} alt="logo"/>
          <h2>后台管理</h2>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {
            this.menuNode
          }
        </Menu>
      </div>
    )
  }
}

/*
withRouter  高阶组件
  用于将非路由组件包装成路由组件，向其提供三个属性location，history，match
*/
export default withRouter(LeftNav)