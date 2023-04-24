<template>
  <div class="no-component">
    <img src="./no_select.png">
    暂无组件，请在页面中选择组件进行编辑
  </div>
</template>

<script>
export default {
  name: 'NoSelect'
}
</script>

<style lang="less" scoped>
.no-component {
  text-align: center;
  padding: 50px;
  img {
    display: block;
    width: 150px;
    margin: 0 auto 30px;
  }
}
</style>
