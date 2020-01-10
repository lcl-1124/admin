/*
富文本编辑器组件
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditorState, convertToRaw,ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class EditorConvertToHTML extends Component {
  static propTypes = {
    detail: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props)

    const detail = this.props.detail
    if (detail) { // 如果有值，根据他创建由内容的编辑对象
      const contentBlock = htmlToDraft(detail)
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const editorState = EditorState.createWithContent(contentState)
        this.state = {
          editorState,
        }
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty() // 创建空的编辑对象
      }
    }
  }
  // 输入文本时实时更新状态
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }
  
  // 给父组件返回一个标签字符串detail
  getDetail = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

  // 上传图片
  // uploadImageCallBack = (file) => {
  //   return new Promise(
  //     (resolve, reject) => {
  //       const xhr = new XMLHttpRequest()
  //       xhr.open('POST', '/manage/img/upload')
  //       const data = new FormData()
  //       data.append('image', file)
  //       xhr.send(data)
  //       xhr.addEventListener('load', () => {
  //         const response = JSON.parse(xhr.responseText)
  //         console.log(response)
  //         resolve(response)
  //       })
  //       xhr.addEventListener('error', () => {
  //         const error = JSON.parse(xhr.responseText)
  //         reject(error)
  //       })
  //     }
  //   )
  // }
  render() {
    const { editorState } = this.state
    return (
      <Editor
        editorState={editorState}
        editorStyle={{border: '1px solid #ccc',height: 200,paddingLeft: 20}}
        onEditorStateChange={this.onEditorStateChange}
        // toolbar={{
        //   image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
        // }}
      />
    )
  }
}