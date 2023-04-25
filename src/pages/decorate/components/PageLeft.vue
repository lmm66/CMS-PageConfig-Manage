<template>
  <div class="page-left">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="(item, index) in componentList"
                        :key="index"
                        :title="item.title"
                        :name="index + 1"
                        class="component-item">
        <ul class="component-list">
          <li v-for='(component, index) in item.components'
              :key="index"
              :draggable="enableDraggable(component)"
              :class="enableDraggable(component) ? 'drag-enabled' : 'drag-disabled'"
              @dragstart="onDragStart(component)"
              @dragend="onDragEnd(component)">
            <i :class="component.iconClass"></i>
            <p class="name">{{ component.name }}</p>
            <p class="num">
              {{ componentMap[component.data.component] || 0 }}/{{ component.maxNumForAdd }}
            </p>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import componentList from '@/config/component-list';
import { mapMutations, mapState, mapActions } from 'vuex';
export default {
  data () {
    return {
      activeNames: [1],
      componentList,
    }
  },
  computed: {
    ...mapState(['addComponentIndex', 'dragComponent']),
    // 获取当前活动页面的各个组件数量
    componentMap () {
      return this.$store.getters.pageComponentTotalMap;
    }
  },
  methods: {
    ...mapActions(['pageChange']),
    // 修改组件的拖拽状态、拖拽的组件数据
    ...mapMutations(['SET_DRAG_STATE', 'SET_DRAG_COMPONENT']),

    // 控制当前组件是否可以拖拽
    enableDraggable (component) {
      // 当前组件被使用的次数与组件使用次数的上限的比值
      let curNum = this.componentMap[component.data.component] || 0;
      if (curNum < component.maxNumForAdd) {
        return true;
      } else {
        return false;
      }
    },

    // 拖拽开始
    onDragStart (component) {
      console.log('拖拽开始');
      this.SET_DRAG_STATE(true);
      this.SET_DRAG_COMPONENT(JSON.parse(JSON.stringify(component)));
    },

    // 拖拽结束
    onDragEnd (component) {
      this.SET_DRAG_STATE(false);
      // 只有当有预添加效果时，才能添加组件
      if (this.addComponentIndex != null) {
        console.log('当前有预添加效果，添加组件!');
        this.pageChange({
          type: 'add',
          index: this.addComponentIndex,
          data: this.dragComponent
        })
      } else {
        console.log('当前没有预添加效果，不添加组件!');
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 左侧框架
.page-left {
  position: absolute;
  top: 55px;
  left: 0;
  bottom: 0;
  width: 186px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  user-select: none;
  z-index: 10;
}

// 组件列表
.component-item {
  padding: 0 20px;
  margin-top: 22px;

  .component-list {
    overflow: hidden;
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 50%;
      font-size: 12px;
      padding-bottom: 8px;
      text-align: center;

      &.drag-enabled {
        cursor: move;
      }

      &.drag-disabled {
        cursor: not-allowed;
      }

      &.drag-enabled:hover,
      &.drag-disabled:hover {
        background: @color-1;
        color: #fff;
        border-radius: 2px;

        .num,
        .name {
          color: #ffffff !important;
        }

        .ico {
          background-position: 0 -32px;
        }
      }

      i {
        font-size: 28px;
      }

      .name {
        line-height: 16px;
        margin-top: -4px;
      }

      .num {
        font-size: 12px;
        color: #999999;
      }

      .ico {
        display: inline-block;
        margin-top: 8px;
        background-position: 0 0;
        height: 32px;
        width: 32px;
        background-size: cover;
      }
    }
  }
}

// 折叠面板样式
.el-collapse {
  border: none;

  /deep/ .el-collapse-item__header {
    border: none;
    height: 30px;
    line-height: 30px;
  }

  /deep/ .el-collapse-item__wrap {
    border: none;
  }

  /deep/ .el-collapse-item__content {
    padding-bottom: 0;
  }
}
</style>