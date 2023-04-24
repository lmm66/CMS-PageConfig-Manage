<template>
  <div class="edit" @keyup.enter="updatePassword">
    <h4 class="title">
      首次登录，请修改密码
    </h4>
    <el-form ref="initPasswordForm" :model="form" :rules="rules">
      <el-form-item prop="username">
        <el-input v-model.trim="account" clearable disabled>
          <i slot="prefix" class="iconfont icon-user" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model.trim="form.password"
          type="password"
          clearable
          readonly
          onfocus="this.removeAttribute('readonly');"
          onblur="this.setAttribute('readonly',true);"
          placeholder="请输入新密码"
        >
          <i slot="prefix" class="iconfont icon-lock" />
        </el-input>
      </el-form-item>
      <el-form-item prop="passwordAgain">
        <el-input
          v-model.trim="form.passwordAgain"
          type="password"
          clearable
          readonly
          onfocus="this.removeAttribute('readonly');"
          onblur="this.setAttribute('readonly',true);"
          placeholder="再次输入新密码"
        >
          <i slot="prefix" class="iconfont icon-lock" />
        </el-input>
      </el-form-item>
      <el-form-item prop="validateCode">
        <el-row :gutter="2">
          <el-col :span="16">
            <el-input
              v-model.trim="form.validateCode"
              type="text"
              placeholder="请输入验证码"
            >
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
        <el-button style="width:100%" type="primary" @click="updatePassword">
          确认修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Validator, Common, Encrypt } from '@bigbighu/cms-utils'
import { mapGetters } from 'vuex'

export default {
  props: {
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
        this.form.password !== this.form.passwordAgain &&
        this.form.password &&
        this.form.passwordAgain
      ) {
        callback(new Error('两次密码不匹配'))
      } else {
        callback()
      }
    }
    return {
      uid: '',
      form: {
        password: '',
        passwordAgain: '',
        validateCode: ''
      },
      rules: {
        password: [
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
        validateCode: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters('user', ['user_id', 'account', 'token']),
    validateCodeUrl() {
      return `${this.baseURL}${this.requestURL}/user/generateValidateCode?validateKey=${this.uid}`
    }
  },
  mounted() {
    this.uid = Common.createUniqueString()
  },
  methods: {
    changeValidateCode() {
      this.uid = Common.createUniqueString()
    },
    updatePassword() {
      this.$refs.initPasswordForm.validate(valid => {
        if (valid) {
          const secret = new Encrypt('fuchun1234567890')
          const { validateCode } = this.form
          const password = secret.Encrypt(this.form.password)
          this.$auth.http.updatePassword(
            {
              id: this.user_id,
              password,
              validateCode,
              validateKey: this.uid
            },
            {
              headers: {
                Authorization: `Bearer${this.token}`
              }
            }
          )
            .then(res => {
              this.$message({
                message: '修改成功，请重新登录',
                type: 'success'
              })
              this.$emit('updateSuccess')
            })
            .catch(err => {
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
.edit {
  .title {
    margin-bottom: 10px;
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
  .set-password {
    display: flex;
    justify-content: space-between;
    text-decoration: underline;
    margin-left: 80px;
  }
}
</style>
