<template>
  <el-form ref="formRef" :model="formData" :rules="formRules">
    <el-form-item label="服务项目" prop="projectId">
      <el-select v-model="formData.projectCode"
                 class="form-item-width"
                 placeholder="请选择"
                 size="mini"
                 style="width: 350px"
                 @change="onChange"
      >
        <el-option
          v-for="opt in projectList"
          :key="opt.projectCode"
          :value="opt.projectCode"
          :label="opt.projectName"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
import mixins from './mixins'
import { getProjectList } from '@/api/link'
export default {
  mixins: [mixins],
  props: {
    initData: {
      type: Object, default: null
    }
  },
  data() {
    return {
      projectList: [],
      formData: {
        projectCode: null,
        projectName: null
      },
      formRules: {
        projectCode: [
          {
            required: true,
            message: '服务项目不能为空',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getData()
      if (this.initData) {
        Object.assign(this.formData, this.initData)
      }
    },
    getData() {
      getProjectList().then((data) => {
        this.projectList = data || []
      })
    },
    onChange(v) {
      let item = this.projectList.filter((item) => {
        return item.projectCode === v
      })[0]
      this.formData.projectName = item.projectName
      this.formData.projectCategoryName = item.projectCategoryName
      this.onDataChange(v) // mixins
    }
  }
}
</script>
