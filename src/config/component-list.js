/*
 * 页面可选组件列表
 */
const DEF_MAX_NUM = 50
const componentlist = [
  {
    title: '基础组件',
    components: [
      {
        name: '图片广告',
        iconClass: 'cms-icon-ad',
        maxNumForAdd: DEF_MAX_NUM,
        data: {
          component: 'Carousel',
          validTime: [],
          layout: 'swiper',
          imageList: [
            {
              link: null,
              imageUrl: '',
              text: '导航1'
            }
          ],
          imageMargin: 0,
          isDefaultMargin: 0,
          marginSize: [0, 0],
          isBorderRadius: 0,
          radius: 0,
          backgroundColor: '',
          piclist: []
          // imageRadius: 'square',
          // imageStyle: 'normal',
          // imageMargin: 0,
          // pageMargin: 0
        }
      },
      /* 
      * component 组件类型标识
      * validTime 组件生效时间 
      * layout 组件布局方式
      * text 浮层标题名称
      * backgroundColor 背景颜色
      * textColor 字体颜色
      * columnPadding 上下边距
      * rowPadding 左右边距
      * lineNumber 单行个数
      * borderRadius 圆角大小
      * imageList 图片列表
      */ 
      {
        name: '图文导航',
        maxNumForAdd: DEF_MAX_NUM,
        iconClass: 'cms-icon-nav',
        data: {
          component: 'ImageNav',
          validTime: [],
          layout: 'pic',
          text: '',
          backgroundColor: '#FFFFFF',
          textColor: '#323233',
          columnPadding: 20,
          rowPadding: 20,
          lineNumber: 4,
          borderRadius: 0,
          imageList: [
            {
              link: null,
              imageUrl: '',
              text: '导航1'
            },
            {
              link: null,
              imageUrl: '',
              text: '导航2'
            },
            {
              link: null,
              imageUrl: '',
              text: '导航3'
            },
            {
              link: null,
              imageUrl: '',
              text: '导航4'
            }
          ]
        }
      },
      /* 
      * component 组件类型标识
      * validTime 组件生效时间 
      * imageUrl 公告图标
      * noticelist 公告内容
      * backgroundColor 背景色
      * textColor 字体颜色
      */ 
      {
        name: '公告',
        maxNumForAdd: 1,
        iconClass: 'cms-icon-notice',
        data: {
          component: 'Notice',
          validTime: [],
          imageUrl: '',
          noticelist: [
            {
              link: {},
              text: '请填写公告内容'
            }
          ],
          backgroundColor: '#FFF8E9',
          textColor: '#666666'
        }
      },
      /* 
      * component 组件类型标识
      * validTime 组件生效时间 
      * template 模版样式
      * imageList 图片列表
      * pageMargin 内边距
      */ 
      {
        name: '魔方',
        iconClass: 'cms-icon-cube',
        maxNumForAdd: DEF_MAX_NUM,
        data: {
          component: 'CubeSelection',
          validTime: [],
          template: 'oneLine2',
          imageList: [],
          pageMargin: 0
          // imgMargin: 0
        }
      },
      /* 
      * component 组件类型标识
      * validTime 组件生效时间 
      * backgroundColor 背景色
      * content 富文本内容
      */ 
      {
        name: '文本',
        iconClass: 'cms-icon-text',
        maxNumForAdd: DEF_MAX_NUM,
        data: {
          component: 'RichText',
          validTime: [],
          backgroundColor: '',
          content: ''
        }
      },
      /* 
      * component 组件类型标识
      * validTime 组件生效时间 
      * type 显示类型
      * paddingVisible 是否显示边距
      * defBorderColor 默认线条颜色
      * borderColor 线条颜色
      * borderStyle 线条样式， 实线、虚线、点线
      * defBackgroundColor 默认背景颜色, 用来重置使用
      * backgroundColor 背景色
      * height 高度
      */ 
      {
        type: 'AssistLine',
        iconClass: 'cms-icon-line',
        maxNumForAdd: DEF_MAX_NUM,
        component: 'AssistLine',
        name: '辅助线',
        data: {
          component: 'AssistLine',
          validTime: [],
          type: 1, // 1: 辅助线 ， 2： 空白
          paddingVisible: false, // 是否显示边距
          defBorderColor: '#666', // 默认线条颜色
          borderColor: '#666', // 线条颜色
          borderStyle: 'solid', // 线条样式， 实线、虚线、点线
          defBackgroundColor: '', // 默认背景颜色, 用来重置使用
          backgroundColor: '',
          height: 10
        }
      },
      /* 
      * component 组件类型标识
      * validTime 组件生效时间
      * imageUrl 浮标图片
      * link 跳转链接
      * hideByPageScroll 是否在页面滚动时隐藏
      * width 图片宽度
      */ 
      {
        name: '浮标',
        iconClass: 'cms-icon-float',
        maxNumForAdd: 1,
        data: {
          component: 'FloatLayer',
          validTime: [],
          imageUrl: '',
          link: null,
          hideByPageScroll: true, // 是否在页面滚动时隐藏
          width: 100
        }
      },
      /* 
      * component 组件类型标识
      * validTime 组件生效时间
      * text 浮层标题名称
      * hideByPageScroll 是否在页面滚动时隐藏
      */ 
      {
        name: '客服',
        iconClass: 'cms-icon-online',
        maxNumForAdd: 1,
        data: {
          component: 'OnlineService',
          validTime: [],
          text: '客服', // 浮层标题名称
          hideByPageScroll: true // 是否在页面滚动时隐藏
        }
      },
      {
        name: '横向滑动',
        iconClass: 'cms-icon-overflow',
        maxNumForAdd: DEF_MAX_NUM,
        data: {
          component: 'Slider',
          validTime: [],
          isDefaultMargin: true,
          padding: [15, 15],
          imageMargin: 15,
          backgroundColor: '#FFF',
          imageList: [
            {
              link: null,
              imageUrl: '',
              text: '图片1'
            },
            {
              link: null,
              imageUrl: '',
              text: '图片2'
            },
            {
              link: null,
              imageUrl: '',
              text: '图片3'
            }
          ]
        }
      },
      {
        name: '弹窗',
        iconClass: 'cms-icon-alert',
        maxNumForAdd: 1,
        data: {
          component: 'Dialog',
          validTime: [],
          timing: 'every', // once 一次,every 每次，day 每天一次
          imageList: [
            {
              text: '',
              imageUrl: '',
              link: null // 跳转的链接
            }
          ]
        }
      },
      {
        name: '商品',
        iconClass: 'cms-icon-prod',
        maxNumForAdd: DEF_MAX_NUM,
        data: {
          component: 'product',
          validTime: [],
          // link: {}, // 跳转链接
          // imageList: [], // 图片列表
          // imageUrl: '', // 图片地址
          // radius: 0, // 圆角
          // text: '', // 文本内容
          // textColor: '', // 文本颜色
          // backgroundColor: '', // 背景颜色
          // layout: '', // 组件布局方式
          marginTop: 0, // 外上边距（其他参考这个）
          exchangePriceColor: '#F5514B', // 兑换价颜色
          // exchangeButtonColor: '#F5514B', // 兑换按钮颜色
          productList: [], // 商品列表
          // sortType: 'customsort', // 排序方式  自定义排序 customsort 系统排序 stylesort
          // priceSortType: 'order', // 兑换积分价顺序  按兑换积分价顺序排序 order 按兑换积分价倒序排序 reverse
          listStyle: 'oneLineOne', // 列表样式 一行一个 oneLineOne 一行两个 oneLineTwo 一大两小 oneBigTwoSmall 详细列表 listDetail
          markingPrice: 0, // 是否显示划线价
          purchase: 0 // 是否显示购买图标
          // styleType: 'styleType1', // 显示样式  样式1 styleType1 样式2 styleType2.... 以此类推
          // showProduceName: 1, // 显示商品名称
          // lineShowType: 'onelineshow', // 商品名称显示一行还是两行 显示一行 onelineshow 显示两行 twolineshow
          // cornerMarker: 1, // 商品角标
          // originalPrice: 0, // 是否显示原价
          // purchaseButton: 1, // 是否显示购买按钮
          // purchaseButtonType: 'buttontype1', // 按钮样式 按钮样式1 buttontype1 按钮样式2 buttontype2
          // newTag: 1, // 是否显示新商品标签
          // outOfStock: 'show', // 商品缺货显示  显示 show 沉底显示  showBottom  隐藏  hidden
          // beOverdue: 0 // 非兑换日期内商品隐藏
        }
      }
    ]
  }
]

export default componentlist
