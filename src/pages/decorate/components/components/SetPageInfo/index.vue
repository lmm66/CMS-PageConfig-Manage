<template>
  <div>
    <com-title title="页面设置"></com-title>
    <com-group title="页面名称"
               nameBlack
               contentBlock>
      <el-input v-model.lazy="name"
                placeholder="请输入页面名称"></el-input>
    </com-group>

    <com-group title="微信分享文案"
               nameBlack
               contentBlock>
      <el-input v-model.lazy="shareDesc"
                placeholder="用户通过微信分享给朋友时显示，最多28个汉字"></el-input>
    </com-group>

    <com-group title="微信分享卡片"
               tips="图片建议长宽比为5:4"
               nameBlack
               contentBlock>
      <el-button type="text"
                 class="mr-15"
                 @click="shareImage = ''">
        重置
      </el-button>
      <up-load-box :img-url.sync="shareImage"></up-load-box>
    </com-group>

    <com-divider></com-divider>

    <com-group title="背景颜色">
      <el-button type="text"
                 class="mr-15"
                 @click="backgroundColor = ''">
        重置
      </el-button>
      <el-color-picker v-model="backgroundColor"></el-color-picker>
    </com-group>

    <com-group title="背景图片">
      <el-button type="text"
                 class="mr-15"
                 @click="backgroundImage = ''">
        重置
      </el-button>
      <up-load-box :img-url.sync="backgroundImage"></up-load-box>
    </com-group>
  </div>
</template>

<script>
import ComTitle from '@/components/BasicUi/ComTitle';
import ComGroup from '@/components/BasicUi/ComGroup';
import UpLoadBox from '@/components/BasicUi/UpLoadBox';
import ComDivider from '@/components/BasicUi/ComDivider';
export default {
  components: {
    ComTitle,
    ComGroup,
    UpLoadBox,
    ComDivider
  },
  data () {
    return {

    }
  },
  computed: {
    name: {
      get: function () {
        return this.$store.state.pageData.name;
      },
      set: function (val) {
        this.updatePageInfo({
          name: val
        })
      }
    },
    shareDesc: {
      get: function () {
        return this.$store.state.pageData.shareDesc;
      },
      set: function (val) {
        this.updatePageInfo({
          shareDesc: val
        })
      }
    },
    shareImage: {
      get: function () {
        return this.$store.state.pageData.shareImage;
      },
      set: function (val) {
        this.updatePageInfo({
          shareImage: val
        })
      }
    },
    backgroundColor: {
      get: function () {
        return this.$store.state.pageData.backgroundColor;
      },
      set: function (val) {
        this.updatePageInfo({
          backgroundColor: val
        })
      }
    },
    backgroundImage: {
      get: function () {
        return this.$store.state.pageData.backgroundImage;
      },
      set: function (val) {
        this.updatePageInfo({
          backgroundImage: val
        })
      }
    },
  },
  methods: {
    // 修改页面的配置属性
    updatePageInfo (config) {
      this.$store.commit('SET_PAGE_CONFIG', config);
    }
  }
}
</script>

<style lang="less" scoped></style>