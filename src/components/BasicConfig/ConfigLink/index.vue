<template>
  <div class="config-link">
    <div v-if="linkText"
         class="cl-link-box"
         @click="openDialog">
      <span class="cll-text">
        <span class="cllt-name"
              :title="linkText"
              v-text="linkText" />
        <i class="el-icon-close cllt-icon"
           @click.stop="onRemoveData" />
      </span>
      <a class="cll-btn">修改</a>
    </div>
    <span v-else
          class="link"
          @click="openDialog">添加跳转链接
    </span>

    <el-dialog title="添加跳转链接"
               append-to-body
               :close-on-click-modal="false"
               class="cl-dialog-layout"
               custom-class="config-link-dialog"
               :visible.sync="dialogVisible"
               width="710px"
               @closed="onclose"
               @open="onDialogOpen">
      <el-tabs v-if="tabVisible"
               v-model="activeName"
               @tab-click="onTabClick">
        <el-tab-pane v-for="item in tabConfig"
                     :key="item.clickType"
                     :label="item.label"
                     :name="item.clickType.toString()">
          <!-- visible: tab隐藏时，清空验证数据， init: tab组件点击时才初始化 -->
          <component :is="item.component"
                     v-if="item.init"
                     :visible="item.clickType.toString() === activeName"
                     :columns="item.columns"
                     :url="item.url"
                     :query="item.query"
                     :form-config="item.formConfig"
                     :init-data="currentData.data"
                     :click-type="item.clickType"
                     @onChange="(data) => { onChange(data, item.clickType) }">
          </component>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="dialogVisible = false">取 消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ComTable from './component/ComTable'
import OrderTable from './component/OrderTable'
import ProjectSelect from './component/ProjectSelect'
import OuterUrl from './component/OuterUrl'
import InnerUrl from './component/InnerUrl'
import tabConfig from './tabConfig'
let copyData = [...tabConfig]
let defItem = copyData[0]
defItem.init = true
let emptyData = { clickType: defItem.clickType, data: null }
export default {
  name: 'ConfigLink',
  components: { ComTable, OrderTable, ProjectSelect, OuterUrl, InnerUrl },
  props: {
    value: Boolean,
    linkObj: {
      type: Object,
      default () {
        return { ...emptyData }
      }
    }
  },
  mounted () {
    // console.log(this.tabConfig)
  },
  data () {
    return {
      dialogVisible: false,
      tabVisible: true, // 弹框关闭时，销毁tab组件
      tabConfig: tabConfig,
      activeName: null,
      currentData: { ...emptyData }
    }
  },
  computed: {
    linkText () {
      if (!this.linkObj) {
        return ''
      }
      let { clickType, data } = this.linkObj
      let notEmptyObj = data && Object.keys(data).length > 0
      if (clickType && notEmptyObj) {
        let arr = tabConfig.filter((item) => {
          return clickType === item.clickType
        })
        let tabTitle = ''
        if (arr.length > 0) {
          let subName = clickType === 10 ? data.orderService[arr[0].linkTextAttr] : data[arr[0].linkTextAttr]
          tabTitle = arr[0].label + ' | ' + subName
        }
        return tabTitle
      }
      return ''
    }
  },
  methods: {
    onDialogOpen () {
      this.setInitData()
      this.tabVisible = true
    },
    cloneObj (data) {
      return JSON.parse(JSON.stringify(data))
    },
    setInitData () {
      let hasValue = this.linkObj && Object.keys(this.linkObj).length > 0
      let cloneData = hasValue ? this.cloneObj(this.linkObj) : this.cloneObj(emptyData)
      let defArr = this.tabConfig.filter((item) => {
        return item.clickType === cloneData.clickType
      })
      let item = defArr && defArr.length > 0 ? defArr[0] : this.tabConfig[0]
      item.init = true // 根据组件入参，激活默认的tab标签
      this.activeName = cloneData.clickType.toString()
      this.currentData = cloneData
      console.log('this.currentData', this.currentData)
    },
    onChange (data, clickType) {
      // 单表格tab使用组件的prop,传递数据更新状态， 其它使用eventBus传递数据
      let oldType = this.currentData.clickType
      if (oldType !== clickType) { // 设置新数据前，清空原来tab中的数据
        this.eventBus.$emit(`setData_${oldType}`, null)
      }
      this.currentData = {
        clickType, data
      }
    },
    onTabClick () {
      let arr = this.tabConfig.filter((obj) => {
        return obj.clickType === (+this.activeName)
      })
      if (arr && arr.length > 0) {
        arr[0].init = true // 控制tab只有第一次点击时才初始化，避免多个tab组件同时初始化调用后台接口
      }
    },
    openDialog () {
      this.dialogVisible = true
    },
    onclose () {
      this.tabVisible = false
      this.resetInitStatus()
    },
    resetInitStatus () {
      this.tabConfig.forEach((obj) => {
        if (obj.clickType !== (+this.activeName)) {
          obj.init = false
        }
      })
    },
    onConfirm () {
      let data = this.formatData(this.currentData)
      console.log('data', data)
      this.$emit('onConfirm', data)
      this.$emit('update:linkObj', data)
      this.dialogVisible = false
    },
    formatData (currentData) {
      let item = this.tabConfig.filter((obj) => {
        return obj.clickType === (+this.activeName)
      })[0]
      if (item.saveKeys && currentData.data) {
        // 1、只保存需要的属性
        let newData = {}
        item.saveKeys.forEach((key) => {
          newData[key] = currentData.data[key]
        })
        currentData.data = newData
        return currentData
      }
      return currentData
    },
    onRemoveData () {
      this.currentData = { ...emptyData }
      this.$emit('update:linkObj', this.currentData)
    }
  }
}
</script>

<style lang="less" scoped>
.cl-dialog-layout {
  text-align: center;
  &:before {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
}
/deep/.config-link-dialog {
  margin-top: 0px !important;
  top: 50vh !important;
  transform: translateY(-50vh) !important;
  display: inline-block;
  vertical-align: middle;
  .el-tabs__content {
    min-height: calc(100vh - 400px);
  }
  .el-dialog__body {
    text-align: left;
  }
}
.config-link {
  .link {
    cursor: pointer;
  }
  .cll-text {
    border: 1px solid #155bd4;
    background-color: #edf4ff;
    color: #155bd4;
    font-size: 12px;
    padding: 2px 4px;
  }
  .cll-btn {
    color: #155bd4;
    display: inline-block;
    width: 50px;
    line-height: 22px;
    text-align: center;
  }
  .cllt-name {
    line-height: 22px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 220px;
    white-space: nowrap;
    vertical-align: bottom;
  }
  .cllt-icon {
    margin-left: 5px;
  }
}
</style>
