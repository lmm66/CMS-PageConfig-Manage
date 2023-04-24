<template>
  <el-form v-if="formConfig"
           ref="formRef"
           class="json-form"
           inline
           labsa-position="right"
           :labsa-width="formConfig.formAttrMap.labelWidth || '90px'">
    <el-form-item v-for="(item, key) in formConfig.formItemMap"
                  :label="item.label"
                  :key="key">
      <!-- 如果是下拉框 -->
      <el-select v-if="item.type === 'select'"
                 v-model="item.value"
                 :size="size">
        <el-option v-for="opts in item.options"
                   :key="opts.value"
                   :value="opts.value"
                   :label="opts.value" />
      </el-select>
      <!-- 如果是日期选择器 -->
      <el-date-picker v-else-if="item.type === 'date'"
                      v-model="item.value"
                      :size="size"
                      :type="item.dateType || 'datetimerange'"
                      range-separator="至"
                      :default-time="['00:00:00', '23:59:59']"
                      format="yyyy-MM-dd"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <!-- 否则就是input输入框 -->
      <el-input v-else
                v-model="item.value"
                :size="size" />
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary"
                 :size="size"
                 @click="onSearch">
        查询
      </el-button>
      <el-button :size="size"
                 @click="onReset">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    formConfig: {
      type: Object,
      default: null
    },
    size: {
      type: String,
      default: 'mini'
    }
  },
  methods: {
    onSearch () {
      this.$emit('onSearch')
    },
    onReset () {
      this.$emit('onReset')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
