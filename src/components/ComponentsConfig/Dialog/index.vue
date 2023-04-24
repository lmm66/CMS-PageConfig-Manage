<template>
  <div>
    <ComGroup title="出现时机" :content-block="true" :select-value="selectTimingStyle">
      <ComRadioGroup v-model="configData.timing" :radio-list="timingStyleList" :content-block="true" />
    </ComGroup>

    <!-- 分割线 -->
    <ComDivider />

    <!-- 添加图片 -->
    <ComGroup title="上传图片" tips="建议图片宽度为600-660px，高度为720-840px，支持图片格式jpg/png/gif，大小不超过500k" :name-black="true" />

    <ComGroup :bg-gray="true" :content-block="true">
      <PicList :image-list.sync="configData.imageList" add-place-holderr="添加图片" :limit-size="1" :show-add="false" />
    </ComGroup>
  </div>
</template>

<script>
import ComGroup from '@/components/BasicUi/ComGroup'
import ComDivider from '@/components/BasicUi/ComDivider'
import PicList from '@/components/BasicConfig/PicList'
import ComRadioGroup from '@/components/BasicUi/ComRadioGroup'

export default {
  name: 'Dialog',
  components: { ComGroup, ComDivider, PicList, ComRadioGroup },
  props: ['parmes'],
  data () {
    return {
      // 当前组件数据
      configData: JSON.parse(JSON.stringify(this.parmes)),
      timingStyleList: [
        {
          name: '每次访问出现',
          id: 'every'
        },
        {
          name: '每天出现一次',
          id: 'day'
        },
        {
          name: '只展示1次',
          id: 'once'
        }
      ]
    }
  },
  computed: {
    selectTimingStyle () {
      return this.timingStyleList.find(
        item => item.id === this.configData.timing
      ).name
    }
  },
  watch: {
    // 监听当前组件配置及数据项修改
    configData: {
      handler: function (newVal, oldVal) {
        console.log('图文导航配置修改', newVal)
        // 更新组件配置数据
        this.$emit('editComponent', newVal)
      },
      deep: true
    }
  }
}
</script>
