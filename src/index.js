/*
入口js
*/

import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'; // react插件，简化redux使用，解决redux与react高耦合,包装UI组件并向其传递store属性

import App from './App'
import store from './redux/store'

ReactDom.render((
  <Provider store={store}>
    <App/>
  </Provider>
),document.getElementById('root'))