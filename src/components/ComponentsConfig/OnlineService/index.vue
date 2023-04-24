<template>
  <ComGroup title="文案" label-width="56px">
    <el-input v-model="configData.text" :disabled="true" size="mini" placeholder="文字建议4个字" />
  </ComGroup>
</template>
<script>
import ComGroup from '@/components/BasicUi/ComGroup'
export default {
  name: 'OnlineService',
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
<style scoped lang="less">
.com-name {
  width: 100px;
}
</style>
