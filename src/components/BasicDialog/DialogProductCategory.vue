<template>
  <!-- 选择商品分类模态框 -->
  <el-dialog title="商品分类"
             :visible.sync="_dialogVisible"
             width="400px">
    <!-- 754px -->
    <!-- 列表搜索栏 -->
    <div class="table-search">
      <div class="search-btn">
        <!-- <el-button size="small">管理分类</el-button> -->
        <el-button size="small"
                   @click="getList">
          刷新
        </el-button>
        <el-button size="small"
                   @click="clearSelect">
          清空已选分类
        </el-button>
      </div>
    </div>
    <!-- 列表数据 -->
    <div v-loading="loading">
      <el-cascader-panel v-if="list && list.length > 0"
                         ref="categoryPanel"
                         :key="selectType"
                         v-model="selectCategory"
                         :options="list"
                         :props="cascaderConfig" />
      <div v-else
           class="no-data">
        您还未创建商品分类
      </div>
    </div>
    <!-- 底部操作 -->
    <div slot="footer"
         class="dialog-footer">
      <el-button size="medium"
                 type="primary"
                 @click="selectSure">
        确 定
      </el-button>
      <el-button size="medium"
                 @click="_dialogVisible = false">
        取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchProductCategory } from '@/api/index'

export default {
  name: 'DialogProductCategory',
  props: {
    // 模态框是否显示
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 选择方式 - 单选还是多选
    selectType: {
      type: String,
      default: 'single'
    },
    // 选择方式 - 单选还是多选
    limitLength: {
      type: Number,
      default: 15
    }
  },
  data () {
    return {
      loading: false, // 数据是否正在加载中
      // 分类插件配置选项
      cascaderConfig: {
        value: 'uuid',
        label: 'categoryName'
        // children: "subCategoryList"   // 暂不展示子级分类
      },
      // 分类列表数据
      list: [],
      selectCategory: [] // 当前选择的分类
    }
  },
  computed: {
    // 动态获取及修改弹出框是否显示字段
    _dialogVisible: {
      get: function () {
        return this.dialogVisible
      },
      set: function (val) {
        this.$emit('update:dialogVisible', val)
      }
    }
  },
  watch: {
    // 模态框显示时获取列表数据
    dialogVisible (newVal, oldVal) {
      if (newVal) {
        this.getList()
      }
    },
    // 是否多选
    selectType: {
      handler: function (newVal, oldVal) {
        this.cascaderConfig.multiple = newVal === 'multi'
      },
      immediate: true
    }
  },
  methods: {
    // 获取商品分类数据
    getList () {
      var qm = {
        vendorUuid: ''
      }
      this.loading = true
      fetchProductCategory(qm).then(res => {
        this.loading = false
        this.list = res.returnMessage
      })
    },
    // 清空选择的分类
    clearSelect () {
      this.$refs.categoryPanel.clearCheckedNodes()
    },
    // 弹出框确定按钮事件
    selectSure () {
      // 未选择数据
      if (this.selectCategory.length === 0) {
        let message = this.selectType === 'single' ? '请选择一个分类' : '请至少选择一个分类'
        this.$message.error(message)
        return
      }
      // 单选
      if (this.selectType === 'single') {
        let selectNode = this.$refs.categoryPanel.getCheckedNodes(true)[0]
        let item = {
          id: selectNode.value,
          name: selectNode.label
        }
        this.$emit('selectSure', item)
      } else {
        // 多选
        let selectNode = this.$refs.categoryPanel.getCheckedNodes(true)
        if (selectNode.length > this.limitLength) {
          this.$message.error(`当前最多还可添加${this.limitLength}条分类`)
          return
        }
        let itemList = selectNode.map(item => ({
          id: item.value,
          name: item.label
        }))
        this.$emit('selectSure', itemList)
      }
      this.clearSelect()
      this._dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-cascader-menu__wrap {
  height: 400px;
}
/deep/ .el-cascader-menu {
  flex: 1;
}
</style>
