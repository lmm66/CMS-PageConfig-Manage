<template>
  <div>
    <ComGroup title="魔方布局" tips="选定布局区域，在下方添加图片，建议添加比例一致的图片" :name-black="true" />

    <!-- 魔方展示区域 -->
    <div class="com-group-magic">
      <div class="magic-box" :class="selectStyle.id">
        <div v-for="(item, index) in configData.imageList" :key="index" class="magic-item"
          :class="['magic-' + (index + 1), { 'nodata': !item.imageUrl, 'active': activeIndex === index }]"
          @click="activeIndex = index">
          <img v-if="item.imageUrl" :src="item.imageUrl">
          <div v-else class="deafult-desc">
            {{ selectStyle.list[index] }}
            <!-- <div v-if="selectStyle.equalScale">或同等比例</div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- 修改图片 -->
    <ComGroup :bg-gray="true" :content-block="true">
      <PicList :key="activeIndex" :image-list.sync="selectPic" :show-name="false" :show-add="false" :show-delete="false"
        :un-graggable="true" />
    </ComGroup>

    <ComGroup title="选择模板" :content-block="true" :select-value="selectStyle.name">
      <ComRadioGroup v-model="configData.template" :radio-list="styleList" :content-block="true" />
    </ComGroup>

    <ComGroup title="页面边距">
      <el-slider v-model="configData.pageMargin" :max="30" show-input :show-input-controls="false" input-size="mini" />
    </ComGroup>
    <ComGroup title="图片间隙">
      <el-slider v-model="configData.imgMargin" :max="30" show-input :show-input-controls="false" input-size="mini" />
    </ComGroup>
    <ComGroup title="图片圆角">
      <el-slider v-model="configData.radius" :max="30" show-input :show-input-controls="false" input-size="mini" />
    </ComGroup>
  </div>
</template>

<script>
import ComGroup from '@/components/BasicUi/ComGroup'
import ComRadioGroup from '@/components/BasicUi/ComRadioGroup'
import PicList from '@/components/BasicConfig/PicList'
import { debounce } from '@/utils'

export default {
  name: 'CubeSelection',
  components: { ComGroup, ComRadioGroup, PicList },
  props: ['parmes'],
  data () {
    return {
      // 当前组件数据
      configData: JSON.parse(JSON.stringify(this.parmes)),
      // 当前编辑的魔方索引
      activeIndex: 0,
      // 可选模板
      styleList: [
        {
          name: '一行二个',
          id: 'oneLine2',
          icon: 'cuberow',
          list: ['宽度375像素', '宽度375像素']
        },
        {
          name: '一行三个',
          id: 'oneLine3',
          icon: 'cuberow2',
          list: ['宽度250像素', '宽度250像素', '宽度250像素']
        },
        {
          name: '一行四个',
          id: 'oneLine4',
          icon: 'cuberow1',
          list: ['宽度188像素', '宽度188像素', '宽度188像素', '宽度188像素']
        },
        {
          name: '一左二右',
          id: 'left1right2',
          icon: 'cubeto',
          equalScale: true,
          list: ['宽度375像素', '宽度375像素', '宽度375像素']
        },
        {
          name: '二左二右',
          id: 'left2right2',
          icon: 'cube',
          equalScale: true,
          list: ['宽度375像素', '宽度375像素', '宽度375像素', '宽度375像素']
        },
        {
          name: '一左三右',
          id: 'left1right3',
          icon: 'cubeto1',
          equalScale: true,
          list: ['宽度375像素', '宽度375像素', '宽度188像素', '宽度188像素']
        },
        {
          name: '一上二下',
          id: 'top1bottom2',
          icon: 'cube-upto',
          equalScale: true,
          list: ['宽度750像素', '宽度375像素', '宽度375像素']
        }
      ]
    }
  },
  computed: {
    // 列表样式
    selectStyle () {
      return this.styleList.find(item => item.id === this.configData.template)
    },
    selectPic: {
      get: function () {
        return [this.configData.imageList[this.activeIndex]]
      },
      set: function (newVal) {
        this.configData.imageList.splice(this.activeIndex, 1, newVal[0])
        console.log('魔方图片被修改')
      }
    }
  },
  watch: {
    // 监听当前选择的模板，根据模板确定展示的数量
    selectStyle: {
      handler: function (newVal, oldVal) {
        this.activeIndex = 0
        let diffLength = newVal.list.length - this.configData.imageList.length
        if (diffLength > 0) {
          for (let i = 0; i < diffLength; i++) {
            this.configData.imageList.push({
              imageUrl: '',
              link: null
            })
          }
        } else if (diffLength < 0) {
          this.configData.imageList.splice(-1, Math.abs(diffLength))
        }
      },
      immediate: true
    },
    // 监听当前组件配置及数据项修改
    configData: {
      handler: debounce(function (newVal, oldVal) {
        console.log('魔方配置修改', newVal)
        // 更新组件配置数据
        this.$emit('editComponent', newVal)
      }),
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.com-group-magic {
  padding: 0 16px 12px;
}

// 魔方布局样式
.magic-box {
  position: relative;
  width: 100%;
  display: flex;
  box-sizing: border-box;

  .magic-item {
    flex: 1;
    position: relative;
    background-color: #fff;
    border: 1px solid #ebedf0;
    color: #7d7e80;
    cursor: pointer;
    text-align: center;
    margin-left: -1px;
    box-sizing: border-box;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &:first-child {
      margin: 0;
    }

    &.active {
      background: @color-1-bg;
      border: 1px solid @color-1;
      color: @color-1;
      z-index: 2;
    }

    .deafult-desc {
      font-size: 12px;
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }

  // 一行布局，高度自动撑开
  &.oneLine2 {
    .nodata {
      padding-bottom: 50%;
    }
  }

  &.oneLine3 {
    .nodata {
      padding-bottom: 33.33%;
    }
  }

  &.oneLine4 {
    .nodata {
      padding-bottom: 24%;
    }
  }

  // 复杂布局，固定高度
  &.left1right2 {
    display: block;

    .magic-1 {
      width: 50%;
      padding-bottom: 100%;
    }

    .magic-2,
    .magic-3 {
      position: absolute;
      left: 50%;
      width: 50%;
      padding-bottom: 50%;
    }

    .magic-2 {
      top: 0;
    }

    .magic-3 {
      top: 50%;
      padding-bottom: calc(50% - 1px);
    }
  }

  &.left2right2 {
    flex-wrap: wrap;

    .magic-item {
      flex: auto;
      margin: -1px;
      width: 50%;
      padding-bottom: 50%;

      &.magic-3,
      &.magic-4 {
        margin-top: -1px;
      }
    }
  }

  &.left1right3 {
    display: block;

    .magic-1 {
      width: 50%;
      padding-bottom: 100%;
    }

    .magic-2 {
      position: absolute;
      left: 50%;
      top: 0;
      width: 50%;
      padding-bottom: 50%;
    }

    .magic-3,
    .magic-4 {
      position: absolute;
      top: 50%;
      width: 25%;
      padding-bottom: calc(50% - 1px);
    }

    .magic-3 {
      left: 50%;
    }

    .magic-4 {
      left: 75%;
      width: calc(25% + 1px);
      margin-left: -2px;
    }
  }

  &.top1bottom2 {
    flex-wrap: wrap;

    .magic-item {
      flex: auto;
    }

    .magic-1 {
      width: 100%;
      padding-bottom: 50%;
    }

    .magic-2,
    .magic-3 {
      margin: -1px 0 0 0;
      width: 50%;
      padding-bottom: 50%;
    }

    .magic-3 {
      margin-left: -1px;
    }
  }

  &.left1right2,
  &.left2right2,
  &.left1right3,
  &.top1bottom2 {
    .magic-item {
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
