<template>
  <div class="bind">
    <Form ref="formBind" :model="formBind">
        <Form-item prop="phone">
            <i class="icon-phone">
              <img src="../../assets/images/phone.png">
            </i>
            <Input type="text" v-model="formBind.phone" placeholder="请输入手机号">
            </Input>
        </Form-item>
        <Form-item prop="code">
            <i class="icon-code">
              <img src="../../assets/images/code.png">
            </i>
            <Input type="password" v-model="formBind.code" placeholder="请输入验证码">
            </Input>
            <button class="getCode" @click="getCode">获取验证码</button>
        </Form-item>

        <div class="btn-item">
          <button class="bindBtn" @click="bindSubmit('formBind')" long>登录</button>
        </div>
    </Form>
  </div>
</template>
<script>
import { sentCode, register } from '@/api/service'
export default {
  data () {
    return {
      formBind: {
        phone: '',
        code: ''
      },
      ruleInline: {
        phone: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'number', min: 4, max: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    bindSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          register({
            phone: this.formBind.phone,
            verifyCode: this.formBind.code
          }).then(res => {
            console.log(res)
          })
        } else {
          this.$Message.error('信息填写不正确!')
        }
      })
    },
    getCode () {
      if (this.formBind.phone === '' || this.formBind.phone === null) {
        this.$Message.warning('请输入手机号！')
        return
      }

      sentCode({
        phone: this.formBind.phone
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less">
@pxtorem: 20rem;
@btnColor: #dad4a2;
@baseColor: #715e33;

.bind {
  height: 100%;
  background: #f0f0f0;
  .ivu-form {
    padding: 80 / @pxtorem 0;
    .ivu-form-item {
      height: 100 / @pxtorem;
      box-sizing: border-box;
      padding: 20 / @pxtorem 15 / @pxtorem;
      margin: 0 0 10 / @pxtorem 0;
      background: #FFFFFF;
      .ivu-form-item-content {
        display: flex;
        .icon-phone {
          width: 29 / @pxtorem;
          height: 43 / @pxtorem;
          margin: 8.5 / @pxtorem 15 / @pxtorem 0 0;
          img {
            width: 29 / @pxtorem;
            height: 43 / @pxtorem;
            vertical-align: top;
          }
        }
        .icon-code {
          width: 32 / @pxtorem;
          height: 36 / @pxtorem;
          margin: 12 / @pxtorem 13 / @pxtorem 0 0;
          img {
            width: 32 / @pxtorem;
            height: 36 / @pxtorem;
            vertical-align: top;
          }
        }
        .ivu-input {
          height: 60 / @pxtorem;
          border: none;
        }
      }
      .getCode {
        // font-size: 28 / @pxtorem;
        width: 170 / @pxtorem;
        height: 60 / @pxtorem;
        border-radius: 6 / @pxtorem;
        color: @baseColor;
        background: @btnColor;
        margin-left: 15 / @pxtorem;
      }
    }

    .btn-item {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 80 / @pxtorem 15 / @pxtorem;
      button {
        font-size: 34 / @pxtorem;
        width: 100%;
        height: 90 / @pxtorem;
        border-radius: 6 / @pxtorem;
        color: @baseColor;
        background: @btnColor;
      }
    }
  }
}
</style>
