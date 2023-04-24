<!-- 对于Vue模板没有具体内容，直接通过函数式组件的形式编写，提高渲染效率 -->
<script>
// import '@/assets/iconfont/iconfont.css'
export default {
  name: 'MenuItem',
  // 表示当前组件为函数式组件
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  // 渲染函数
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []
    const classStr = 'iconfont icon-' + icon
    if (icon) {
      vnodes.push(<i class={classStr}> </i>)
    }
    if (title) {
      vnodes.push(<span>{title}</span>)
    }
    return vnodes
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 18px;
  color: #bfcbd9;
}
</style>
