/*
包含接口请求函数的模块
*/
import jsonp from 'jsonp'
import { message } from "antd";

import ajax from './ajax'

const BASEURL = '';

// 1.登录
export const reqLogin = ({username,password}) => ajax(BASEURL + '/login',{username,password},'POST')
// 2.添加用户
export const reqAddUser = ({username,password,phone,email,role_id}) => ajax(BASEURL + '/manage/user/add',{username,password,phone,email,role_id},'POST')
// 3.更新用户
export const reqUpdateUser = ({_id,username,phone,email,role_id}) => ajax(BASEURL + '/manage/user/update',{_id,username,phone,email,role_id},'POST')
// 4.获取所有用户列表
export const reqUserList = () => ajax(BASEURL + '/manage/user/list')
// 5.删除用户
export const reqDeleteUser = (userId) => ajax(BASEURL + '/manage/user/delete',{userId},'POST')
// 6.获取一级或某个二级分类列表
export const reqCategoryList = (parentId) => ajax(BASEURL + '/manage/category/list',{parentId})
// 7.添加分类
export const reqCategoryAdd = ({parentId,categoryName}) => ajax(BASEURL + '/manage/category/add',{parentId,categoryName},'POST')
// 8.更新品类名称
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax(BASEURL + '/manage/category/update',{categoryId,categoryName},'POST')
// 9.根据分类ID获取分类
export const reqCategoryInfo = (categoryId) => ajax(BASEURL + '/manage/category/info',{categoryId})
// 10.获取商品分页列表
export const reqProductList = ({pageNum,pageSize}) => ajax(BASEURL + '/manage/product/list',{pageNum,pageSize})
// 11.根据ID/Name搜索产品分页列表
export const reqSearchProduct = ({pageNum,pageSize,productName,productDesc}) => ajax(BASEURL + '/manage/product/search',{pageNum,pageSize,productName,productDesc})
// 12.添加商品
export const reqAddProduct = ({categoryId,pCategoryId,name,desc,price,detail,imgs}) => ajax(BASEURL + '/manage/product/add',{categoryId,pCategoryId,name,desc,price,detail,imgs},'POST')
// 13.更新商品
export const reqUpdateProduct = ({_id,categoryId,pCategoryId,name,desc,price,detail,imgs}) => ajax(BASEURL + '/manage/product/update',{_id,categoryId,pCategoryId,name,desc,price,detail,imgs},'POST')
// 14.对商品进行上架/下架处理
export const reqUpdateStatusProduct = ({productId,status}) => ajax(BASEURL + '/manage/product/updateStatus',{productId,status},'POST')
// 15.上传图片
export const reqUploadImg = (image) => ajax(BASEURL + '/manage/img/upload',{image},'POST')
// 16.删除图片
export const reqDeleteImg = (name) => ajax(BASEURL + '/manage/img/delete',{name},'POST')
// 17.添加角色
export const reqAddRole = (roleName) => ajax(BASEURL + '/manage/role/add',{roleName},'POST')
// 18.获取角色列表
export const reqRoleList = () => ajax(BASEURL + '/manage/role/list')
// 19.更新角色(给角色设置权限)
export const reqUpdateRole = ({_id,menus,auth_time,auth_name}) => ajax(BASEURL + '/manage/role/update',{_id,menus,auth_time,auth_name},'POST')
// 20.获取天气信息(支持jsonp)
// export const reqWeather = ({location,output,ak}) => ajax('http://api.map.baidu.com/telematics/v3/weathe',{location,output,ak})
export function reqWeather (city) {
  return new Promise((resolve,reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,{},function (err,data) {
      if (!err && data.status === 'success') {
        const {dayPictureUrl,weather} = data.results[0].weather_data[0];
        resolve({dayPictureUrl,weather})
      } else {
        message.error('获取天气失败')
      }
    })
  })
}