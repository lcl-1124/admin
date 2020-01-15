/*
左侧导航列表组件
*/
import React,{Component} from 'react'
import { Link,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Icon } from 'antd';

import './index.less'
import logo from '../../assets/images/adminLogo.png'
import menuList from '../../config/menuConfig'
import { setHeaderTitle } from "../../redux/action";

const { SubMenu } = Menu;

class LeftNav extends Component {
  /*
  添加左侧菜单项
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
  添加左侧菜单项
    reduce() + 递归
  */
  handleMenuNode = menuList => {
    return menuList.reduce((pre,item) => {
      /*
      判断当前登录用户的权限，如果有权限则根据权限添加
      */
      if (this.haveAuth(item)) {
        // 得到当前选中菜单项标识
        const path = this.props.location.pathname;
        if (!item.children) {

          // 判断当前菜单是否是选中菜单，是则分发action跟新状态显示
          if (item.key === path || path.indexOf(item.key) === 0) {
            this.props.setHeaderTitle(item.title)
          }
          
          pre.push((
            <Menu.Item key={item.key} onClick={() => this.props.setHeaderTitle(item.title)}>
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
          const cItem = item.children.find((cItem) => path.indexOf(cItem.key) === 0)
          
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
      }
      return pre
    },[])
  }
  /*
  判断是否有权限
    返回值为Boolean
  */
  haveAuth = (item) => {
    /*
    1.当前用户是admin
    2.当前item公开
    3.当前用户有次item权限
    4.当前用户有此item的某个子item的权限
    */
    const {user} = this.props
    const menus = user.role.menus
    const username = user.username
    const {key,isPublic} = item
    if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
      return true
    } else if (item.children) {
      // 当前用户有此item的某个子item的权限
      return !!item.children.find(child => menus.indexOf(child.key) !== -1) // 强制转换布尔值
    }
    return false
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
    let path = this.props.location.pathname;
    if (path.indexOf('/product') === 0) { // String.proptype.indexOf(string)返回指定字符串在当前字符串中第一次出现的下标位置，没有找到则返回-1
      // 证明当前是'/product'或其子路由
      path = '/product';
    }
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
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
export default connect(
  state => ({user: state.user}),
  {setHeaderTitle}
)(withRouter(LeftNav))