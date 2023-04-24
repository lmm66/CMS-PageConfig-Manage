const discountTypes = [
  { label: '满减', value: 1 },
  { label: '折扣', value: 2 },
  { label: '代金券', value: 3 }
]
const statusArr = [
  { label: '新建', value: 0 },
  { label: '未开始', value: 10 },
  { label: '进行中', value: 11 },
  { label: '已结束', value: 12 },
  { label: '已作废', value: 20 }
]

// 优惠券状态
const couponStatus = [
  { label: '未发布', value: 0 },
  { label: '已发布', value: 1 },
  { label: '已作废', value: 2 }
]

// 使用平台
const couponTypes = [
  { label: '线上商城使用', value: 2 },
  { label: '线下门店使用', value: 3 }
]

// 优惠券类型
const couponAllTypes = [
  { label: '商城优惠券', value: 1 },
  { label: '门店优惠券', value: 2 },
  { label: '线下门店使用', value: 3 },
  { label: 'ULP优惠券', value: 4 },
  { label: 'KA优惠券', value: 5 }
]

// 送券活动
// 活动类型
const activityTypeArr = [
  { label: '单券', value: 1 },
  { label: '券包', value: 2 },
  { label: 'ULP优惠券', value: 3 },
  { label: 'KA券包', value: 4 }
]

// 状态
const activityStatusArr = [
  { label: '未发布', value: 1 },
  { label: '未开始', value: 5 },
  { label: '进行中', value: 10 },
  { label: '已结束', value: 15 },
  { label: '已下线', value: 20 }
]

// 优惠券明细使用状态
const usageStatus = [
  // { label: '全部', value: '' },
  { label: '未使用', value: 0 },
  { label: '已使用', value: 1 },
  { label: '已过期', value: 2 }
]

// 优惠券明细订单状态
const orderStatusOptions = [
  { label: '待付款', value: 5 },
  { label: '待预约', value: 10 },
  { label: '备货中', value: 12 },
  { label: '可预约', value: 13 },
  { label: '待安装', value: 15 },
  { label: '已完成', value: 30 },
  { label: '已取消', value: 35 },
  { label: '待评价', value: 40 },
  { label: '退款', value: 55 }
]

// 优惠券类型
const couponTypeOptions = [
  { label: '普通优惠券 ', value: 1 },
  { label: '门店线上优惠券', value: 2 },
  { label: '门店线下优惠券', value: 3 },
  { label: 'ULP优惠券', value: 4 },
  { label: 'KA优惠券', value: 5 }
]

// 优惠券明细绑定状态
const bindingStates = [
  { label: '已绑定', value: '' },
  { label: '未绑定', value: 0 }
]
// 优惠券优惠类型
const couponDiscountTypes = [
  { label: '满减券', value: 1 },
  { label: '折扣券', value: 2 },
  { label: '代金券', value: 3 }
]
// 适用范围
const applyRanges = [
  { label: '普通券', value: 0 },
  { label: '礼品券', value: 1 },
  { label: '兑换券', value: 2 }
]
export { discountTypes, statusArr, couponTypes, couponAllTypes, activityTypeArr, activityStatusArr, couponStatus, usageStatus, orderStatusOptions, couponTypeOptions, bindingStates, couponDiscountTypes, applyRanges }
