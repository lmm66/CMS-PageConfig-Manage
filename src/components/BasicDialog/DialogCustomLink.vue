<template>
  <!-- 自定义链接地址模态框 -->
  <el-dialog title="自定义链接" :visible.sync="_dialogVisible" width="600px">
    <el-form
      ref="customLinkForm"
      :model="customLinkForm"
      :rules="customLinkRules"
      label-width="90px"
      class="demo-ruleForm"
    >
      <el-form-item label="链接地址" prop="link">
        <el-input v-model="customLinkForm.link" placeholder="请输入要跳转到的链接地址" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" type="primary" @click="submitForm('customLinkForm')">
        保 存
      </el-button>
      <el-button size="medium" @click="_dialogVisible = false">
        取 消
      </el-button>
    </div>
  </el-dialog>
  <!-- 自定义链接地址模态框 end -->
</template>

<script>
export default {
  name: 'DialogCustomLink',
  props: {
    // 模态框是否显示
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 自定义链接表单项
      customLinkForm: {
        link: ''
      },
      // 自定义链接表单规则
      customLinkRules: {
        link: [{ required: true, message: '请输入链接地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
    // 动态获取及修改弹出框是否显示字段
    _dialogVisible: {
      get: function() {
        return this.dialogVisible
      },
      set: function(val) {
        this.$emit('update:dialogVisible', val)
      }
    }
  },
  watch: {
    // 模态框显示时清空输入框数据
    dialogVisible(newVal, oldVal) {
      if (newVal) {
        this.customLinkForm.link = ''
      }
    }
  },
  methods: {
    // 自定义链接地址提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let linkUrl = this.customLinkForm.link
          this.$emit('selectSure', linkUrl)
          this._dialogVisible = false
        }
      })
    }
  }
}
</script>
