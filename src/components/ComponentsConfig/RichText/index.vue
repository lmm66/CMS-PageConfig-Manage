<template>
  <div>
    <!-- 颜色配置 -->
    <ComGroup title="背景色">
      <el-button type="text"
                 class="mr-15"
                 @click="configData.backgroundColor = initBgColor">
        重置
      </el-button>
      <el-color-picker v-model="configData.backgroundColor"
                       size="small" />
    </ComGroup>
    <ComGroup title="内容"
              :content-block="true">
      <quill-editor ref="myTextEditor"
                    v-model="configData.content"
                    :options="editorOption" />
      <Uploader ref="quillUploader"
                class="avatar-uploader"
                :show-file-list="false"
                list-type="picture"
                :max-size="upload.maxSize"
                :limit="upload.limit"
                :on-change="onChangeQuill" />
    </ComGroup>
  </div>
</template>

<script>
import ComGroup from '@/components/BasicUi/ComGroup'

export default {
  name: 'RichText',
  components: { ComGroup },
  props: ['parmes'],
  data () {
    return {
      // 当前组件数据
      configData: JSON.parse(JSON.stringify(this.parmes)),
      // 初始背景颜色
      initBgColor: '',
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
              // ['blockquote', 'code-block'], // 引用，代码块
              // [{ 'header': 1 }, { 'header': 2 }], // 标题，键值对的形式；1、2表示字体大小
              [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 列表
              // [{ 'script': 'sub' }, { 'script': 'super' }], // 上下标
              // [{ 'indent': '-1' }, { 'indent': '+1' }], // 缩进
              [{ 'direction': 'rtl' }], // 文本方向
              ['clean'], // 清除字体样式
              // [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // 几级标题
              [{ 'align': [] }], // 对齐方式
              [{ 'color': [] }, { 'background': [] }], // 字体颜色，字体背景颜色
              ['image'] // 链接link，上传图片、上传视频video
            ],
            handlers: {
              image: function (value) {
                if (value) {
                  // 触发上传组件的文件上传
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      upload: {
        maxSize: 1,
        limit: 99
      }
    }
  },
  watch: {
    // 监听当前组件配置及数据项修改
    configData: {
      handler: function (newVal, oldVal) {
        console.log('文本修改', newVal)
        // 更新组件配置数据
        this.$emit('editComponent', newVal)
      },
      deep: true
    }
  },
  methods: {
    // 富文本组件图片上传
    onChangeQuill (file, fileList) {
      if (file.status !== 'finished') return
      let quill = this.$refs.myTextEditor.quill
      let length = quill.getSelection().index
      // 图片上传到对象存储后的具体地址
      let imgSrc = file.response.data
      quill.insertEmbed(length, 'image', imgSrc)
      // 调整光标到最后
      quill.setSelection(length + 1)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.ql-container.ql-snow {
  height: 200px;
}

.avatar-uploader {
  display: none !important;
}
</style>
