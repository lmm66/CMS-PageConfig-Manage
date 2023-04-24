import {productListApi, singleCouponListAPi, couponBagListApi, activityListApi} from '@/api/link'
import { activityStatusArr } from '@/config/coupon'
import { dayjs } from 'dayjs'

const effectiveTimeFormatter = (row) => {
  const {effectiveType, effectiveStartTime, effectiveEndTime, effectiveDay} = row
  if (effectiveType === 2) {
    let s = effectiveStartTime ? dayjs(effectiveStartTime).format('YYYY-MM-DD hh:mm:ss') : ''
    let e = effectiveEndTime ? dayjs(effectiveEndTime).format('YYYY-MM-DD hh:mm:ss') : ''
    return `${s}至${e}`
  } else {
    return `领取后${effectiveDay}天内有效`
  }
}
// 创建时间格式化
const createdTimeFormatter = (row) => {
  return row.createdTime ? dayjs(row.createdTime).format('YYYY-MM-DD hh:mm:ss') : ''
}
// 活动有效期格式化
const activeTimeFormatter = (row) => {
  let s = row.activityStartTime ? dayjs(row.activityStartTime).format('YYYY-MM-DD hh:mm:ss') : ''
  let e = row.activityEndTime ? dayjs(row.activityEndTime).format('YYYY-MM-DD hh:mm:ss') : ''
  return `${s}至${e}`
}
// 状态格式化
const activityStatusFormatter = (row) => {
  return activityStatusArr.find(i => i.value === row.activityStatus).label
}
export default [
  {
    clickType: 1,
    label: '商品',
    component: 'com-table',
    url: productListApi,
    linkTextAttr: 'name',
    query: {
      jvStatus: 1,
      skuType: 0,
      status: 1
    },
    saveKeys: ['id', 'name'],
    columns: [
      { label: '商品编码', key: 'jvCode' },
      { label: '商品名称', key: 'name' },
      { label: '品牌', key: 'brand' }
    ],
    formConfig: {
      formAttrMap: {
        labelWidth: '110px'
      },
      formItemMap: {
        jvCode: {
          label: '编码',
          placeholder: '请输入编码名称',
          value: null
        },
        name: {
          label: '名称',
          placeholder: '请输入商品名称',
          value: null
        },
        brand: {
          label: '品牌',
          placeholder: '请输入品牌名称',
          value: null
        }
      }
    }
  },
  // {
  //   clickType: 2,
  //   label: '单券',
  //   component: 'com-table',
  //   url: singleCouponListAPi,
  //   linkTextAttr: 'name',
  //   saveKeys: ['id', 'name'],
  //   columns: [
  //     { label: '券模板ID', key: 'id', width: '85px' },
  //     { label: '优惠券名称', key: 'name', width: '100px' },
  //     { label: '有效时间', key: 'effectiveStartTime', formatter: effectiveTimeFormatter, width: '120px' },
  //     { label: '每人限领', key: 'userLimitNum' },
  //     { label: '发放总量', key: 'totalNum' },
  //     { label: '创建时间', key: 'createdTime', formatter: createdTimeFormatter, width: '135px' },
  //     { label: '送券活动', key: 'activityName', width: '100px' },
  //     { label: '活动有效期（券领取有效期）', width: '210px', key: 'activityStartTime', formatter: activeTimeFormatter }
  //   ],
  //   formConfig: {
  //     formAttrMap: {
  //       labelWidth: '110px'
  //     },
  //     formItemMap: {
  //       couponId: {
  //         label: '券模板ID',
  //         placeholder: '请输入编码名称',
  //         value: null
  //       },
  //       couponName: {
  //         label: '优惠券名称',
  //         placeholder: '请输入商品名称',
  //         value: null
  //       },
  //       date: {
  //         type: 'date',
  //         label: '创建时间',
  //         value: null
  //       }
  //     }
  //   }
  // },
  // {
  //   clickType: 6,
  //   label: '券包',
  //   component: 'com-table',
  //   url: couponBagListApi,
  //   query: { applyRange: 0 },
  //   linkTextAttr: 'activityName',
  //   saveKeys: ['id', 'activityName'],
  //   columns: [
  //     { label: '活动ID', key: 'id' },
  //     { label: '活动名称', key: 'activityName' },
  //     { label: '活动有效期（优惠券领取有效期）', width: '210px', key: 'name', formatter: activeTimeFormatter },
  //     { label: '创建时间', key: 'createdTime', width: '135px', formatter: createdTimeFormatter },
  //     { label: '状态', key: 'activityStatus', formatter: activityStatusFormatter }
  //   ],
  //   formConfig: {
  //     formAttrMap: {
  //       labelWidth: '110px'
  //     },
  //     formItemMap: {
  //       couponActivityId: {
  //         label: '活动id',
  //         placeholder: '请输入活动id',
  //         value: null
  //       },
  //       activityName: {
  //         label: '活动名称 ',
  //         placeholder: '请输入活动名称',
  //         value: null
  //       },
  //       date: {
  //         type: 'date',
  //         label: '创建时间',
  //         value: null
  //       }
  //     }
  //   }
  // },
  // {
  //   clickType: 4,
  //   label: '活动页',
  //   component: 'com-table',
  //   url: activityListApi,
  //   linkTextAttr: 'title',
  //   query: {
  //     isShow: 1,
  //     pageType: 1
  //   },
  //   columns: [
  //     { label: '活动页ID', key: 'id' },
  //     { label: '活动标题', key: 'title' }
  //   ],
  //   saveKeys: ['id', 'title'],
  //   formConfig: {
  //     formAttrMap: {
  //       labelWidth: '110px'
  //     },
  //     formItemMap: {
  //       id: {
  //         label: '活动id',
  //         placeholder: '请输入活动id'
  //       },
  //       title: {
  //         label: '活动名称 ',
  //         placeholder: '请输入活动名称'
  //       }
  //     }
  //   }
  // },
  // {
  //   clickType: 10,
  //   label: '提交订单',
  //   linkTextAttr: 'name',
  //   component: 'order-table'
  // },
  // {
  //   clickType: 3,
  //   label: '保养项目',
  //   linkTextAttr: 'projectName',
  //   component: 'project-select',
  //   saveKeys: ['projectCategoryName', 'projectName', 'projectCode']
  // },
  {
    clickType: 7,
    label: '跳转内部url',
    linkTextAttr: 'redirectUrl',
    component: 'inner-url'
  },
  {
    clickType: 8,
    label: '跳转外部url',
    linkTextAttr: 'redirectOuterUrl',
    component: 'outer-url'
  }
]
