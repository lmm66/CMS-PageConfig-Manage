<template>
  <div class="order-table-box">
    <p ref="otbServeRef"
       class="otb-title">
      选择服务
    </p>
    <com-table :url="orderServiceListApi"
               :query="query"
               :init-data="selectedData.orderService"
               :columns="columns1"
               :form-config="formConfig1"
               @onChange="onOrderServiceChange" />
    <p class="otb-title">
      选择该服务绑定的促销
    </p>
    <com-table :url="orderSaleListApi"
               :init-data="selectedData.orderSale"
               :columns="columns2"
               :form-config="formConfig2"
               :before-select="onBeforeSelect"
               @onChange="onOrderSaleChange" />
  </div>
</template>
<script>
import comTable from './ComTable'
import { orderServiceListApi, orderSaleListApi } from '@/api/link'
import mixins from './mixins'
import { dayjs } from 'dayjs'
const promotionTimeFormatter = function (row) {
  let s = row.startTime ? dayjs(row.startTime).format('YYYY-MM-DD hh:mm:ss') : ''
  let e = row.endTime ? dayjs(row.endTime).format('YYYY-MM-DD hh:mm:ss') : ''
  return `${s}-${e}`
}
const emptyData = {
  orderService: null,
  orderSale: null
}
export default {
  components: { comTable },
  mixins: [mixins],
  props: {
    initData: {
      type: Object, default: null
    }
  },
  data () {
    return {
      orderServiceListApi,
      orderSaleListApi,
      selectedData: { ...emptyData },
      query: {
        jvStatus: 1,
        skuType: 1,
        status: 1
      },
      columns1: [
        { label: '服务编码', key: 'jvCode' },
        { label: '服务名称', key: 'jvName' }
      ],
      formConfig1: {
        saveKeys: ['id', 'name'],
        formAttrMap: {
          labelWidth: '110px'
        },
        formItemMap: {
          jvCode: {
            label: '服务编码',
            placeholder: '请输入服务编码',
            value: null
          },
          jvName: {
            label: '服务名称 ',
            placeholder: '请输入服务名称',
            value: null
          }
        }
      },
      columns2: [
        { label: '促销ID', key: 'code' },
        { label: '促销名称', key: 'name' },
        { label: '有效期', key: 'time', formatter: promotionTimeFormatter }
      ],
      formConfig2: {
        saveKeys: ['id', 'name'],
        formAttrMap: {
          labelWidth: '110px'
        },
        formItemMap: {
          code: {
            label: '促销ID',
            placeholder: '请输入活动id',
            value: null
          }
        }
      }
    }
  },
  created () {
    if (this.initData) {
      Object.assign(this.selectedData, this.initData)
    }
  },
  methods: {
    setData (data) {
      let hasData = data && Object.keys(data).length > 0
      this.selectedData = hasData ? data : { ...emptyData }
    },
    onBeforeSelect () {
      let s = this.selectedData
      let noServeData = !s.orderService
      if (noServeData) {
        this.$refs.otbServeRef.scrollIntoView()
        this.$message.warning('请先选择服务')
        return false
      }
      return true
    },
    formatData (currentData, saveKeys) { // 部分属性做保存
      if (currentData && saveKeys) {
        let newData = {}
        saveKeys.forEach((key) => {
          newData[key] = currentData[key]
        })
        return newData
      }
      return currentData
    },
    getNewData (data) {
      return {
        orderService: this.formatData(data.orderService, this.formConfig1.saveKeys),
        orderSale: this.formatData(data.orderSale, this.formConfig2.saveKeys)
      }
    },
    onOrderServiceChange (row) {
      this.selectedData.orderService = row
      this.$emit('onChange', this.getNewData(this.selectedData))
    },
    onOrderSaleChange (row) {
      this.selectedData.orderSale = row
      this.$emit('onChange', this.getNewData(this.selectedData))
    }
  }
}
</script>
<style lang="less" scoped>
.order-table-box {
  .otb-title {
    font-size: 16px;
    position: relative;
    margin: 8px 0px;
    &:before {
      content: '';
      width: 4px;
      height: 16px;
      background: #409eff;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>
