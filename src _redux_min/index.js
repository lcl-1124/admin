/*
入口js
*/
import React from 'react'
import { render } from "react-dom"

import App from './App'
import store from './redux/store'

render(<App store={store}/>,document.getElementById('root'))

store.subscribe(() => {
  render(<App store={store}/>,document.getElementById('root'))
})
