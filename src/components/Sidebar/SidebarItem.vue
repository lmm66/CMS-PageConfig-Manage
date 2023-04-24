<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 单级菜单 -->
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <!-- 封装AppLink组件处理菜单的不同跳转 -->
      <app-link v-if="item.redirect != 'noRedirect' && onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" class="submenu-title-noDropdown">
          <i class="el-icon-tickets"></i>
          {{ onlyOneChild.meta.title }}
        </el-menu-item>
      </app-link>
    </template>
    <!-- 存在多级菜单 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template slot="title">
        <!-- 封装函数式组件Item，自定义多级菜单的内容（icon、title） -->
        <item :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!-- 递归组件，渲染多个层级菜单 -->
      <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)"
        class="nest-menu"></sidebar-item>
    </el-submenu>
  </div>
</template>
 
<script>
import path from 'path';
import { Validator } from '@bigbighu/cms-utils';
import AppLink from './Link.vue';
import Item from './Item.vue'
export default {
  name: 'SidebarItem',
  components: {
    AppLink,
    Item
  },
  // 定义组件需要接收哪些数据
  props: {
    // 从父组件传递的数据对象，即要渲染的菜单内容
    item: {
      type: Object,
      required: true
    },
    // 作为当前路由的公共路径
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: ''
    }
  },
  methods: {
    /**
     * 判断当前菜单是否包含子菜单
     * */
    hasOneShowingChild(children = [], parent) {
      // 判断子菜单是否存在数据
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          return true;
        }
      })
      // 根据是否包含子菜单来决定页面的渲染数据
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true;
      }
      return false;
    },

    /**
     * 返回链接的标识 
     * */
    resolvePath(routePath) {
      if (Validator.isExternal(routePath)) {
        return routePath;
      }
      if (Validator.isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
}
</script>
<style lang="less" scoped>
#app .hideSidebar .el-submenu>.el-submenu__title .iconfont {
  margin-left: 18px;
}

#app .el-menu-item {
  display: flex;
  align-items: center;
}

#app .el-menu-item [class^='el-icon-'] {
  font-size: 20px;
}
</style>