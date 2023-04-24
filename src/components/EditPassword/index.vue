<template>
  <el-card>
    <div class="editPassword" @keyup.enter="updatePassword">
      <el-form ref="loginForm" :model="form" :rules="rules"
               label-width="120px"
      >
        <el-form-item label="账号">
          <el-input v-model.trim="userInfo.account" clearable disabled>
            <i slot="prefix" class="iconfont icon-user" />
          </el-input>
        </el-form-item>
        <el-form-item label="输入新密码" prop="newPassword">
          <el-input
            v-model.trim="form.newPassword"
            type="password"
            clearable
            readonly
            onfocus="this.removeAttribute('readonly');"
            onblur="this.setAttribute('readonly',true);"
          >
            <i slot="prefix" class="iconfont icon-lock" />
          </el-input>
          <div class="popover">
            密码长度 8~16位，至少1位大写字母、1位小写字母、1位数字<br>新密码不能和旧密码、初始密码一样
          </div>
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="passwordAgain">
          <el-input
            v-model.trim="form.passwordAgain"
            type="password"
            clearable
            readonly
            onfocus="this.removeAttribute('readonly');"
            onblur="this.setAttribute('readonly',true);"
          >
            <i slot="prefix" class="iconfont icon-lock" />
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="checkCode">
          <el-input
            v-model.trim="form.checkCode"
            type="text"
            placeholder="请输入验证码"
            @keyup.enter.native="onLogin('loginForm')"
          >
            <i slot="prefix" class="iconfont icon-safetycertificate" />
            <img
              slot="suffix"
              class="checkCode"
              :src="validateCodeUrl"
              alt
              @click="changeValidateCode"
            >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" :loading="loading"
                     @click="updatePassword"
          >
            确认修改
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { Validator, Common, Encrypt, Auth, Storage } from '@bigbighu/cms-utils'
import User from '../../mixins/user'
export default {
  mixins: [User],
  props: {
    pREFIX: {
      type: String,
      default: 'JV_'
    },
    loginPath: {
      type: String,
      default: '/jv-login'
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
    const validateCheckPass = (rule, value, callback) => {
      if (
        this.form.newPassword !== this.form.passwordAgain &&
        this.form.newPassword &&
        this.form.passwordAgain
      ) {
        callback(new Error('两次密码不匹配'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        newPassword: '',
        passwordAgain: '',
        checkCode: ''
      },
      rules: {
        newPassword: [
          {
            required: true,
            message: '密码不能为空',
            trigger: ['change', 'blur']
          },
          {
            validator: Validator.validator(Validator.validateChangePassword),
            trigger: 'blur'
          }
        ],
        passwordAgain: [
          {
            required: true,
            message: '密码不能为空',
            trigger: ['change', 'blur']
          },
          // {
          //   validator: validator(validateChangePassword),
          //   trigger: 'blur'
          // },
          {
            validator: validateCheckPass,
            trigger: 'blur'
          }
        ],
        checkCode: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: ['change', 'blur']
          }
        ]
      },
      uid: ''
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
    updatePassword() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const secret = new Encrypt('fuchun1234567890')
          const { newPassword, checkCode } = this.form
          const id = this.userInfo.id
          const password = secret.Encrypt(newPassword)
          this.loading = true
          this.$auth.http.updatePassword({
            id,
            password,
            validateCode: checkCode,
            validateKey: this.uid
          })
            .then(res => {
              new Auth().clear()
              new Storage(this.PREFIX).set('logout', Date.now()) // 触发其他标签清除登录信息 session
              this.$message({
                message: '密码修改成功，请重新登录',
                type: 'success'
              })
              this.loading = false
              setTimeout(() => {
                window.location.href = `${this.loginPath}/index.html#/login`
                // this.$router.push({ path: '/login' })
              }, 1000)
            })
            .catch(err => {
              this.loading = false
              this.$message({
                message: err.message,
                type: 'error'
              })
              this.changeValidateCode()
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.editPassword {
  width: 450px;
  padding-top: 20px;
  .el-input /deep/ .el-input__inner {
    border: none;
    border-bottom: 1px solid #e1e1e1;
    border-radius: 0;
    // padding: 0 41px;
  }
  .icon-user,
  .icon-lock,
  .icon-safetycertificate {
    font-size: 28px;
    color: #666666;
  }
  .checkCode {
    width: 117px;
    height: 32px;
    margin-right: -5px;
    cursor: pointer;
  }
  .popover {
    position: absolute;
    top: 0;
    right:  -430px;
    padding: 12px;
    border: 1px solid #e3e7ec;
    box-shadow: 0 2px 12px 0 rgba(222, 220, 220, 0.1);
    white-space: nowrap;
    color: #FF0000;
    border-radius: 2px;
  }
}
</style>
