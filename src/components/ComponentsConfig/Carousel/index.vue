<template>
  <div>
    <!-- 选择模板 -->
    <ComGroup title="选择模板"
              :select-value="selectLayout">
      <ComRadioGroup v-model="configData.layout"
                     :radio-list="layoutList" />
    </ComGroup>

    <!-- 分割线 -->
    <ComDivider />

    <!-- 添加图片 -->
    <ComGroup title="添加图片"
              :tips="'最多添加' + selectLimitSize + '个广告，鼠标拖拽调整广告顺序，建议宽度750像素'"
              :name-black="true">
    </ComGroup>

    <ComGroup :bg-gray="true"
              :content-block="true">
      <PicList :key="activeIndex"
               :limit-size="selectLimitSize"
               :image-list.sync="configData.imageList"
               :show-name="false"
               :show-add="true"
               input-place-holder="建议10个字以内，可不填" />
    </ComGroup>

    <!-- 其他配置 -->
    <ComGroup title="是否设置边距">
      <!-- <ComRadioGroup v-model="configData.isDefaultMargin" :radio-list="radioList" /> -->
      <el-radio-group v-model="configData.isDefaultMargin">
        <el-radio :label="1">
          是
        </el-radio>
        <el-radio :label="0">
          否
        </el-radio>
      </el-radio-group>
    </ComGroup>
    <ComGroup v-show="!!configData.isDefaultMargin"
              title="图片上下边距">
      <el-slider v-model="configData.marginTopBottom"
                 :max="30"
                 show-input
                 :show-input-controls="false"
                 input-size="mini" />
    </ComGroup>
    <ComGroup v-show="!!configData.isDefaultMargin"
              title="图片左右边距">
      <el-slider v-model="configData.marginLeftRight"
                 :max="30"
                 show-input
                 :show-input-controls="false"
                 input-size="mini" />
    </ComGroup>
    <ComGroup v-show="!!configData.isDefaultMargin && configData.layout === 'single'"
              title="图片边距">
      <el-slider v-model="configData.imageMargin"
                 :max="30"
                 show-input
                 :show-input-controls="false"
                 input-size="mini" />
    </ComGroup>
    <ComGroup title="是否设置圆角">
      <el-radio-group v-model="configData.isBorderRadius">
        <el-radio :label="1">
          是
        </el-radio>
        <el-radio :label="0">
          否
        </el-radio>
      </el-radio-group>
    </ComGroup>
    <ComGroup v-show="!!configData.isBorderRadius"
              title="圆角">
      <el-slider v-model="configData.radius"
                 :max="30"
                 show-input
                 :show-input-controls="false"
                 input-size="mini" />
    </ComGroup>
    <ComGroup title="背景颜色">
      <el-button type="text"
                 class="mr-15"
                 @click="configData.backgroundColor = initBgColor">
        重置
      </el-button>
      <el-color-picker v-model="configData.backgroundColor"
                       size="small" />
    </ComGroup>
  </div>
</template>

<script>
import ComGroup from '@/components/BasicUi/ComGroup'
import ComRadioGroup from '@/components/BasicUi/ComRadioGroup'
import ComDivider from '@/components/BasicUi/ComDivider'
import PicList from '@/components/BasicConfig/PicList'
// import { radiusList } from '@/config/com-radio-group'
import { debounce } from '@/utils'

export default {
  name: 'Carousel',
  components: { ComGroup, ComRadioGroup, ComDivider, PicList },
  props: ['parmes'],
  data () {
    return {
      activeIndex: -1,
      // 初始背景颜色
      initBgColor: '#FFFFFF',
      // 接收当前页面选中组件的data属性并做深拷贝
      configData: JSON.parse(JSON.stringify(this.parmes)),
      // 可选的模板
      layoutList: [
        {
          name: '轮播广告',
          id: 'swiper',
          icon: 'carousel',
          limitSize: 10
        },
        {
          name: '1行1个',
          id: 'single',
          icon: 'up2end',
          limitSize: 10
        }
      ],
      // 图片样式
      // styleList: [
      //   {
      //     name: '有',
      //     id: 'normal',
      //     icon: 'image-ad-normal'
      //   },
      //   {
      //     name: '无',
      //     id: 'shadow',
      //     icon: 'shadow'
      //   }
      // ],
      radioList: [
        {
          name: '否',
          id: 0
        },
        {
          name: '是',
          id: 1
        }
      ]
      // 图片倒角
      // imageRadiusList: radiusList
    }
  },
  computed: {
    // 通过PicList传递的imgUrl修改imageList
    imageList: {
      get: function () {
        return [this.configData.imageList[this.activeIndex]]
      },
      set: function (newVal) {
        this.configData.imageList.splice(this.activeIndex, 1, newVal[0])
      }
    },

    // 不同模板（轮播广告、一行一个）下PicList组件的最大添加数量
    selectLimitSize () {
      return this.layoutList.find(item => item.id = this.configData.layout).limitSize;
    },

    // 当前选择的模板名称（轮播广告、一行一个）
    selectLayout () {
      return this.layoutList.find(item => item.id === this.configData.layout).name;
    },

    // 是否设置边距
    selectMarginStyle () {
      return this.radioList.find(item => item.id === this.configData.isDefaultMargin).name
    },

    // 当前选择的图片倒角
    selectImageRadius () {
      return this.radioList.find(item => item.id === this.configData.isBorderRadius).name
    }
  },
  watch: {
    /**
     * 监听当前组件配置及数据项修改
     * 将修改的值通过触发自定义事件传递给父组件，更新视图
     */
    configData: {
      handler: debounce(function (newVal, oldVal) {
        // 拿到图文广告上下、左右边距属性，添加进marginSize
        const { marginTopBottom, marginLeftRight } = this.configData;
        let marginSize = [marginTopBottom, marginLeftRight];
        newVal = {
          ...newVal,
          marginSize
        };
        delete newVal.marginTopBottom;
        delete newVal.marginLeftRight;
        this.$emit('editComponent', newVal);
      }),
      deep: true
    }
  },
  created () {
    const { marginSize } = this.configData
    if (marginSize && marginSize.length >= 2) {
      const [marginTopBottom, marginLeftRight] = marginSize
      this.configData = {
        ...this.configData,
        marginTopBottom,
        marginLeftRight
      }
    }
  }
}
</script>

