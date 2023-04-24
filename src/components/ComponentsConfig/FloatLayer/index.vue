<template>
  <div class="float-layer">
    <div>
      <ComGroup title="上传图片" :tips="`建议图片为130*130px，支持图片格式${imgTypes.join('/')},大小不超过1M`" :name-black="true" />
      <div class="fl-uploader-box">
        <UpLoadBox :img-url.sync="configData.imageUrl" />
      </div>
    </div>
    <ComGroup title="链接">
      <a>
        <ConfigLinkDialog :link-obj.sync="configData.link" />
      </a>
    </ComGroup>
    <ComGroup title="浮标宽度">
      <el-input-number v-model="configData.width" controls-position="right" />
    </ComGroup>
    <ComGroup title="页面滑动时隐藏">
      <el-radio-group v-model="configData.hideByPageScroll">
        <el-radio :label="true">
          是
        </el-radio>
        <el-radio :label="false">
          否
        </el-radio>
      </el-radio-group>
    </ComGroup>
  </div>
</template>
<script>
import ComGroup from '@/components/BasicUi/ComGroup'
import ConfigLinkDialog from '@/components/BasicConfig/ConfigLink'
import UpLoadBox from '../../BasicUi/UpLoadBox'
export default {
  name: 'FloatLayer',
  components: { ComGroup, ConfigLinkDialog, UpLoadBox },
  props: {
    parmes: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      imgTypes: ['png', 'jpg', 'jpeg', 'gif'],
      configData: JSON.parse(JSON.stringify(this.parmes))
    }
  },
  watch: {
    configData: {
      handler (v) {
        this.$emit('editComponent', v)
      },
      deep: true
    }
  },
  methods: {
    onAdd (item) {
      this.currentItem = item
      this.showDialogImage()
    },
    // 图片上传
    showDialogImage () {
      this.$store.commit('SET_UPIMAGE_VISIBLE', true)
      this.$store.commit('SET_UPIMAGE_FUC', this.upLoadImgSuccess)
    },
    // 图片上传成功
    upLoadImgSuccess (imgUrl) {
      this.configData.imageUrl = imgUrl
    },
    formatWidthTooltip (value) {
      return value ? `${value}px` : value
    }
  }
}
</script>
<style lang="less" scoped>
.float-layer {
  .fl-uploader-box {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    .flub-button {
      border: 1px solid #e5e5e5;
      background: #f2f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 60px;
      height: 60px;
      color: #008AC8;
      cursor: pointer;

      .flub-icon {
        font-size: 20px;
      }

      .flub-text {
        margin-top: 4px;
      }
    }
  }

  .avatar {
    width: 60px;
    height: 60px;
    max-height: 100%;
    max-width: 100%;
  }
}
</style>
