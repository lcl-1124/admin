/*
包含接口请求函数的模块
*/
import jsonp from 'jsonp'
import { message } from "antd";

import ajax from './ajax'

const BASEURL = '/api';

// 1.登录
export const reqLogin = ({username,password}) => ajax(BASEURL + '/login',{username,password},'POST')
// 2.添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax(BASEURL + '/manage/user/' + (user._id?'update':'add'),user,'POST')
// 3.获取所有用户列表
export const reqUserList = () => ajax(BASEURL + '/manage/user/list')
// 4.删除用户
export const reqDeleteUser = (userId) => ajax(BASEURL + '/manage/user/delete',{userId},'POST')
// 5.获取一级或某个二级分类列表
export const reqCategoryList = (parentId) => ajax(BASEURL + '/manage/category/list',{parentId})
// 6.添加分类
export const reqCategoryAdd = ({parentId,categoryName}) => ajax(BASEURL + '/manage/category/add',{parentId,categoryName},'POST')
// 7.更新品类名称
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax(BASEURL + '/manage/category/update',{categoryId,categoryName},'POST')
// 8.根据分类ID获取分类
export const reqCategoryInfo = (categoryId) => ajax(BASEURL + '/manage/category/info',{categoryId})
// 9.获取商品分页列表
export const reqProductList = (pageNum,pageSize) => ajax(BASEURL + '/manage/product/list',{pageNum,pageSize})
/*
10.根据ID/Name搜索产品分页列表
  productName 根据名称搜索
  productDesc 根据描述搜索
  productType: productName/productDesc
*/ 
export const reqSearchProduct = ({pageNum,pageSize,searchName,productType}) => ajax(BASEURL + '/manage/product/search',{pageNum,pageSize,[productType]:searchName})
// 11.添加商品
export const reqAddProduct = ({categoryId,pCategoryId,name,desc,price,detail,imgs}) => ajax(BASEURL + '/manage/product/add',{categoryId,pCategoryId,name,desc,price,detail,imgs},'POST')
// 12.更新商品
export const reqUpdateProduct = ({_id,categoryId,pCategoryId,name,desc,price,detail,imgs}) => ajax(BASEURL + '/manage/product/update',{_id,categoryId,pCategoryId,name,desc,price,detail,imgs},'POST')
// 13.对商品进行上架/下架处理
export const reqUpdateStatusProduct = (productId,status) => ajax(BASEURL + '/manage/product/updateStatus',{productId,status},'POST')
// 14.上传图片
export const reqUploadImg = (image) => ajax(BASEURL + '/manage/img/upload',{image},'POST')
// 15.删除图片
export const reqDeleteImg = (name) => ajax(BASEURL + '/manage/img/delete',{name},'POST')
// 16.添加角色
export const reqAddRole = (roleName) => ajax(BASEURL + '/manage/role/add',{roleName},'POST')
// 17.获取角色列表
export const reqRoleList = () => ajax(BASEURL + '/manage/role/list')
// 18.更新角色(给角色设置权限)
export const reqUpdateRole = (role) => ajax(BASEURL + '/manage/role/update',role,'POST')
// 19.获取天气信息(支持jsonp)
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