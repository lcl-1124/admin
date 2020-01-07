/*
封装axios的模块
  返回的是一个promise

  优化：同一处理请求异常
    在外层包一个自己创建的promise对象
    在请求出错时，不reject(error),而是相识错误信息
*/

import axios from 'axios'
import { message } from "antd";

export default function ajax (url, data={}, method='GET') {
  return new Promise((resolve,reject) => {
    let promise
    // 1.执行异步ajax请求
    if (method === 'GET') {
      promise = axios.get(url,{params: data})
    } else if (method === 'POST') {
      promise = axios.post(url,data)
    }
    // 2.成功时resolve(response)
    promise
      .then(response => {
        resolve(response.data)
      })
      .catch(error => { // 3.失败时提示错误
        message.error('请求出错了：' + error.message)
      })
  })
  
}