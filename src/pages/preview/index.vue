<template>
  <div class="preview-box">
    <div class="preview-page">
      <div class="preview-header"></div>
      <div class="preview-body">
        <iframe id="previewIframe"
                class="preview-iframe"
                :src="previewSrc"
                title="频道"
                frameborder="0"
                width="100%"
                height="100%">
        </iframe>
      </div>
      <div class="preview-bottom"></div>
    </div>
    <div class="share-box">
      <img class="logo"
           src="~@/assets/img/layout/logo.png"
           alt="">
      <div class="code-box">
        <p class="title">手机扫码访问</p>
        <p class="desc">微信“扫一扫”分享到朋友圈</p>
        <div class="pic">
          <vue-qr :text="shareSrc"
                  :size="180" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// VueQr插件引入微信二维码
import VueQr from 'vue-qr'
// import settings from '@/config'

export default {
  name: 'Preview',
  components: { VueQr },
  data () {
    return {
      previewSrc: '', // 预览页面地址
      shareSrc: '' // 分享页面地址
    }
  },
  created () {
    // 设置预览页面地址
    let { id } = this.$route.query
    this.shareSrc = 'http://127.0.0.1:3010/crs/#/pagePreiview?' + `?id=${id}&data=${this.$store.state.wxParams}`
    this.previewSrc = this.shareSrc
  },
  methods: {}
}
</script>

<style lang="less" scoped>
// 预览
.preview-box {
  height: 100%;
  padding: 20px 0;
  box-sizing: border-box;
}

.preview-page {
  display: flex;
  flex-direction: column;
  width: 384.6px;
  margin: 0 auto;
  height: 100%;
  border: 5px solid #ddd;
  border-radius: 20px;
  overflow: hidden;

  .preview-header {
    height: 20px;
    background: #ddd;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      margin-left: -20px;
    }

    &:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 50px;
      height: 8px;
      background: #fff;
      border-radius: 10px;
      transform: translate(-50%, -50%);
      margin-left: 20px;
    }
  }

  .preview-body {
    flex: 1;
  }

  .preview-bottom {
    height: 30px;
    background: #ddd;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 15px;
      height: 15px;
      background: #fff;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

// 分享
.share-box {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 180px;
  transform: translate(400px, -50%);

  .logo {
    display: block;
    margin: 0 auto 20px;
    max-width: 50px;
    max-height: 50px;
  }

  .code-box {
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    background-color: #fff;
    text-align: center;
  }

  .title {
    margin: 10px;
    padding-bottom: 10px;
    font-size: 12px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    line-height: 1.6;
  }

  .desc {
    font-size: 12px;
    color: #666;
  }

  .pic {
    width: 180px;
    height: 180px;
    margin: 0 auto;
    overflow: hidden;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
