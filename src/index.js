/*
入口js
*/

import React from 'react'
import ReactDom from 'react-dom'
// 引入全部样式
// import 'antd/dist/antd.css'

import App from './app'
import memoryUtils from './utils/memoryUtils'
import storageLocal from './utils/storageLocal'

memoryUtils.user = storageLocal.getUser()

ReactDom.render(<App />,document.getElementById('root'))