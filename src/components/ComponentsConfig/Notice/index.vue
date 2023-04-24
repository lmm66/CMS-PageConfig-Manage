<template>
  <div>
    <!-- 添加内容 -->
    <ComGroup title="添加内容"
              tips="最多添加10条内容，多条将会滚动展示，拖动选中的内容可对其排序"
              :name-black="true" />

    <ComGroup :bg-gray="true"
              :content-block="true">
      <PicList :image-list.sync="configData.noticelist"
               :show-pic="false"
               add-place-holder="添加内容" />
    </ComGroup>

    <!-- 配置图标 -->
    <ComGroup title="配置图标">
      <el-button type="text"
                 class="mr-15"
                 @click="configData.imageUrl = ''">
        重置
      </el-button>
      <UpLoadBox :img-url.sync="configData.imageUrl" />
    </ComGroup>

    <!-- 颜色配置 -->
    <ComGroup title="背景颜色">
      <el-button type="text"
                 class="mr-15"
                 @click="configData.backgroundColor = initBgColor">
        重置
      </el-button>
      <el-color-picker v-model="configData.backgroundColor"
                       size="small" />
    </ComGroup>
    <ComGroup title="文字颜色">
      <el-button type="text"
                 class="mr-15"
                 @click="configData.textColor = initTxtColor">
        重置
      </el-button>
      <el-color-picker v-model="configData.textColor"
                       size="small" />
    </ComGroup>
  </div>
</template>

<script>
import ComGroup from '@/components/BasicUi/ComGroup'
import UpLoadBox from '@/components/BasicUi/UpLoadBox'
import PicList from '@/components/BasicConfig/PicList'

export default {
  name: 'Notice',
  components: { ComGroup, UpLoadBox, PicList },
  props: ['parmes'],
  data () {
    return {
      // 当前组件数据
      configData: JSON.parse(JSON.stringify(this.parmes)),
      // 初始背景颜色
      initBgColor: '#FFF8E9',
      // 初始文本颜色
      initTxtColor: '#666666'
    }
  },
  watch: {
    // 监听当前组件配置及数据项修改
    configData: {
      handler: function (newVal, oldVal) {
        console.log('公告配置修改', newVal)
        // 更新组件配置数据
        this.$emit('editComponent', newVal)
      },
      deep: true
    }
  },
  methods: {
    // 上传图片
    showDialogImage () {
      this.$store.commit('SET_UPIMAGE_VISIBLE', true)
      this.$store.commit('SET_UPIMAGE_FUC', this.upLoadImgSuccess)
    },
    // 图片上传成功
    upLoadImgSuccess (imgUrl) {
      // 修改图片
      this.configData.imageUrl = imgUrl
    }
  }
}
</script>
