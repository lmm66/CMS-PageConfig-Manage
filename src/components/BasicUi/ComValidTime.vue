<template>
  <ComGroup title="生效时间">
    <el-date-picker v-model="dateArray"
                    size="mini"
                    type="daterange"
                    format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期" />
  </ComGroup>
</template>
<script>
import ComGroup from '@/components/BasicUi/ComGroup'
export default {
  components: { ComGroup },
  props: {
    value: {
      type: Array,
      default: null
    }
  },
  computed: {
    dateArray: {
      get () {
        return this.value
      },
      set (v) {
        let newDate = v ? [v[0].getTime(), v[1].getTime()] : []
        this.$emit('input', newDate)
      }
    }
  }
}
</script>
<style scoped lang="less">
/deep/.el-date-editor {
  width: 100% !important;
}
</style>
