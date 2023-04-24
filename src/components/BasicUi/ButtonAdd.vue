<template functional>
  <div class="up-pic-add"
       v-on="listeners">
    <i class="el-icon-plus"></i>
    {{ props.addText }}
  </div>
</template>

<style lang="less" scoped>
// 添加内容按钮
.up-pic-add {
  width: 100%;
  padding: 9px 16px;
  border: 1px solid @color-1;
  border-radius: 2px;
  background: #fff;
  color: @color-1;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  i {
    font-weight: bold;
  }
}
</style>
