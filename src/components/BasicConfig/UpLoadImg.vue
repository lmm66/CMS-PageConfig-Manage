<template>
  <!-- 上传图片模态框 -->
  <el-dialog
    title="我的图片"
    :visible.sync="dialogImageVisible"
    :before-close="dialogHide"
    width="900px"
  >
    <!-- 新上传图片 -->
    <el-upload
      ref="upload"
      :action="actionUrl"
      :multiple="false"
      list-type="picture"
      :show-file-list="false"
      :on-success="dosuccess"
      :on-error="doerror"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary" :loading="uploading">
        +&nbsp;上传图片
      </el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>

    <!-- 选择图片库已有图片 -->
    <div v-if="groupList && groupList.length > 0" class="picture-content">
      <ul v-loading="groupLoading" class="picture-group">
        <li
          v-for="item in groupList"
          :key="item.uuid"
          :class="{'active':selectGroupId === item.uuid}"
          @click="changeGroup(item.uuid)"
        >
          <span class="size">{{ item.count }}</span>
          {{ item.name }}
        </li>
      </ul>
      <div v-loading="loading" class="picture-main">
        <ul v-show="list && list.length > 0" class="picture-list">
          <li v-for="item in list" :key="item.uuid" @click="selectPic(item)">
            <div class="pic">
              <img v-if="item.pictureUrl" :src="item.pictureUrl">
            </div>
            <p class="name">
              {{ item.pictureName }}
            </p>
            <div v-show="selectPicId === item.uuid" class="seleted">
              <i class="el-icon-check" />
            </div>
          </li>
        </ul>
        <div v-show="!list || list.length === 0" class="no-pic">
          该分类下暂无图片
        </div>
      </div>
      <div v-show="list && list.length > 0" class="list-page">
        <el-pagination
          background
          :current-page="nowPage"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @current-change="pageChange"
        />
      </div>
    </div>
    <div v-else class="no-data">
      图片库中暂无图片
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :disabled="!selectPicUrl" @click="selectSure">
        确 定
      </el-button>
      <el-button @click="dialogHide">
        取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchPictureGroup, fetchPictureList, upLoadUrl } from '@/api/index'

export default {
  name: 'UpLoadImg',
  props: ['dialogImageVisible'],
  data() {
    return {
      groupLoading: false, // 分组数据是否正在加载中
      groupList: [], // 分组数据
      selectGroupId: '', // 当前选择的分类ID
      loading: false, // 图片列表数据是否正在加载中
      nowPage: 1, // 当前页
      total: 0, // 列表数据条数
      // 列表数据
      list: [],
      selectPicId: '', // 当前选择的图片ID
      selectPicUrl: '', // 当前选择的图片地址
      actionUrl: upLoadUrl, // 上传图片接口地址
      uploading: false // 是否正在上传图片中
    }
  },
  watch: {
    // 模态框第一次显示时获取列表数据
    dialogImageVisible(newVal, oldVal) {
      if (newVal && this.groupList.length === 0) {
        // 改图片接口暂时没有
        // this.getGroup()
      }
    }
  },
  methods: {
    // 获取图片库分组
    getGroup() {
      var qm = {
        queryParams: {
          vendorUuid: {
            operation: 'EQ',
            value: ''
          }
        }
      }
      this.groupLoading = true
      fetchPictureGroup(qm).then(res => {
        this.groupLoading = false
        let list = res.returnMessage
        if (list && list.length > 0) {
          this.groupList = list
          // 获取第一个分组的图片列表
          this.changeGroup(list[0].uuid)
        }
      })
    },
    // 切换选择的分组
    changeGroup(id) {
      this.selectGroupId = id
      this.getList()
    },
    // 获取图片库数据
    getList() {
      var qm = {
        queryPage: this.nowPage,
        pageShow: 10,
        queryParams: {
          vendorUuid: {
            operation: 'EQ',
            value: ''
          },
          groupUuid: {
            operation: 'EQ',
            value: this.selectGroupId
          }
        }
      }
      this.loading = true
      fetchPictureList(qm).then(res => {
        this.loading = false
        this.list = res.returnMessage
        this.total = res.pager.totalNum
      })
    },
    // 图片数据翻页
    pageChange(val) {
      this.nowPage = val
      this.getList()
    },
    // 选择图片库商品图片
    selectPic(item) {
      if (this.selectPicId === item.uuid) {
        this.clearSelectPic()
      } else {
        this.selectPicId = item.uuid
        this.selectPicUrl = item.pictureUrl
      }
    },
    // 清除当前选择的图片
    clearSelectPic() {
      this.selectPicId = ''
      this.selectPicUrl = ''
    },
    // 确认选择图片库图片
    selectSure() {
      this.$emit('upLoadImgSuccess', this.selectPicUrl)
      this.dialogHide()
      this.clearSelectPic()
    },
    // 上传图片前的验证方法
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt500 = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt500) {
        this.$message.error('上传图片大小不能超过 500kb!')
      }
      if (isJPG && isLt500) {
        this.uploading = true
        return true
      } else {
        return false
      }
    },
    // 上传图片成功的方法
    dosuccess(response, file, fileList) {
      this.uploading = false
      this.$emit('upLoadImgSuccess', response.data)
      this.dialogHide()
    },
    // 上传图片失败的方法
    doerror() {
      this.$message.error('上传失败，请稍后重试')
      this.uploading = false
    },
    dialogHide() {
      this.$emit('update:dialogImageVisible', false)
    }
  }
}
</script>

<style lang="less" scoped>
.el-upload__tip {
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 0 10px;
  color: #999;
}
// 图片库图片样式
.picture-content {
  margin-top: 10px;
  overflow: hidden;
  .picture-group {
    float: left;
    width: 180px;
    background: #f2f2f2;
    height: 400px;
    padding-top: 5px;
    overflow-y: auto;
    li {
      font-size: 12px;
      padding: 0 15px;
      line-height: 30px;
      cursor: pointer;
      color: #222;
      .size {
        float: right;
        color: #999;
      }
      &.active {
        background: #fff;
      }
    }
  }
  .picture-main {
    margin-left: 190px;
    height: 405px;
    overflow: hidden;
    .picture-list {
      height: 100%;
      overflow-y: auto;
      li {
        position: relative;
        float: left;
        width: 105px;
        margin-right: 10px;
        cursor: pointer;
        .pic {
          width: 105px;
          height: 105px;
          background-color: #eee;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .name {
          font-size: 12px;
          line-height: 30px;
          height: 30px;
          .ellipsis;
        }
        .seleted {
          position: absolute;
          left: 0;
          top: 0;
          width: 105px;
          height: 105px;
          border: 2px solid @color-1;
          box-sizing: border-box;
          &:after {
            position: absolute;
            content: " ";
            right: 0;
            top: 0;
            border-color: #07d #07d transparent transparent;
            border-style: solid;
            border-width: 14px;
            z-index: 1;
          }
          i {
            position: absolute;
            right: 1px;
            top: 1px;
            z-index: 2;
            font-size: 12px;
            color: #fff;
          }
        }
      }
    }
    .no-pic {
      padding-top: 120px;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
  }
}
.list-page {
  clear: both;
  padding-top: 15px;
  text-align: right;
}
</style>
