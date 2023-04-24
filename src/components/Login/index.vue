<template>
  <div class="login" :style="{backgroundImage: 'url('+ bgImg +')'}">
    <div class="form">
      <h4 v-if="PREFIX === 'JV_'" class="title">
        孚创业务系统
      </h4>
      <h4 v-if="PREFIX === 'SAAS_'" class="title">
        孚创经销商管理系统
      </h4>
      <el-form
        v-if="!firstLogin"
        ref="loginForm"
        :model="form"
        :rules="rules"
        @keyup.enter.native="onLogin"
      >
        <el-form-item prop="username">
          <el-input v-model.trim="form.username" placeholder="请输入账户" clearable>
            <i slot="prefix" class="iconfont icon-user" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- todo enter事件位置 -->
          <el-input
            v-model.trim="form.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
            clearable
          >
            <i slot="prefix" class="iconfont icon-lock" />
          </el-input>
        </el-form-item>
        <el-form-item v-if="isValidateCode" prop="validateCode">
          <el-row :gutter="2">
            <el-col :span="16">
              <el-input v-model.trim="form.validateCode" type="text" placeholder="请输入验证码">
                <i slot="prefix" class="iconfont icon-safetycertificate" />
              </el-input>
            </el-col>
            <el-col :span="8">
              <img class="validateCode" :src="validateCodeUrl" alt
                   @click="changeValidateCode"
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" :loading="form.loading"
                     @click="onLogin"
          >
            登录
          </el-button>
        </el-form-item>
        <div class="forgetPassword">
          <span @click="forgetPassword">忘记密码</span>
        </div>
      </el-form>
      <!-- 首次登录跳转修改密码 -->
      <Edit v-else @updateSuccess="backLogin" />
    </div>
  </div>
</template>

<script>
import { Validator, Common } from '@bigbighu/cms-utils'
import Edit from './Edit'

export default {
  components: {
    Edit
  },
  props: {
    PREFIX: {// eslint-disable-line
      type: String,
      default: 'JV_'
    },
    proPath: {
      type: String,
      default: '/jv-cis'
    },
    baseURL: {
      type: String,
      default: '/api'
    },
    requestURL: {
      type: String,
      default: '/saas-mpf-admin'
    }
  },
  data() {
    const validateUsernameStatus = async (rule, value, callback) => {
      if (!value) {
        return
      }
      let systemCode = this.PREFIX === 'JV_' ? 'XT000001' : 'XT000002'
      let params = { username: value, systemCode }
      let result = await this.$auth.http.checkUserStatus(params)
      this.isValidateCode = result.showVerificationCodeFlag // 显示验证码，1：显示验证码，0：不显示
      if (!result.status) {
        callback(new Error('该账号已被禁用！'))
      } else {
        callback()
      }
    }
    return {
      bgImg: require(`../../assets/images/JV_login/bg_login.jpg`),
      firstLogin: false, // 是否首次登录
      isValidateCode: 0, // 是否需要验证码
      form: {
        loading: false,
        username: '',
        password: '',
        validateCode: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '账号不能为空',
            trigger: ['change', 'blur']
          },
          {
            validator: Validator.validator(Validator.validateUsername),
            trigger: 'blur'
          },
          {
            validator: validateUsernameStatus,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: ['change', 'blur']
          }
        ],
        validateCode: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: ['change', 'blur']
          }
        ]
      },
      uid: '',
      otherQuery: {}
    }
  },

  computed: {
    validateCodeUrl() {
      return `${this.baseURL}${this.requestURL}/user/generateValidateCode?validateKey=${this.uid}`
    }
  },
  mounted() {
    this.uid = Common.createUniqueString()
  },
  methods: {
    // 更换验证码
    changeValidateCode() {
      this.uid = Common.createUniqueString()
    },

    // 登录
    onLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.form.loading = true
          // isValidateCode 是否需要验证码登录
          this.$auth.store.dispatch('user/login', { ...this.form, uid: this.uid, isValidateCode: this.isValidateCode }).then(res => {
            this.loginSuccess(res)
          }).catch(err => {
            this.loginCatch(err)
          })
        }
      })
    },
    // 登录成功回调
    loginSuccess(res) {
      if (res.firstLogin) {
        this.firstLogin = true
        this.form.loading = false
        return // 如果是首次登录，跳转到修改密码界面
      }
      this.$message({
        message: '登录成功',
        type: 'success'
      })
      if (this.PREFIX === 'SAAS_') {
        this.$auth.store.dispatch('user/getDistributorInfo')
      }
      setTimeout(() => {
        this.form.loading = false
        const hostname = window.location.hostname
        if (hostname === '127.0.0.1' || hostname === 'localhost') {
          // 本地开发
          window.location.href =
            window.location.origin +
            `${this.proPath}` +
            '/index.html#/home'
        } else {
          const { query } = this.$route
          if (query.redirect) {
            // 勿动这里，之所以不用 || 容错是因为发布到线上是带文件夹区分系统
            window.location.href = decodeURIComponent(query.redirect)
          } else {
            this.$router.replace({ path: '/' })
          }
        }
      }, 1000)
    },

    // 登录失败回调
    loginCatch(err) {
      this.form.loading = false
      if (err.code === 20013) {
        this.isValidateCode = 1
      }
      this.$message({
        message: err.message,
        type: 'error'
      })
      this.changeValidateCode()
    },

    // 忘记密码
    forgetPassword() {
      this.$alert('请联系管理员重置您的密码', '忘记密码？', {
        confirmButtonText: '确定',
        type: 'warning'
      })
    },

    // 返回登录框
    backLogin() {
      this.changeValidateCode()
      this.firstLogin = false
      this.form.password = ''
      this.form.validateCode = ''
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  .form {
    width: 376px;
    padding: 31px 35px;
    background: #fff;
    position: absolute;
    right: 64px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0 0 20px 0 rgba(0, 13, 88, 0.1);
    border-radius: 8px;
    .title {
      padding: 10px 0 30px;
      color: #0046c2;
      font-size: 28px;
      text-align: center;
    }
    .el-input /deep/ .el-input__inner {
      border: none;
      border-bottom: 1px solid #e1e1e1;
      padding-left: 41px;
      border-radius: 0;
    }
    .icon-user,
    .icon-lock,
    .icon-safetycertificate {
      font-size: 28px;
      color: #666666;
    }
    .validateCode {
      width: 100px;
      height: 32px;
      cursor: pointer;
    }
    .el-button--primary {
      background-color: #0067b3;
      border-color: #0067b3;
    }
    .forgetPassword {
      display: flex;
      justify-content: center;
      margin: 0;
      cursor: pointer;
      font-size: 14px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>
