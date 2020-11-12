<template>
  <div class="login">
    <div class="main">
      <div class="left">
        <img src="@/assets/bg.jpg" alt="" />
      </div>
      <div class="right">
        <div class="input">
          <!-- 武警士官 -->
          <h5>后台管理系统</h5>
          <div class="line"></div>
          <el-input class="username" v-model.trim="form.username" placeholder="账号"></el-input>
          <el-input
            class="password"
            v-model.trim="form.password"
            type="password"
            placeholder="密码"
          ></el-input>
          <load-button type="primary" :disabled="disabled" @click="login()"
            >登录</load-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { memberLogin, getUserInfo } from '@/axios/member'
import { setCookie, getCookie } from '@/js-cookie'

export default {
  data() {
    return {
      form: {
        username: getCookie('jh-username') || '',
        password: getCookie('jh-password') || '',
        type:0,
      }
    }
  },
  inject: ['reload'],
  created() {
    this.keydown()
  },
  computed: {
    disabled() {
      return (!this.form.username || !this.form.password)
    }
  },
  methods: {
    keydown() {
      document.onkeydown = (e) => {
        if(this.$route.path.indexOf('login') > -1 && e.keyCode == 13 && !this.disabled) {
          this.login()
        }
      }
    },
    login() {
      this.$store.commit('Change_isBtnLoading', true)
      this.$store.commit('Set_MerchantId', '')
      let url = this.$route.query.url || ''
      memberLogin(this.form).then(data => {
        setCookie('jh-username', this.form.username)
        setCookie('jh-password', this.form.password)
        this.$store.commit('Set_Token', data.result)
        getUserInfo().then(res => {
          this.$store.commit('Set_UserInfo', res.result)
          this.$router.replace({
            path: url ? decodeURIComponent(url) : '/'
          })
          this.reload()
        })
      })
    },
  }
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: #f1f2f7;
  display: flex;
  align-items: center;
  justify-content: center;
  .main {
    width: 65%;
    display: flex;
    .left {
      flex: 1.5;
      img {
        width: 100%;
      }
    }
    .right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      h5 {
        font-size: 22px;
        margin-bottom: 20px;
        text-align: center;
        color: #333333;
      }
      .line {
        width: 40px;
        height: 2px;
        background: #333;
        margin: auto;
        margin-bottom: 55px;
      }
      .input {
        transform: translateY(-20px);
        width: 80%;
        .el-input {
          margin-bottom: 25px;
          &::before {
            position: absolute;
            content: '';
            width: 17px;
            height: 17px;
            display: inline-block;
            background-size: 100% 100%;
            top: 8px;
            left: 10px;
          }
          &.username::before {
            background: url(../../assets/username.png) no-repeat;
          }
          &.password::before {
            background: url(../../assets/password.png) no-repeat;
          }
          input {
            height: 35px;
            line-height: 35px;
            padding-left: 30px;
          }
        }
        .btn-component {
          margin: 0;
          width: 100%;
          height: 35px;
          button {
            height: 100%;
            font-size: 13px !important;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .login .main .right h5 {
    margin-bottom: 15px;
    font-size: 18px;
  }
  .login .main .right .line {
    width: 30px;
    margin-bottom: 35px;
  }
  .login .main .right .input {
      transform: translateY(-5px)
  }
}
</style>