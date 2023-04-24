export default {
  props: {
    clickType: Number
  },
  beforeDestroy() {
    this.eventBus.$off(`setData_${this.clickType}`, this.setData)
  },
  mounted() {
    this.eventBus.$on(`setData_${this.clickType}`, this.setData)
  },
  methods: {
    clearData() {
      let ref = this.$refs['formRef']
      ref.resetFields()
      this.$nextTick(() => {
        ref.clearValidate()
      })
    },
    setData(data) {
      let hasData = data && Object.keys(data).length > 0
      if (hasData) {
        this.formData = data
      } else {
        this.clearData()
      }
    },
    onDataChange(data) {
      this.$refs['formRef'].validate((valid) => {
        this.hasError = !valid
        if (valid) {
          this.$emit('onChange', Object.assign({}, this.formData))
        }
      })
    }
  }
}
