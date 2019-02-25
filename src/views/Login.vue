<template>
  <div id="view-login">
    <div class="header">登录</div>

    <div class="main">
      <div class="form-wrap">
        <van-cell-group>
          <van-field v-model="email"
                     label="邮箱" />
          <van-field v-model="password"
                     type="password"
                     label="密码" />
        </van-cell-group>
      </div>
      <van-button size="large"
                  @click="handleConfirm">登录</van-button>
    </div>
    <div class="footer">橙子账本</div>
  </div>
</template>

<script>
import { login } from "../api/api";
const PASSWORD_MIN_LENGTH = 6;
const EMAIL_RE = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    handleConfirm() {
      const data = {
        email: this.email,
        password: this.password
      };
      if (!EMAIL_RE.test(this.email)) {
        this.$notify({
          message: "请输入正确格式的邮箱地址",
          background: this.$color["error"]
        });
        return;
      }
      login(data).then(res => {
        this.$notify({
          message: res.data.summary,
          background: this.$color["success"]
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("token_exp", new Date().getTime());
        setTimeout(() => {
          this.$router.push("/home");
        }, 800);
      });
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
#view-login {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 40px 30px;
  height: 100%;
  background: @linearColor;

  .header,
  .footer {
    text-align: center;
    color: #fff;
  }

  .header {
    font-size: 30px;
  }

  .form-wrap {
    margin: 50px 0 30px;
  }

  .main {
    flex: 1;
  }

  .footer {
    font-size: 24px;
  }
}
</style>