<template>
  <el-form ref="formRef" inline :model="formData"
           :rules="formRules"
  >
    <el-form-item label="内部url地址" prop="redirectUrl">
      <el-input v-model.trim="formData.redirectUrl" class="form-item-width"
                placeholder="请输入url地址"
                size="mini"
                style="width: 350px"
                @change="onDataChange"
      />
      <span>（示例：pages/user/mycar/index）</span>
    </el-form-item>
  </el-form>
</template>
<script>
import mixins from './mixins'
const emptyForm = {
  redirectUrl: null
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
      formData: {...emptyForm},
      formRules: {
        redirectUrl: [
          {
            required: true,
            message: '请输入url地址',
            trigger: ['change']
          },
          {
            pattern: /^pages/,
            message: '请输入正确的url地址',
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
      this.formData.redirectUrl = this.initData.redirectUrl
    }
  }
}
</script>
