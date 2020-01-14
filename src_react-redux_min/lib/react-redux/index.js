/*
react-redux库模块
  1) react-redux 向外暴露了 2 个 API 
    a. Provider 组件类 
    b. connect 函数 
  2) Provider 组件 
    接收 store 属性 让所有容器组件都可以看到 store, 从而通过 store 读取/更新状态 
  3) connect 高阶函数 
    接收 2 个参数: mapStateToProps 和 mapDispatchToProps 
      mapStateToProps: 为一个函数, 用来指定向 UI 组件传递哪些一般属性 
      mapDispatchToProps: 为一个函数或对象, 用来指定向 UI 组件传递哪些函数属性 
    connect()执行的返回值为一个高阶组件: 包装 UI 组件, 返回一个新的容器组件 容器组件会向 UI 传入前面指定的一般/函数类型属性
*/
import React from 'react'
import PropTypes from 'prop-types'

// Provider 组件
export class Provider extends React.Component {
  // 接收 store 属性 让所有容器组件都可以看到 store, 从而通过 store 读取/更新状态 
  // 声明store
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  // 声明提供context数据的名称和类型
  static childContextTypes = {
    store: PropTypes.object
  }

  // 向所有有声明子组件提供包含要传递数据的context对象
  getChildContext = () => {
    return {
      store: this.props.store
    }
  }

  render () {
    // 返回渲染<Provider>的所有子节点
    return this.props.children
  }
}

// connect 函数
export function connect(mapStateToProps,mapDispatchToProps) {
  // 返回一个高阶组件，接收一个UI组件
  return (UiComponent) => {
    // 返回一个容器组件，并通过mapStateToProps和mapDispatchToProps向其传递一般属性和方法
    return class ContainerComponent extends React.Component {
      
      // 声明接收父组件传递的属性 
      static contextTypes = {
        store: PropTypes.object
      }
      
      constructor (props,context) {
        super(props)

        // console.log('containerComponent constructor()',context.store)

        // 得到store
        const {store} = context
        // 得到包含所有一般属性的对象
        const stateProps = mapStateToProps(store.getState())
        // 将所有一般属性作为容器的状态数据(因为一般属性状态需要改变)
        this.state = {...stateProps}

        // 得到包含所有方法的对象
        let dispatchProps 
        if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(store.dispatch)
        } else {
          dispatchProps = Object.keys(mapDispatchToProps).reduce((pre,key) => {
            const actionCotainer = mapDispatchToProps[key]
            pre[key] = (...args) => store.dispatch(actionCotainer(...args)) // 参数传透
            return pre
          },{})
        }
        // 保存到组件上()
        this.dispatchProps = dispatchProps

        // 绑定store的state变化监听
        store.subscribe(() => { // store内部状态数据变化
          // 容器组件更新 ==> UI组件更新
          this.setState({...mapStateToProps(store.getState())})
        })
      }

      render () {
        // 返回UI组件的标签
        return <UiComponent {...this.state} {...this.dispatchProps}/>
      }
    }
  }
}