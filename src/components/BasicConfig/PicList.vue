<template>
  <div>
    <draggable v-model="picData"
               :options="{
        animation: 300,
        handle: '.up-pic-item',
        disabled: unGraggable || picData.length < 2,
        forceFallback: true,
        fallbackTolerance: 1,
      }">
      <!-- 图片列表 -->
      <div v-for="(item, index) in picData"
           :key="index"
           class="up-pic-item"
           :class="{ 'can-drag': !unGraggable && picData.length > 1 }">
        <div class="up-pic-item-wrapper">
          <!-- 图片上传组件，用于接收上传图片的url去修改picData的imageUrl属性 -->
          <UpLoadBox v-if="showPic"
                     :img-url.sync="item.imageUrl"
                     @editImg="editPic(item)" />
          <div class="info">
            <dl v-if="showName"
                class="com-form-group">
              <dt class="form-label">
                标题
              </dt>
              <dd class="form-container">
                <el-input v-model.lazy="item.text"
                          class="input-name"
                          :placeholder="inputPlaceHolder" />
              </dd>
            </dl>
            <dl class="com-form-group">
              <dt class="form-label">
                链接
              </dt>
              <dd class="form-container">
                <!-- 配置链接地址组件 -->
                <ConfigLink :link-obj.sync="item.link" />
              </dd>
            </dl>
          </div>
        </div>
        <div v-if="showDelete"
             class="up-pic-item-delete el-icon-error"
             title="删除该项"
             @click="deleteItem(index)">
        </div>
      </div>
    </draggable>
    <!-- 添加图片 -->
    <ButtonAdd v-if="showAdd"
               :add-text="addPlaceHolder"
               @click="addItem" />
  </div>
</template>

<script>
import draggable from 'vuedraggable' // 拖拽元素
import UpLoadBox from '@/components/BasicUi/UpLoadBox'
import ButtonAdd from '@/components/BasicUi/ButtonAdd'
import ConfigLink from '@/components/BasicConfig/ConfigLink'

export default {
  name: 'PicList',
  components: {
    draggable,
    UpLoadBox,
    ButtonAdd,
    ConfigLink
  },
  props: {
    // 图片列表数组
    imageList: {
      type: Array,
      default: null
    },
    // 图片标题文本输入框缺省提示文字
    inputPlaceHolder: {
      type: String,
      default: ''
    },
    // 添加图片按钮的文案
    addPlaceHolder: {
      type: String,
      default: '添加广告图'
    },
    // 是否显示上传图片组件
    showPic: {
      type: Boolean,
      default: true
    },
    // 是否显示标题选项
    showName: {
      type: Boolean,
      default: true
    },
    // 是否显示添加按钮
    showAdd: {
      type: Boolean,
      default: true
    },
    // 是否显示删除按钮
    showDelete: {
      type: Boolean,
      default: true
    },
    // 列表是否不可拖拽排序
    unGraggable: {
      type: Boolean,
      default: false
    },
    // 最多添加的数据条目数
    limitSize: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      /**
       * 当前图片数组数据，拿到Carousel传入的imageList做深拷贝
       * 数据格式：[{ imageUrl:'', link:null, text:'' }]
       */
      picData: JSON.parse(JSON.stringify(this.imageList)),
      // 用以修改后图片地址
      currentItem: ''
    }
  },
  watch: {
    // 监听当前图片列表数据项修改
    picData: {
      handler: function (newVal, oldVal) {
        console.log('图片列表配置修改', newVal)   // [{imageUrl:fromUpLoadox's imgUrl, link:null, text:''}]
        this.$emit('update:imageList', newVal)  // picData发生改变后修改父组件Carousel的imageList值
      },
      deep: true
    }
  },
  methods: {
    /**
     * TODO: 新增项
     * 1.判断是否超过限制条数
     * 2.判断上传图片组件上是否带有图片，有就调用图片上传方法showDialogImage
     */
    addItem () {
      // TODO: 1
      if (this.limitSize && this.picData.length >= this.limitSize) {
        this.$message.warning(`最多添加${this.limitSize}条数据`)
        return
      }
      // TODO: 2
      if (this.showPic) {
        this.showDialogImage()
        this.currentItem = ''
      } else {
        let item = {
          link: null, // 链接地址对象
          imageUrl: '', // 图片地址
          text: '' // 标题
        }
        this.picData.push(item);
      }
    },

    /**
     * TODO: 控制控制图片上传弹出框的显示
     * 修改图片上传的状态、上传成功的回调函数存入state
     * UpLoadImg通过监听store中的图片上传状态控制图片上传弹出框的显隐，并调用上传成功的回调函数
     */
    showDialogImage () {
      this.$store.commit('SET_UPIMAGE_VISIBLE', true)
      this.$store.commit('SET_UPIMAGE_FUC', this.upLoadImgSuccess)
    },

    // 图片上传/修改成功回调，在图片上传弹出框那个组件里面调用，咋调的暂时不想去管
    upLoadImgSuccess (imgUrl) {
      // 如果当前currentItem存在，说明需要修改图片，否则为上传图片
      if (this.currentItem) {
        this.currentItem.imageUrl = imgUrl
      } else {
        // 新增图片
        let item = {
          link: null, // 链接地址对象
          imageUrl: imgUrl, // 图片地址
          text: '' // 标题
        }
        this.picData.push(item)
      }
    },

    /**
     * TODO: 修改图片
     * UpLoadBox自定义事件的回调，在UpLoadBox组件中触发
     * 将修改后的图片地址存到currentItem
     * 其实没什么软用，没有传uploadFile=false，修改图片都是从本地上传
     */
    editPic (item) {
      this.showDialogImage()
      this.currentItem = item
    },

    // 删除指定项
    deleteItem (index) {
      this.picData.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
// 图片列表
.up-pic-item {
  position: relative;
  margin-bottom: 12px;
  padding: 6px 0;
  background: #ffffff;
  box-shadow: 0 0 4px 0 rgba(10, 42, 97, 0.2);
  border-radius: 2px;
  user-select: none;
  &.can-drag {
    cursor: move;
  }
  &.sortable-ghost {
    opacity: 0.2;
  }
  &:hover {
    .up-pic-item-delete {
      visibility: visible;
    }
  }
  /deep/.config-link .cllt-name {
    max-width: 110px;
  }
}
.up-pic-item-wrapper {
  display: flex;
  .up-pic-box {
    margin: 6px 0 0 12px;
  }
  .info {
    flex: 1;
  }
}
// 图片编辑表单
.com-form-group {
  padding: 6px 12px;
  // display: flex;
  align-items: center;
  .form-label {
    margin-right: 16px;
    font-size: 14px;
    color: #323233;
    line-height: 18px;
    white-space: nowrap;
  }
  .form-container {
    flex: 1;
  }
  /deep/ .input-name .el-input__inner {
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    border-radius: 2px;
  }
}
</style>
