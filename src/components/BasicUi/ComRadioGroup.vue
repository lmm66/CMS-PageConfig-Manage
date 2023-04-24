<template>
  <!-- 组件编辑单选按钮组 -->
  <div class="com-radio-group" :class="{'com-radio-group-block': contentBlock}">
    <span
      v-for="item in radioList"
      :key="item.id"
      class="com-radio-button"
      :class="{'active':value == item.id}"
      @click="setValue(item.id)"
    >
      <!-- 有icon图标 -->
      <el-tooltip v-if="item.icon" class="item" effect="dark"
                  :content="item.name" placement="bottom"
      >
        <button type="button" class="button">
          <i :class="'deco-icon-'+item.icon" />
        </button>
      </el-tooltip>
      <!-- 无icon图标 -->
      <button v-else type="button" class="button">
        {{ item.name }}
      </button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ComRadioGroup',
  props: {
    // 单选按钮组数据
    radioList: {
      type: Array,
      required: true
    },
    // 按钮组内容是否自动按父级宽度100%填充
    contentBlock: Boolean,
    value: {
      type: [String, Number], default: null
    } // 当前选中的按钮id
  },
  methods: {
    // 按钮选择事件
    setValue(id) {
      this.$emit('input', id)
    }
  }
}
</script>

<style lang="less" scoped>
// 组件编辑-单选按钮组
.com-radio-group {
  display: flex;
  flex-wrap: wrap;
  &.com-radio-group-block {
    width: 100%;
    .com-radio-button {
      flex: 1;
      .button {
        width: 100%;
        padding: 0;
      }
    }
  }
  .com-radio-button {
    margin-left: -1px;
    &:first-child {
      margin: 0;
      .button {
        border-radius: 2px 0 0 2px;
      }
    }
    &:last-child {
      .button {
        border-radius: 0 2px 2px 0;
      }
    }
  }
}
// 单个单选按钮
.com-radio-button {
  position: relative;
  display: inline-block;
  &:hover, &.active {
    z-index: 3;
    .button {
      border-color: @color-1;
      color: @color-1;
    }
    [class^="deco-icon-"] {
      color: @color-1;
    }
  }
  &.active {
    .button {
      background-color: @color-1-bg;
    }
  }
  .button {
    display: inline-block;
    padding: 0 14px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    font-weight: 500;
    background: #fff;
    border: 1px solid #ebedf0;
    text-align: center;
    vertical-align: middle;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s;
  }
  [class^="deco-icon-"] {
    font-size: 20px;
    color: #979797;
  }
}
</style>
