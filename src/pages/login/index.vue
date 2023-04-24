<template>
  <div class="login-bg login-container">
    <el-form ref="loginForm"
             :model="loginForm"
             :rules="loginRules"
             class="login-form"
             autocomplete="on"
             label-position="left">
      <div class="title-container">
        <h3 class="title">
          Cms-Manage内容管理系统
        </h3>
      </div>
      <el-form-item prop="username">
        <el-input ref="username"
                  v-model="loginForm.username"
                  placeholder="用户名"
                  name="username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="密码"
                  name="password" />
      </el-form-item>
      <el-button :loading="loading"
                 type="primary"
                 style="width:100%; margin-bottom:30px;"
                 @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/activity'
export default {
  name: 'Login',
  data () {
    // 校验用户名：element-ui官方文档
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }

    // 校验密码：element-ui官方文档
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // 表单校验规则：Object
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false
    }
  },
  methods: {
    /**
     * 登录: 如果校验规则都通过，valid为true
     * 调用接口login，参数为表单用户名和密码
     * 拿到token、用户名信息存储在浏览器本地
     */
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          login(this.loginForm).then(res => {
            this.loading = false
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', res.data.username)
            this.$router.replace('/home')
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },

    checkCapslock (e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },

    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
<style lang="less" scoped>
.login-bg {
  // width: 100%;
  min-width: 1200px;
  height: 100%;
  background-image: url('../../assets/images/SAAS_login/bg_login.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.login-container {
  .el-input {
    display: inline-block;
    height: 100%;
    width: 100%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #fff;
      height: 47px;
      caret-color: #fff;
    }
  }
}

.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-form {
    position: absolute;
    right: 180px;
    width: 400px;
    max-width: 100%;
    padding: 160px 35px 0;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: rgb(29, 24, 24);
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
