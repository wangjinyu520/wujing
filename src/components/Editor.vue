<template>
  <div class="editor-component">
    <div id="editor"></div>
    <upload
      style="opacity: 0;width: 0;height: 0;z-index: -99;overflow:hidden;"
      ref="editor-upload"
      @uploadSuccess="uploadSuccessEditor"
    />
  </div>
</template>

<script>
import Upload from './Upload'
import { getCookie, removeCookie } from '@/js-cookie'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image', 'video'] // 链接、图片、视频
]

export default {
  components: {
    Upload
  },
  props: ['value'],
  data() {
    return {
      editor: '',
      delay: '',
      // content: '',
      // editorOption: {
      //   modules: {
      //     toolbar: {
      //       container: toolbarOptions,
      //       handlers: {
      //         image: function(value) {
      //           if (value) {
      //             // 触发input框选择图片文件
      //             this.$refs['editor-upload']['$el'].querySelector('input').click()
      //             // document.querySelector('.avatar-uploader .el-upload__input').click()
      //           } else {
      //             // this.quill.format('image', false)
      //           }
      //         }.bind(this)
      //       }
      //     }
      //   },
      //   placeholder: '', //提示
      //   readyOnly: false, //是否只读
      //   theme: 'snow', //主题 snow/bubble
      //   syntax: true //语法检测
      // }
    }
  },
  created() {
  },
  mounted() {
    this.init()
  },
  watch: {
    value: {
      immediate: true,
      handler(val, old) {
        if(!old || !val) {
          this.content = val
          if(this.editor) {
            this.editor.txt.html(val)
          }
        }
      }
    }
  },
  methods: {
    init() {
      var E = window.wangEditor
      this.editor = new E('#editor')
      this.editor.customConfig.onchange = (html) => {
        this.$emit('input', html)
      }
      this.editor.customConfig.uploadImgServer = (process.env.BASE_URL || BASEURL) + '/common/wangEditor/upload';
      this.editor.customConfig.uploadImgHeaders = {
          // 如果版本 <=v3.1.0 ，属性值会自动进行 encode ，此处无需 encode
          // 如果版本 >=v3.1.1 ，属性值不会自动 encode ，如有需要自己手动 encode
          'Accept': "application/json",
          'token': getCookie('token') || ''
      }
      this.editor.customConfig.colors = [
          '#000000',
          '#eeece0',
          '#1c487f',
          '#4d80bf',
          '#c24f4a',
          '#8baa4a',
          '#7b5ba1',
          '#46acc8',
          '#f9963b',
          'red',
          '#ffffff',
      ]
      this.editor.create()
      this.editor.txt.html(this.value)
    },
    clearValue() {
      this.editor.txt.clear()
    },
    onEditorBlur(e) {},
    onEditorFocus(e) {},
    onEditorChange(e) {
      console.log('改变')
      this.$emit('input', this.content)
    },
    uploadSuccessEditor(res) {
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 获取光标所在位置
      let length = quill.getSelection().index;
      // 插入图片  res.url为服务器返回的图片地址
      quill.insertEmbed(length, "image", res);
      // 调整光标到最后
      quill.setSelection(length + 1);
    },
  }
}
</script>

<style lang="scss">
.cn {
  .editor-component {
    .editor {
      line-height: normal !important;
      height: 800px;
    }
    .ql-snow .ql-tooltip[data-mode='link']::before {
      content: '请输入链接地址:';
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
      border-right: 0px;
      content: '保存';
      padding-right: 0px;
    }

    .ql-snow .ql-tooltip[data-mode='video']::before {
      content: '请输入视频地址:';
    }

    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
      content: '14px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
      content: '10px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
      content: '18px';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
      content: '32px';
    }

    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
      content: '文本';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
      content: '标题1';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
      content: '标题2';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
      content: '标题3';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
      content: '标题4';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
      content: '标题5';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
      content: '标题6';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
      content: '标准字体';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
      content: '衬线字体';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
      content: '等宽字体';
    }
  }
}
.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label::before,
.ql-toolbar.ql-snow .ql-picker-label::before {
  position: absolute;
  top: 1px;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow {
  height: 350px;
}
.w-e-toolbar .w-e-menu {
  line-height: 20px;
}
.w-e-toolbar .w-e-droplist {
  margin-top: 30px!important;
}
</style>