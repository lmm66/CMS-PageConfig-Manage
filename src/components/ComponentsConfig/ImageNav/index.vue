<template>
  <div>
    <!-- 选择模板 -->
    <ComGroup title="选择模板"
              :select-value="selectLayout.name">
      <ComRadioGroup v-model="configData.layout"
                     :radio-list="layoutList" />
    </ComGroup>

    <!-- 分割线 -->
    <ComDivider />
    <ComGroup title="圆角">
      <!-- <el-input-number v-model="configData.borderRadius"></el-input-number> -->
      <el-slider v-model="configData.borderRadius"
                 show-input
                 :show-input-controls="false"
                 input-size="mini" />
    </ComGroup>
    <!-- 内边距 -->
    <ComGroup title="边距设置">
      <el-radio v-model="paddingDefault"
                :label="true">
        默认
      </el-radio>
      <el-radio v-model="paddingDefault"
                :label="false">
        自定义
      </el-radio>
    </ComGroup>
    <div v-if="!paddingDefault">
      <ComGroup title="上下边距">
        <el-slider v-model="configData.columnPadding"
                   show-input
                   :show-input-controls="false"
                   input-size="mini" />
      </ComGroup>
      <ComGroup title="左右边距">
        <el-slider v-model="configData.rowPadding"
                   show-input
                   :show-input-controls="false"
                   input-size="mini" />
      </ComGroup>
    </div>
    <ComGroup title="单行个数">
      <el-slider v-model="configData.lineNumber"
                 show-input
                 :show-input-controls="false"
                 input-size="mini"
                 :max="8"
                 :min="1" />
    </ComGroup>
    <!-- 添加图片 -->
    <ComGroup title="添加导航"
              tips="最多添加 10 个导航，拖动选中的导航可对其排序"
              :name-black="true" />

    <ComGroup :content-block="true">
      <PicList :image-list.sync="configData.imageList"
               add-place-holder="添加图文导航"
               :show-pic="selectLayout.id === 'pic'" />
    </ComGroup>

    <!-- 颜色配置 -->
    <ComGroup title="背景颜色">
      <el-button type="text"
                 class="mr-15"
                 @click="configData.backgroundColor = initBgColor">
        重置
      </el-button>
      <el-color-picker v-model="configData.backgroundColor"
                       size="small" />
    </ComGroup>
    <ComGroup title="文字颜色">
      <el-button type="text"
                 class="mr-15"
                 @click="configData.textColor = initTxtColor">
        重置
      </el-button>
      <el-color-picker v-model="configData.textColor"
                       size="small" />
    </ComGroup>
  </div>
</template>

<script>
import ComGroup from '@/components/BasicUi/ComGroup'
import ComRadioGroup from '@/components/BasicUi/ComRadioGroup'
import ComDivider from '@/components/BasicUi/ComDivider'
import PicList from '@/components/BasicConfig/PicList'

export default {
  name: 'Navigation',
  components: { ComGroup, ComRadioGroup, ComDivider, PicList },
  props: ['parmes'],
  data () {
    return {
      // 当前组件数据
      configData: JSON.parse(JSON.stringify(this.parmes)),
      // 初始背景颜色
      initBgColor: '#FFFFFF',
      // 初始文本颜色
      initTxtColor: '#323233',
      // 支持的模板类型
      layoutList: [
        {
          name: '图片导航',
          id: 'pic',
          icon: 'up2end'
        }
        // {
        //   name: '文字导航',
        //   id: 'txt',
        //   icon: 'nav-slide'
        // }
      ],
      // 是否默认边距
      paddingDefault: true
    }
  },
  computed: {
    // 当前选择的模板对象
    selectLayout () {
      return this.layoutList.find((item) => item.id === this.configData.layout)
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
