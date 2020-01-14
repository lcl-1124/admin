/*
入口js
*/
import React from 'react'
import { render } from "react-dom"
// import { Provider } from "react-redux";
import { Provider } from "./lib/react-redux"; // 自定义react-redux

import App from './App'
import store from './redux/store'

render((
  <Provider store={store}>
    <App/>
  </Provider>
),document.getElementById('root'))

// store.subscribe(() => {
//   render(<App store={store}/>,document.getElementById('root'))
// })
