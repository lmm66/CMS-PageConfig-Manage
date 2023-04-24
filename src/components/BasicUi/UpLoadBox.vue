<template>
  <!-- 上传图片盒子 -->
  <div class="up-pic-box">
    <template v-if="uploading">
      <div v-loading="uploading"
           element-loading-text="上传中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.3)"></div>
    </template>
    <template v-else>
      <template v-if="imgUrl">
        <img :src="imgUrl">
        <p class="pic-tips"
           @click="editImg">
          更换图片
        </p>
      </template>
      <template v-else>
        <div class="not-pic"
             @click="editImg">
          <i class="el-icon-plus"></i>
          <p v-if="addPlaceHolder">
            {{ addPlaceHolder }}
          </p>
        </div>
      </template>
    </template>
    <el-upload ref="upload"
               v-show="false"
               :action="upLoadUrl"
               :multiple="false"
               list-type="picture"
               :show-file-list="false"
               :on-success="doSuccess"
               :on-error="doError"
               :before-upload="beforeUpload">
      <button>点击上传</button>
    </el-upload>
  </div>
</template>

<script>
import { upLoadUrl } from '@/api/index'
export default {
  name: 'UploadBox',
  props: {
    // 图片地址
    imgUrl: {
      type: String,
      default: ''
    },
    // 添加图片文字
    addPlaceHolder: {
      type: String,
      default: '添加图片'
    },
    // 是否直接上传本地文件
    uploadFile: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      uploading: false,   // 是否正在上传图片中
      upLoadUrl: upLoadUrl,   // 图片上传地址
    }
  },
  methods: {
    // 上传/更换 图片
    editImg () {
      // 是否直接上传本地文件
      if (this.uploadFile) {
        // 拿到 el-upload 的dom节点，触发子节点 button 的 click事件
        this.$refs.upload.$el.querySelector('button').click();
      } else {
        // 否则触发组件自定义事件，显示上传图片弹出框组件
        this.$emit('editImg');
      }
    },

    // 上传图片前的验证方法
    beforeUpload (file) {
      console.log(file);
      // TODO:文件类型判断
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      // TODO:文件大小判断(字节 -> KB-> MB)
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传的图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传的图片大小不能超过2M!');
      }
      if (isJPG && isLt2M) {
        // 校验通过
        this.uploading = true;
        return true;
      } else {
        return false;
      }
    },

    // 上传图片成功的方法
    doSuccess (response, file, fileList) {
      this.uploading = false;
      // .sync修饰符：修改父组件imgUrl属性为当前上传的图片地址
      this.$emit('update:img-url', response.data)   // http://124.223.69.156:5500/cms/userImg.jpg
    },

    // 上传图片失败的方法
    doError () {
      this.$message.error('上传失败，请稍后重试')
      this.uploading = false
    }
  }
}
</script>

<style lang="less" scoped>
// 上传图片模块样式
.up-pic-box {
  position: relative;
  width: 60px;
  height: 60px;
  border: 1px solid #e5e5e5;
  background: #fff;
  text-align: center;
  margin-top: 5px;

  img {
    width: 100%;
    height: 100%;
  }

  .pic-tips {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  .not-pic {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: @color-1;
    cursor: pointer;

    i {
      font-size: 20px;
    }

    p {
      margin-top: 4px;
    }
  }

  .el-loading-parent--relative {
    width: 100%;
    height: 100%;
    display: inline-block;

    .el-loading-text {
      font-size: 12px !important;
    }
  }
}
</style>
