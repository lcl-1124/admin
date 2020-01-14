/*
自定义redux
  1) redux 库向外暴露下面几个函数 
    createStore(): 接收的参数为 reducer 函数, 返回为 store 对象 
    combineReducers(): 接收包含 n 个 reducer 方法的对象, 返回一个新的 reducer 函数 
    applyMiddleware() // 暂不实现 
  2) store 对象的内部结构 
    getState(): 返回值为内部保存的 state 数据 
    dispatch(): 参数为 action 对象 
    subscribe(): 参数为监听内部 state 更新的回调函数
*/

// createStore(): 接收的参数为 reducer 函数, 返回为 store 对象 
export function createStore(reducer) {
  // 用来储存内部状态数据的变量，初始值为调用reducer返回的结果(外部指定的默认值)
  let state = reducer(undefined,{type: '@@redux-lcl/init'})
  // 保存多个修改state状态的监听
  const listeners = []
  // 得到state
  function getState() {
    return state
  }
  /**
   * 分发action，调用reducer函数，返回新的state
   *  1.调用reducer
   *  2.保存新的state
   *  3.调用所有保存的监听回调
   * @param {对象} action 
   */
  function dispatch(action) {
    // 1.调用reducer
    const newState = reducer(state,action)
    // 2.保存新的state
    state = newState
    console.log('state改变了，更新状态')
    // 3.调用所有保存的监听回调
    listeners.forEach(listener => listener())
  }
  /**
   * 绑定内部state改变监听回调
   * 可以给一个store绑定多个监听
   * @param {监听} listener 
   */
  function subscribe(listener) {
    // 保存到储存listener的容器数组中
    listeners.push(listener)
  }
  
  // 返回store
  return {
    getState,
    dispatch,
    subscribe
  }
}

/**
 * combineReducers(): 接收包含 n 个 reducer 方法的对象, 返回一个新的 reducer 函数
 *  新的reducer管理的总状态: {r1: state1,r2: state2}
 * 
 *  将传入参数通过Object的keys()得到包含对象参数的每个属性值的数组，接着使用数组的reduce()进行累加
 *    preState  初始化返回值，也就是要返回的新的reducer管理的总状态
 *    key       每个属性值
 * 
 *    preState[key]  preState对象的每个属性值
 *    reducers[key]  通过传入参数对象和属性值得到目标reducer
 *    state[key]     通过状态state和属性值得到目标reducer所管理的状态state
 *  
 *  传入参数对象：
 *    {
 *      count: (state=1,action) => 1,
 *      user: (state={},action) => {}
 *    }
 *  总管理状态对象
 *    {
 *      count: count(state.count,action),
 *      user: user(state.user,action)
 *    }
 * @param {对象} reducers 
 */
export function combineReducers(reducers) {
  // 返回的是一个新的reducer函数，此函数返回一个管理的总状态{}
  return (state={},action) => {
    return Object.keys(reducers).reduce((preState,key) => {
      preState[key] = reducers[key](state[key],action)
      return preState
    },{})
  }
}