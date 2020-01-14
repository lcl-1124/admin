/*
入口js
*/
import React from 'react'
import { render } from "react-dom"
import {Provider} from 'react-redux' // 解决react与redux高耦合问题，包装容器组件并向其传递store

import App from './App'
import store from './redux/store'

render((
  <Provider store={store}>
    <App/>
  </Provider>
),document.getElementById('root'))