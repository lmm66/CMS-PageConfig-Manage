<template>
  <component v-bind="linkProps(to)">
    <!-- 跳转链接的菜单内容，使用插槽 -->
    <slot></slot>
  </component>
</template>

<script>
import { Validator } from '@bigbighu/cms-utils';
export default {
  name: 'AppLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    /**
     *  通过外部传递进来的链接(to属性)
     *  使用@bigbighu/cms-utils的工具方法 Validator.isExternal(url)
     *  判断当前菜单屎内部链接还是外部链接
     *  使用动态组件渲染不同的标签
     * */
    linkProps(url) {
      if (Validator.isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url,
      }
    }
  }
}
</script>

<style lang="less" scoped></style>