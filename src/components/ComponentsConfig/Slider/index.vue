<template>
  <div>
    <!-- 选择模板 -->
    <ComGroup title="边距设置">
      <el-radio-group v-model="configData.isDefaultMargin">
        <el-radio :label="true">
          默认
        </el-radio>
        <el-radio :label="false">
          自定义
        </el-radio>
      </el-radio-group>
    </ComGroup>
    <div v-if="!configData.isDefaultMargin">
      <ComGroup title="上下边距">
        <el-slider v-model="configData.padding[0]" :max="30" show-input :show-input-controls="false" input-size="mini" />
      </ComGroup>
      <ComGroup title="左右边距">
        <el-slider v-model="configData.padding[1]" :max="30" show-input :show-input-controls="false" input-size="mini" />
      </ComGroup>
      <ComGroup title="图片边距">
        <el-slider v-model="configData.imageMargin" :max="30" show-input :show-input-controls="false" input-size="mini" />
      </ComGroup>
    </div>

    <!-- 分割线 -->
    <ComDivider />

    <!-- 添加图片 -->
    <ComGroup title="上传图片" tips="建议图片宽度为300px，高度为100-360px，支持图片格式jpg/png，拖动选中的模块可对其排序" :name-black="true" />

    <ComGroup :bg-gray="true" :content-block="true">
      <PicList :image-list.sync="configData.imageList" add-place-holder="添加图片" />
    </ComGroup>

    <!-- 颜色配置 -->
    <ComGroup title="背景颜色">
      <el-button type="text" class="mr-15" @click="configData.backgroundColor = initBgColor">
        重置
      </el-button>
      <el-color-picker v-model="configData.backgroundColor" size="small" />
    </ComGroup>
  </div>
</template>

<script>
import ComGroup from '@/components/BasicUi/ComGroup'
import ComDivider from '@/components/BasicUi/ComDivider'
import PicList from '@/components/BasicConfig/PicList'

export default {
  name: 'Slider',
  components: { ComGroup, ComDivider, PicList },
  props: ['parmes'],
  data () {
    return {
      // 当前组件数据
      configData: JSON.parse(JSON.stringify(this.parmes)),
      // 初始背景颜色
      initBgColor: '#FFF'
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
