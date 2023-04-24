<template>
  <div class="com-table">
    <!-- 表单组件 -->
    <json-form :formConfig="formConfig"
               @onSearch="onSearch"
               @onReset="onReset">
    </json-form>

    <!-- table组件 -->
    <el-table v-loading="tableLoading"
              border
              size="mini"
              :data="tableData"
              :max-height="maxHeight"
              style="width: 100%">

      <el-table-column v-for="item in columns"
                       :key="item.key"
                       :prop="item.key"
                       :label="item.label"
                       :width="item.width"
                       :min-width="item.minWidth"
                       :formatter="item.formatter">
      </el-table-column>
      <el-table-column label="操作"
                       fixed="right"
                       width="65px"
                       align="center">
        <template slot-scope="scope">
          <el-button v-if="disabledRow(scope.row)"
                     type="text"
                     :disabled="true"
                     size="mini"
                     @click="onSelect(scope.row)">
            已选择
          </el-button>
          <el-button v-else
                     type="text"
                     size="mini"
                     @click="onSelect(scope.row)">
            选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="pager-area">
      <el-pagination background
                     layout="total, prev, pager, next, sizes"
                     :page-sizes="[10, 30, 50, 100]"
                     :total="total"
                     :current-page.sync="page.pageNum"
                     :page-size.sync="page.pageSize"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import fetch from '@/api/axios'
import JsonForm from './JsonForm'
export default {
  components: { JsonForm },
  props: {
    // 请求接口额外的参数
    query: {
      type: Object,
      default () {
        return {}
      }
    },

    // 当前table最大高度
    maxHeight: {
      type: Number,
      default: null
    },

    // 请求的URL地址，由ConfigLink传递的，目前为null
    url: {
      type: String,
      default: null
    },

    // 列数据
    columns: {
      type: Array,
      default () {
        return []
      }
    },

    // 表单配置数据
    formConfig: {
      type: Object,
      default: null
    },

    beforeSelect: {
      type: Function,
      default: null
    },

    // 选中的数据
    initData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      tableLoading: false,
      tableData: [],
      total: 0,
      formParams: {},
      page: {
        pageNum: 1,   // 当前页码
        pageSize: 10  // 每页条数
      }
    }
  },
  created () {
    this.init()
  },
  beforeDestroy () {
    this.clearFormData()
  },
  methods: {
    // 组件首次加载请求数据
    init () {
      this.getData()
    },

    // 请求接口数据, 因为父组件ConfigLink传递的url是null，暂时没法请求接口
    getData () {
      if (!this.url) {
        console.error('comTable url is empty')
        return false
      }
      // 触发table的loading效果
      this.tableLoading = true
      // 组装请求接口参数：{ pageNum: 1, pageSize: 10, jvStatus: 1, skuType: 0, status: 1 }
      let params = Object.assign({}, this.page, this.query, this.formParams)
      // 请求接口，根本走不进来
      fetch.post(this.url, params).then((data) => {
        data = data || {}
        this.total = data.total || 0
        this.tableData = data.list || []
      }).finally(() => {
        this.tableLoading = false
      })
    },

    // 点击Form中查询按钮回调
    onSearch () {
      // 拿到表单输入的数据
      let formData = this.formConfig.formItemMap
      if (formData) {
        let formParams = {}
        let item
        // [ 'jvCode', 'name', 'brand ]
        Object.keys(formData).forEach((key) => {
          item = formData[key]
          // 如果key是日期，做额外处理
          if (key === 'date' && item.value && item.value.length > 0) {
            formParams.startTime = item.value[0].getTime()
            formParams.endTime = item.value[1].getTime()
          } else {
            formParams[key] = item.value || ''
          }
        })
        this.formParams = formParams
      }
      this.pageNum = 1
      this.getData();
    },

    // 点击Form中重置按钮回调
    onReset () {
      this.clearFormData()
      this.pageNum = 1
      this.getData()
    },

    // 重置表单数据
    clearFormData () {
      let formData = this.formConfig.formItemMap;
      if (formData) {
        Object.keys(formData).forEach(key => {
          formData[key].value = null;
        })
      }
      this.formParams = {};
    },

    // 切换当前页所展示最大条数时的回调
    handleSizeChange () {
      this.getData()
    },

    // 点击当前页码时候的回调
    handleCurrentChange () {
      this.getData()
    },

    onSelect (row) {
      if (this.beforeSelect && !this.beforeSelect(row)) {
        return false
      }
      this.$emit('onChange', row)
    },

    // 当前行是否选中
    disabledRow (row) {
      let initData = this.initData
      return initData && initData.id === row.id
    }
  }
}
</script>
<style lang="less" scoped>
.pager-area {
  margin-top: 10px;
  text-align: right;
}
/deep/.json-form {
  .sa-input,
  .sa-select {
    max-width: 190px;
  }
}
</style>
