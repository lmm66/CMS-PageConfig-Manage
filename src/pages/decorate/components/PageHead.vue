<template>
  <div class="page-head">
    <div class="page-back">
      <a href="javascript:;"
         @click="backToList">
        <img src="@/assets/img/layout/logo.png"
             alt="">
        <span>返回频道列表页面</span>
      </a>
    </div>
    <div class="page-operate">
      <el-button size="medium"
                 type="primary"
                 :loading="saveLoading"
                 @click="savaPageInfo">保存</el-button>
      <el-button size="medium"
                 :loading="prevLoading"
                 @click="viewPageInfo">预览</el-button>
    </div>
  </div>
</template>

<script>
import { saveCmsPage } from '@/api/activity';
export default {
  data () {
    return {
      saveLoading: false,
      prevLoading: false
    }
  },
  computed: {
    pageData () {
      return this.$store.state.pageData;
    }
  },
  methods: {
    /**
     * TODO: 返回活动列表页面
     * 通过window.opener判断活动配置页面的父窗口
     * 如果父窗口为活动列表，直接关闭父窗口，由当天窗口跳转至活动列表页
     **/
    backToList () {
      try {
        if (window.opener && window.opener.location.hash === '#/activity') {
          // 关掉父窗口
          window.opener.close();
        }
        this.$router.push('/activity');
      } catch {
        // 进行路由跳转
        this.$router.push('/activity');
      }
    },

    // 保存活动页面配置
    savaPageInfo () {
      this.saveLoading = true;
      this.savePage().then(() => {
        this.$message.success('保存成功!');
      }).catch((err) => {
        this.$message.warning(`保存失败!${err.$message}`)
      }).finally(() => {
        this.saveLoading = false;
      })
    },

    /**
     * TODO: 调接口，保存页面数据
     * 如果当前页面为新增，id属性为空，需要先拿到后端返回的id属性
     * 保存后需要手动设置id，供后续编辑
     */
    savePage (params) {
      let pageData = { ...this.pageData, params }
      pageData.componentList.forEach((item, index) => {
        item.sort = index
      })
      return saveCmsPage(pageData).then(res => {
        console.log('给后端传递的参数:', this.pageData)
        if (res && res.data && res.data.id) {
          console.log(`当前页面为新增,先拿到后端返回的id:${res.data.id}给当前页面编个号儿先`);
          setIdForAddSave(res.data.id)
        }
      })
    },

    // 拿到后端返回的id为新增页面编号，并修改页面数据
    setIdForAddSave (id) {
      let pageData = { ...this.pageData };
      console.log(123)
      pageData.id = id;
      this.$router.push(`/decorate?id=${id}`);
      this.commit('UPDATE_COMPONENT', pageData);
    },

    /**
     * TODO: 保存并跳转H5预览页面
     * 如果该页面为新增，pageData的id属性为空，需要先拿到后端返回的id属性后跳转
     * 如果该页面为编辑，后端不返回id，从url地址获取id属性后跳转
     */
    viewPageInfo () {
      this.prevLoading = true;
      this.savePage({ online: 1 }).then(res => {
        let id = res && res.data ? res.data.id : '';
        if (id) {
          this.$router.push(`/decorate?id=${id}`)
        } else {
          id = this.$route.query.id;
        }
        this.goToView(id);
        this.$message.success('上架成功');
      }).catch((err) => {
        this.$message.warning(`上架失败!${err.$message}`)
      }).finally(() => {
        this.prevLoading = false;
      })
    },

    // 跳转预览H5活动页面
    goToView (id) {
      let urlObj = this.$router.resolve({
        path: 'preview',
        query: { id }
      })
      window.open(urlObj.href, '_blank');
    },
  }
}
</script>

<style lang="less" scoped>
.page-head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-back {
    height: 100%;

    a {
      height: 100%;
      display: flex;
      align-items: center;
      color: #4f4f4f;
      font-size: 14px;

      img {
        width: 30px;
        margin-right: 4px;
      }
    }
  }

  .page-operate {
    .el-button {
      border-radius: 0;
    }
  }
}
</style>