/*
redux最核心模块store
*/
// import { createStore } from "redux"
import { createStore } from "../lib/redux"  // 自定义redux

import reducer from './reducer'

export default createStore(reducer)