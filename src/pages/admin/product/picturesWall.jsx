/*
图片上传/删除组件
*/
import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal, message } from 'antd' // Upload 上传

import { reqDeleteImg } from "../../../api"
import {BASE_IMG_URL} from '../../../utils/constants' 

// 对文件进行base64编码
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default class PicturesWall extends React.Component {
  static propTypes = {
    imgs: PropTypes.array
  }

  constructor (props) {
    super(props)

    let fileList = []
    
    if (this.props.imgs && this.props.imgs.length>0) {
      fileList = this.props.imgs.map((img,index) => ({
        uid: -index,  // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
        name: img, // 文件名
        status: 'done', // 状态有：uploading-上传中   done-已上传   error-上传失败  removed-已删除
        url: BASE_IMG_URL + img, // 图片url
      }))
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList,
    }
  }
  // 隐藏图片metal
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj) // 将图片转换成Base64编码
    }
    // console.log(file)
    this.setState({
      previewImage: file.url || file.preview, // 图片地址
      previewVisible: true, // 是否显示图片metal
    })
  }

  // 上传回调监听
  handleChange = async ({ file,fileList }) => {
    // console.log(file,fileList)
    if (file.status === "done") {
      const result = file.response
      if (result.status === 0) {
        message.success('图片上传成功')
        file = fileList[fileList.length-1]
        const {name,url} = result.data
        file.name = name
        file.url = url
        // console.log(file.name,file.url,'--------',fileList[fileList.length-1].name,fileList[fileList.length-1].url)
      } else {
        message.error('图片上传失败')
      }
    } else if (file.status === 'removed') { // 删除图片
      const name = file.name
      const result = await reqDeleteImg(name)
      if (result.status === 0) {
        message.success('删除图片成功')
      } else {
        message.error('删除图片失败')
      }
    }
    // 更新状态fileList
    this.setState({ fileList })
  }

  // 给父组件提供数据
  getImgs = () => this.state.fileList.map(file => file.name)

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          name='image'  // 文件参数名
          accept='image/*' // 上传文件类型
          action="/manage/img/upload" // 上传地址
          listType="picture-card" // 上传列表样式
          fileList={fileList}  // 已上传图片列表
          onPreview={this.handlePreview} // 点击链接预览图片回调
          onChange={this.handleChange} // 上传状态改变回调
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
