<template>
  <div class="app-wrapper">
    <div class="drawer-bg">
      <!-- 左侧菜单部分组件 -->
      <Sidebar class="sidebar-container" />
      <div class="main-container">
        <Navbar />
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from '@/components/';
export default {
  components: {
    Sidebar,
    Navbar,
    AppMain
  }
}
</script>

<style lang="less" scoped>
.app-wrapper {
  &:after {
    content: '';
    display: table;
    clear: both;
  }

  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  // background: #000;
  // opacity: 0.3;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 220px);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

#app .hideTree {
  margin-left: 0 !important; // 隐藏左侧菜单
}
</style>
