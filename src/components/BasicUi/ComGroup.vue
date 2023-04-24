<template>
  <!-- 组件编辑模块 -->
  <div class="com-group"
       :class="{ 'com-group-bg-gray': bgGray }">
    <dl class="com-group-container"
        :class="{ 'com-group-container-block': contentBlock }">
      <dt v-if="title || selectValue"
          class="com-group-header">
        <h2 class="com-name"
            :class="{ 'com-name-black': nameBlack }"
            :style="{ width: labelWidth }">
          {{ title }}
        </h2>
        <label v-if="selectValue"
               class="com-value">{{ selectValue }}</label>
      </dt>
      <dd class="com-content">
        <slot />
      </dd>
    </dl>
    <p v-if="tips"
       class="com-help-desc com-help-desc-tips mt-10">
      {{ tips }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ComGroup',
  props: {
    title: {
      type: String,
      default: ''
    }, // 模块标题
    selectValue: {
      type: String,
      default: ''
    }, // 模块选择的值
    tips: {
      type: String,
      default: ''
    }, // 提示文本
    // 内容模块是否换行展示
    contentBlock: {
      type: Boolean,
      default: false
    },
    // 标题颜色是否加深
    nameBlack: {
      type: Boolean,
      default: false
    },
    // 背景颜色是否为深色
    bgGray: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: ''
    } // 例： 100px
  }
}
</script>

<style lang="less" scoped>
// 组件编辑-单项盒子
.com-group {
  padding: 12px 16px;

  &.com-group-bg-gray {
    background: #f7f8fa;
  }
}

.com-group-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;

  .com-group-header {
    display: flex;
    align-items: center;

    .com-name {
      margin-right: 16px;
      font-size: 14px;
      color: #969799;
      line-height: 18px;
      white-space: nowrap;

      &.com-name-black {
        color: #323233;
      }
    }

    .com-value {
      font-size: 14px;
      font-weight: 500;
      color: #323233;
      line-height: 18px;
      margin-right: 16px;
    }
  }

  .com-content {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }

  &.com-group-container-block {
    flex-direction: column;
    align-items: stretch;

    .com-content {
      display: block;
    }

    .com-group-header + .com-content {
      margin-top: 10px;
    }
  }
}

// 提示文本
.com-help-desc {
  font-size: 12px;
  line-height: 18px;
  color: #323233;
}

.com-help-desc-tips {
  color: #969799;
}
</style>
