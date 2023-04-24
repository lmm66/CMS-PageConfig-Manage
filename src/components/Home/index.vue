<template>
  <div class="view">
    <p>allen提交了一段代码</p>
    <el-card class="card">
      <img class="avatar"
           src="../../assets/default-avatar.png"
           alt="">
      <div class="name">
        {{ currentUser.account }}
      </div>
      <div class="phone">
        {{ currentUser.mobile }}
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'About',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser'])
  }
}
</script>

<style lang="less" scoped>
.card {
  width: 329px;
  // height: 183px;
  overflow: hidden;
  .avatar {
    float: left;
    margin-right: 15px;
    width: 70px;
    height: 70px;
  }
  .name {
    color: #409eff;
    font-size: 20px;
    height: 28px;
    line-height: 28px;
    margin-top: 10px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .phone {
    font-size: 13px;
    height: 24px;
    line-height: 24px;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #eee;
    margin: 15px 0 8px;
  }
}
</style>
