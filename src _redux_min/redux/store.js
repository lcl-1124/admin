/*
redux最核心模块store
*/
// import { createStore } from "redux"
import { createStore } from "../lib/redux"  // 自定义redux
import { applyMiddleware } from "redux"  // 应用中间件
import thunk from "redux-thunk" // redux中间件  解决redux不能分发异步action问题
import { composeWithDevTools } from "redux-devtools-extension"  // 使用Chrome插件

import reducer from './reducer'

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))