<template>
  <el-form ref="formRef" inline :model="formData"
           :rules="formRules"
           label-width="140px"
  >
    <el-form-item label="小程序的APPID" prop="appId">
      <el-input v-model.trim="formData.appId" class="form-item-width"
                placeholder="请输入小程序的APPID"
                size="mini"
                @change="onDataChange"
      />
      <span>（示例：wxe5f52902cf4de896）</span>
    </el-form-item>
    <el-form-item label="跳转页面的url地址" prop="redirectOuterUrl">
      <el-input v-model.trim="formData.redirectOuterUrl" class="form-item-width" placeholder="请输入跳转页面的url地址"
                size="mini"
                @change="onDataChange"
      />
    </el-form-item>
  </el-form>
</template>
<script>
import mixins from './mixins'
const emptyForm = {
  appId: null,
  redirectOuterUrl: null
}
export default {
  mixins: [mixins],
  props: {
    visible: Boolean,
    initData: {
      type: Object, default: null
    }
  },
  data() {
    return {
      hasError: false,
      formData: {...emptyForm},
      formRules: {
        appId: [
          {
            required: true,
            message: '请输入小程序的APPID',
            trigger: ['change']
          }
        ],
        redirectOuterUrl: [
          {
            required: true,
            message: '请输入跳转页面的url地址',
            trigger: ['change']
          }
        ]
      }
    }
  },
  watch: {
    visible(v) {
      if (!v && this.hasError) {
        this.clearData()
      }
    }
  },
  created() {
    if (this.initData) {
      let { appId, redirectOuterUrl } = this.initData
      this.formData.redirectOuterUrl = redirectOuterUrl
      this.formData.appId = appId
    }
  }
}
</script>
<style lang="less" scoped>
  .el-input{
    width: 300px;
  }
</style>
