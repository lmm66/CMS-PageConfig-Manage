<template>
  <!-- 选择商品分类模态框 -->
  <el-dialog title="商品" :visible.sync="_dialogVisible" width="830px">
    <!-- 列表搜索栏 -->
    <div class="table-search">
      <div class="search-form">
        <el-input v-model="searchValue" size="small">
          <el-button slot="append" icon="el-icon-search" @click="getList" />
        </el-input>
      </div>
      <div class="search-btn">
        <el-button size="small" @click="getList">
          刷新
        </el-button>
      </div>
    </div>
    <!-- 列表数据 -->
    <el-table
      v-loading="loading"
      class="dialog-table"
      :data="list"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="selectType === 'multi'" type="selection" width="55" />
      <el-table-column label="商品编码" prop="jvCode" />
      <el-table-column label="商品名称" prop="jvName">
        <!-- <template slot-scope="scope">
          <div class="flex-center pr-20">
            <el-radio
              v-if="selectType === 'single'"
              v-model="checkedId"
              :label="scope.row.id"
              class="mr-0"
            >
              <span />
            </el-radio>
            <img :src="scope.row.img" width="50" height="50"
                 class="mr-10"
            >
            <p class="product-name">
              {{ scope.row.name }}
            </p>
          </div>
        </template> -->
      </el-table-column>
      <el-table-column label="品牌" prop="brand" />
    </el-table>
    <!-- 列表翻页 -->
    <div class="table-page">
      <el-pagination
        background
        :current-page="nowPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="pageChange"
      />
    </div>
    <!-- 底部操作 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" type="primary" @click="selectSure">
        确 定
      </el-button>
      <el-button size="medium" @click="_dialogVisible = false">
        取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchProduct } from '@/api/index'

export default {
  name: 'DialogProduct',
  props: {
    // 模态框是否显示
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 选择方式 - 单选还是多选  single-单选； multi-多选
    selectType: {
      type: String,
      default: 'single'
    }
  },
  data() {
    return {
      loading: false, // 数据是否正在加载中
      searchValue: '', // 搜索关键字
      nowPage: 1, // 当前页
      total: 0, // 列表数据条数
      // 列表数据
      list: [],
      checkedId: '', // 列表单选选择的商品ID
      multipleSelection: [] // 列表多选选择的商品
    }
  },
  computed: {
    // 动态获取及修改弹出框是否显示字段
    _dialogVisible: {
      get: function() {
        return this.dialogVisible
      },
      set: function(val) {
        this.$emit('update:dialogVisible', val)
      }
    }
  },
  watch: {
    // 模态框显示时获取列表数据
    dialogVisible(newVal, oldVal) {
      if (newVal) {
        this.list = []
        this.nowPage = 1
        this.getList()
      }
    }
  },
  mounted() {

  },
  methods: {
    // 数据翻页
    pageChange(val) {
      this.nowPage = val
      this.getList()
    },
    // 获取商品列表数据
    getList() {
      var qm = {
        jvStatus: 1,
        name: this.searchValue,
        pageNum: this.nowPage,
        pageSize: 10,
        skuType: 0,
        status: 1
      }
      this.loading = true
      fetchProduct(qm).then(res => {
        this.loading = false
        this.list = res.list
        this.total = res.total
      })
    },
    // 表格复选框选中事件变化
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 弹出框确定按钮事件
    selectSure() {
      // 单选
      if (this.selectType === 'single') {
        if (!this.checkedId) {
          this.$message.error('请选择一个选项')
          return
        }
        let item = this.list.find(item => item.id === this.checkedId)
        this.$emit('selectSure', item)
      } else {
        // 多选
        if (this.multipleSelection.length === 0) {
          this.$message.error('请至少选择一个选项')
          return
        }
        this.$emit('selectSure', this.multipleSelection)
      }
      this._dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.product-name {
  .ellipsis;
}
</style>
