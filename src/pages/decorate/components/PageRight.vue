<template>
  <div class="page-right">
    <change-type v-model="setType"></change-type>
    <!-- 页面设置 -->
    <div v-show="setType === 1">
      <page-info></page-info>
    </div>
    <!-- 组件设置 -->
    <div v-show="setType === 2">
      <com-title :title="(currentComponent && currentComponent.name) || '组件设置'"></com-title>
      <!-- 生效事件组件 -->
      <com-valid-time v-model="currentComponent.data.validTime"
                      v-if="currentComponent"></com-valid-time>
      <no-select v-if="!currentComponent"></no-select>
      <!-- 动态注册可配置组件 -->
      <component :is="currentComponent.data.component"
                 :parmes="currentComponent.data"
                 @editComponent="editComponent"
                 v-if="currentComponent">
      </component>
    </div>
  </div>
</template>

<script>
import ChangeType from './components/ChangeSetType';
import PageInfo from './components/SetPageInfo';
import NoSelect from './components/NoSelect';
import ComTitle from '@/components/BasicUi/ComTitle';
import ComValidTime from '@/components/BasicUi/ComValidTime.vue';
import { dynamicComponents } from '@/utils';
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    ChangeType,
    PageInfo,
    NoSelect,
    ComTitle,
    ComValidTime,
    ...dynamicComponents()
  },
  computed: {
    ...mapState(['pageData', 'activeComponentId']),
    // 当前设置内容 1-页面；2-组件
    setType: {
      get () {
        return this.$store.state.setType;
      },
      set (val) {
        this.$store.commit('SET_SETTYPE', val);
      },
    },
    // 当前选中编辑的组件
    currentComponent () {
      let componentList = this.pageData.componentList;
      let selectedAndEditComponent = componentList && componentList.length > 0 ? componentList.find(item => item.id === this.activeComponentId) : null;
      console.log('当前选中的组件为:', selectedAndEditComponent)
      return selectedAndEditComponent;
    }
  },
  methods: {
    ...mapActions(['pageChange']),
    // 接收子组件回传的数据并更新store中的pageData
    editComponent (newConfig) {
      console.log('newConfig:', newConfig);
      this.pageChange({
        type: 'edit',
        id: this.activeComponentId,
        newConfig
      })
    }
  },
  mounted () {
    // console.log(this.currentComponent)
    // 打印通过require.context根据目录动态注册的组件列表
    // console.log(dynamicComponents())
  }
}
</script>

<style lang="less">
@import url('~@/styles/icon.less');

.page-right {
  position: absolute;
  top: 56px;
  right: 0;
  bottom: 0;
  width: 376px;
  padding-bottom: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
}

// 组件配置模块
.com-group {
  // slide 滑块
  .el-slider {
    width: 95%;

    .el-slider__input {
      width: 60px;
    }

    .el-slider__runway {
      margin-right: 80px;
    }
  }

  // 单选框
  .el-radio {
    line-height: 30px;
    color: #323233;
  }
}

// 右上角删除样式
.up-pic-item-delete {
  position: absolute;
  cursor: pointer;
  font-size: 20px;
  right: -10px;
  top: -10px;
  color: #bbb;
  background: #fff;
  border-radius: 50%;
  visibility: hidden;
  z-index: 2;

  &:hover {
    color: #aaa;
  }
}
</style>