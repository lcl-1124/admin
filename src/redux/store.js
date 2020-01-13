/*
redux最核心的模块store
*/
import {createStore,applyMiddleware} from 'redux' // applyMiddleware用来应用中间件
import thunk from 'redux-thunk' // 引入redux中间件，解决redux不能执行异步action问题
import {composeWithDevTools } from 'redux-devtools-extension' // 使用Chrome的redux开发工具插件

import reducer from './reducer'

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk))) // 创建store