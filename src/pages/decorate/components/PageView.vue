<template>
  <div class="page-view"
       ref="pageView">
    <div class="preview">
      <div class="preview-head">
        <div class="preview-head-title">
          {{ pageData.name || '微页面标题' }}
        </div>
      </div>
      <div class="preview-wrap">
        <iframe :src="decorateViewSrc"
                id="previewIframe"
                title="频道名称"
                frameborder="0"
                class="preview-iframe"
                width="100%"
                :height="previewHeight"
                @load="onloadH5"></iframe>
      </div>
      <div v-if="dragActive"
           class="preview-drag-mask"
           @dragover="onDragover($event)"></div>
      <div v-if="dragActive"
           class="preview-drag-out"
           @dragover="onDragout($event)"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import setting from '@/config'
export default {
  computed: {
    // 拿到页面详情数据
    ...mapState(['pageData', 'previewHeight', 'dragActive', 'componentsTopList', 'addComponentIndex']),

    // 拼接跨源通信目标窗口源地址
    decorateViewSrc () {
      return setting.decorateViewSrc + `?pageId=${this.$route.query.id || ''}&noLogin=true`;
    }
  },
  methods: {
    ...mapActions(['initMessage', 'pageChange']),
    ...mapMutations(['SET_DRAG_INDEX', 'VIEW_ADD_PREVIEW']),
    // 拖拽组件进入H5页面回调
    onDragover (e) {
      // 禁止拖拽默认事件，代表拖拽元素可以放置在此区域
      e.preventDefault();
      // 拿到鼠标距离浏览器窗口的高度 + H5页面滚动超出浏览器的高度 - 空白高度
      const dropTop = e.pageY + this.$refs.pageView.scrollTop - 191;
      // TODO:获取当前拖动组件要添加位置的索引
      let addIndex = 0;
      for (let i = this.componentsTopList.length - 1; i >= 0; i--) {
        let curComTopVal = this.componentsTopList[i];     // 当前组件距离H5顶部的高度
        let prevComTopVal = this.componentsTopList[i - 1] || 0;     // 当前组件前一个组件距离H5顶部的高度
        let halfTopVal = (curComTopVal - prevComTopVal) / 2;      // 当前组件高度的一半
        // 如果当前鼠标位置小于第一个组件高度的一半，直接break，意为添加到第一个组件
        if (i === 0 && dropTop <= halfTopVal) break;
        // 如果当前鼠标位置超过当前组件高度的一半，添加到当前组件后面
        if (dropTop > (curComTopVal - halfTopVal)) {
          addIndex = i + 1;
          break;
        }
      }
      // 设置拖拽组件添加位置的索引
      this.SET_DRAG_INDEX(addIndex);
      // 跨源通信传递数据给crs, 触发预添加效果
      this.VIEW_ADD_PREVIEW(addIndex);
    },

    // 将组件拖拽出但并未进入H5页面的回调
    onDragout (e) {
      e.preventDefault();
      // 只有当有预添加效果时，才触发dragout事件
      if (this.addComponentIndex != null) {
        // 跨源通信传递数据给crs, 清除预添加效果
        this.pageChange({
          type: 'delete'
        })
        // 还原拖拽组件的初始索引, 防止频繁触发dragout事件
        this.SET_DRAG_INDEX(null);
      }
    },

    // iframe 加载完成后
    onloadH5 () {
      console.log('iframe 加载完成');
      // 调用工具类的emit方法完成跨源通信向crs传递数据
      this.$store.commit('VIEW_UPDATE');
    }
  },
  mounted () {
    // 挂载完成后调用actions异步方法获取crs回传的H5页面高度
    this.initMessage();
  },
}
</script>

<style lang="less" scoped>
.page-view {
  position: absolute;
  top: 56px;
  left: 186px;
  right: 376px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f7f8fa;
  display: flex;
  justify-content: center;
  user-select: none;
}

.cache-box {
  position: absolute;
  left: 20px;
  right: 20px;
  top: 20px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  background: @color-1-bg;
  border: 1px solid @color-1;
  padding: 0 10px;
  z-index: 2;

  .color-1 {
    cursor: pointer;
  }

  .cache-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    color: #aaa;
  }
}

.preview {
  position: absolute;
  width: 100%;

  .preview-head {
    height: @content-header-height;
    width: 375px;
    margin: 72px auto 0px auto;
    // transform: translateX(-8px);
    background: url('~@/assets/img/layout/header_bg.png') left top no-repeat;
    background-size: cover;
    position: relative;
    box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);

    .preview-head-title {
      width: 180px;
      margin: 0 auto;
      height: 64px;
      font-size: 14px;
      text-align: center;
      padding-top: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .preview-wrap {
    width: 100%;

    .preview-iframe {
      // min-height: 802px;
    }
  }

  .preview-drag-mask {
    position: absolute;
    left: 50%;
    top: 60px;
    bottom: 20px;
    width: 520px;
    margin-left: -260px;
    z-index: 10;
  }

  .preview-drag-out {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9;
  }
}
</style>