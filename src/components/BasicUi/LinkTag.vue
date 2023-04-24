<template>
  <!-- 链接标签模块 -->
  <div class="com-link-tag"
       :class="{'com-link-tag-colored': colored, 'com-link-tag-linkable': linkable}">
    <span class="link-tag-content">{{ tagName }}</span>
    <span class="link-tag-edit"
          @click="tagEdit">
      <i class="el-icon-edit" />
    </span>
    <span v-if="showDelete"
          class="link-tag-delete"
          @click="$emit('tagDelete')">
      <i class="el-icon-delete" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'LinkTag',
  props: {
    tagName: {
      type: String, default: null
    }, // 标签名称
    // 标签是否带边框颜色
    colored: {
      type: Boolean,
      default: true
    },
    // 标签是否可以点击（为true时标签名称为主色）
    linkable: {
      type: Boolean,
      default: true
    },
    // 标签是否可以删除
    showDelete: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    tagEdit () {
      this.$emit('tagEdit')
    },
    tagDelete () {
      this.$emit('tagDelete')
    }
  }
}
</script>

<style lang="less" scoped>
.com-link-tag {
  display: flex;
  width: 100%;
  align-items: center;
  border: 1px solid transparent;
  font-size: 12px;
  &.com-link-tag-colored {
    padding: 0 8px;
    border-radius: 2px;
    background-color: @color-1-bg;
    font-size: 14px;
    color: @color-1;
    .link-tag-content {
      padding: 7px 8px;
    }
    .link-tag-edit,
    .link-tag-delete {
      color: inherit;
    }
  }
  &.com-link-tag-linkable {
    color: @color-1;
    &.com-link-tag-colored {
      border: 1px solid @color-1;
    }
  }
  .link-tag-content {
    flex: 1;
    height: 20px;
    color: #323232;
    font-size: inherit;
    line-height: 20px;
    text-align: left;
    .ellipsis();
  }
  .link-tag-edit,
  .link-tag-delete {
    margin-left: auto;
    padding: 0 8px;
    font-size: 16px;
    line-height: 28px;
    color: #969799;
    cursor: pointer;
  }
}
</style>
