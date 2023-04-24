<template>
  <div class="home">
    <!-- 顶部head -->
    <page-head></page-head>
    <!-- 左侧组件列表 -->
    <page-left></page-left>
    <!-- 中间内容区域 -->
    <page-view></page-view>
    <!-- 右侧组件编辑区 -->
    <page-right></page-right>
    <!-- 组件的公共配置内容 -->
    <!-- 上传图片组件 -->
    <UpLoadImg :dialog-image-visible.sync="dialogImageVisible"
               @upLoadImgSuccess="upLoadImgSuccess" />
  </div>
</template>

<script>
import PageHead from './components/PageHead.vue';
import PageLeft from './components/PageLeft.vue';
import PageView from './components/PageView.vue';
import PageRight from './components/PageRight.vue';
// 公共配置组件
import UpLoadImg from '@/components/BasicConfig/UpLoadImg'
import { getCmsPageById } from '@/api/activity';
import { createRandomId } from '@/utils';
export default {
  components: {
    PageLeft,
    PageView,
    PageHead,
    PageRight,
    UpLoadImg
  },
  data () {
    return {

    }
  },
  computed: {
    // 上传图片模态框是否显示
    dialogImageVisible: {
      get: function () {
        return this.$store.state.dialogImageVisible
      },
      set: function (val) {
        this.$store.commit('SET_UPIMAGE_VISIBLE', val)
      }
    }
  },
  methods: {
    // 获取活动页面详情数据
    getData () {
      let { id } = this.$route.query;
      // console.log(`当前无页面id，先写个死的id请求页面数据!`)
      if (id) {
        getCmsPageById(id).then(({ data }) => {
          this.postDataToH5(data)
        })
      }
    },
    // 处理后端返回的页面数据
    postDataToH5 (data) {
      if (data && data.componentList) {
        data.componentList.forEach(item => {
          // 如果 componentList 数据的 validTime 属性存在且有可能日期格式为string类型 (默认为数组)，就处理一下
          if (item.data.validTime && typeof item.data.validTime === 'string') {
            item.data.validTime = JSON.parse(item.data.validTime);
            // console.log(item.data.validTime);
          }
          // 如果 componentList 数据不存在id属性
          if (!item.id) {
            const randomId = createRandomId();
            item.id = item.data.component + '-' + randomId;
          }
        })
      }
      // 将页面数据存储到Vuex中
      this.$store.commit('UPDATE_COMPONENT', data);
      // 调用工具类的emit方法完成跨源通信向crs传递数据
      this.$store.commit('VIEW_UPDATE');
    },
    // 上传图片成功回调事件
    upLoadImgSuccess (imgUrl) {
      let fuc = this.$store.state.upLoadImgSuccess
      if (fuc) fuc(imgUrl)
    }
  },
  created () {
    this.getData();
  }
}
</script>