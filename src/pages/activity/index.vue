<template>
  <fc-table-search ref="table"
                   :form-items="formItems"
                   :table-columns="tableColumns"
                   :form-config="{'label-width': '100px'}"
                   @requestMethod="getTableData">
    <!-- 操作表格区域 -->
    <template #handleDetail="{row}">
      <el-button type="text"
                 size="mini"
                 @click="onEdit(row.id)">编辑</el-button>
      <el-button type="text"
                 size="mini"
                 @click="onToggleActivity(row)">{{row.is_abled === 0 ? '上线' : '下线'}}</el-button>
      <el-button type="text"
                 size="mini"
                 @click="onPreview(row.id, row.title)">预览</el-button>
      <el-button type="text"
                 size="mini"
                 @click="onDelete(row.id)">删除</el-button>
    </template>
    <!-- 新增按钮区域 -->
    <template slot="handleLeft">
      <el-button type="primary"
                 @click="onAdd">
        <i class="el-icon-plus" />新增页面
      </el-button>
    </template>
  </fc-table-search>
</template>

<script>
import { getCmsPageList } from '@/api/activity';
import { updateStatus, deletePage } from '@/api/activity';
export default {
  data () {
    return {
      formItems: [
        {
          comp: 'input',
          prop: 'name',
          label: '页面标题',
          clearable: true
        },
        {
          comp: 'select',
          prop: 'isAbled',
          label: '页面状态',
          options: [
            { value: 0, label: '下线' },
            { value: 1, label: '上线' }
          ],
          includeAll: false
        },
      ],
      tableColumns: [
        { prop: 'id', label: '页面ID' },
        { prop: 'name', label: '页面标题' },
        { prop: 'status', label: '页面状态' },
        { prop: 'create_time', label: '创建时间' },
        { prop: 'update_time', label: '更新时间' },
        { label: '操作', fixed: 'right', slotName: 'handleDetail' }
      ]
    }
  },
  methods: {
    /**
     * 请求Form表单数据
     * @param  {Object}     params     当前页、总条数、其他table相关信息 {current: 1, size: 10, total: 0, name: ''}
     * @param  {Function}       callback     用于渲染table列表，参数: { data: res.list, total: res.total }
     * @param  {Object}      options                 
     */
    async getTableData ({ current, size, ...tableData }, fn) {
      let { ...params } = tableData;
      //   console.log(params);  // { total: 0, name: ''}
      params.pageNum = current;
      params.pageSize = size;
      //   console.log(params);  // { total: 0, name: '', pageNum: 1, pageSize: 10 }
      let res = await getCmsPageList(params);   // {current: 1, size: 10, total: 0, name: '' }
      //   console.log(res);
      let { list, total } = res.data;
      // 后端返回的页面状态的字段为is_abled跟前端定义的字段status不匹配，对数据二次处理
      list.forEach(item => {
        item.status = item.is_abled ? '上线' : '下线'
      })
      //   console.log(res);
      fn({
        data: list || [],
        total
      })
    },

    // 新增页面
    onAdd () {
      // 新开一个标签页
      let { href } = this.$router.resolve({
        path: '/decorate'
      })
      window.open(href, '_blank');
    },

    // 编辑
    onEdit (id) {
      let { href } = this.$router.resolve({
        path: '/decorate',
        query: { id }
      })
      window.open(href, '_blank');
    },

    // 上线/下线
    onToggleActivity (row) {
      if (row.is_abled === 0) {
        this.online(row, 1);
      } else {
        this.offline(row, 0);
      }
    },

    // 上线
    online (row, isAbled) {
      this.$set(row, 'loading', true);
      updateStatus({ id: row.id, isAbled }).then(() => {
        this.$message.success('上线成功!');
        this.$refs.table.onRefresh(true);
      }).catch(err => {
        this.$message.warning(`操作失败：${err.message}`);
      }).finally(() => {
        this.$set(row, 'loading', false);
      })
    },

    // 下线
    offline (row, isAbled) {
      this.$confirm(`是否确认下线活动【${row.name}】`, '提示', {
        confirmButtonText: '确定',
        cancalButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        updateStatus({ id: row.id, isAbled }).then(() => {
          this.$message.success('下线成功!');
          this.$refs.table.onRefresh(true);
        }).catch(err => {
          this.$message.warning(`操作失败：${err.message}`);
        })
      })
    },

    // 预览
    onPreview (id) {
      let { href } = this.$router.resolve({
        path: '/preview',
        query: {
          id,
          data: this.$store.state.wxParams
        }
      })
      window.open(href, '_blank');
    },

    // 删除
    onDelete (id) {
      this.$confirm(`是否确认删除`, '提示', {
        confirmButtonText: '确定',
        cancalButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        deletePage({ id }).then(() => {
          this.$message.success('删除成功!');
          this.$refs.table.onRefresh(true);
        }).catch(err => {
          this.$message.warning(`操作失败：${err.message}`);
        })
      })
    }
  },
}
</script>