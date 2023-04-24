<template>
  <div class="assist-line">
    <ComGroup title="类型">
      <el-radio-group v-model="configData.type">
        <el-radio :label="1">
          辅助线
        </el-radio>
        <el-radio :label="2">
          辅助空白
        </el-radio>
      </el-radio-group>
    </ComGroup>
    <div v-if="configData.type === 1">
      <ComGroup title="线颜色">
        <el-color-picker v-model="configData.borderColor" size="mini" />
        <el-button type="text" size="mini">
          重置
        </el-button>
      </ComGroup>
      <ComGroup title="背景色">
        <el-color-picker v-model="configData.backgroundColor" size="mini" />
        <el-button type="text" size="mini">
          重置
        </el-button>
      </ComGroup>
      <ComGroup title="高度">
        <el-slider v-model="configData.height" :max="100" show-input :show-input-controls="false" input-size="mini" />
      </ComGroup>
      <ComGroup title="边距">
        <el-radio-group v-model="configData.paddingVisible">
          <el-radio :label="false">
            无边距
          </el-radio>
          <el-radio :label="true">
            有边距
          </el-radio>
        </el-radio-group>
      </ComGroup>
      <ComGroup title="样式">
        <el-radio-group v-model="configData.borderStyle">
          <el-radio label="solid">
            实线
          </el-radio>
          <el-radio label="dashed">
            虚线
          </el-radio>
          <el-radio label="dotted">
            点线
          </el-radio>
        </el-radio-group>
      </ComGroup>
    </div>
    <div v-if="configData.type === 2">
      <ComGroup title="空白高度">
        <el-slider v-model="configData.height" :max="100" show-input :show-input-controls="false" input-size="mini" />
      </ComGroup>
    </div>
  </div>
</template>
<script>
import ComGroup from '@/components/BasicUi/ComGroup'
export default {
  name: 'AssistLine',
  components: { ComGroup },
  props: {
    parmes: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      configData: JSON.parse(JSON.stringify(this.parmes))
    }
  },
  watch: {
    configData: {
      handler (v) {
        this.$emit('editComponent', v)
      },
      deep: true
    }
  }
}
</script>
<style type="less" scoped>
/* /deep/.el-color-picker {
  vertical-align: top;
  margin-right: 8px;
} */

.assist-line {}
</style>
