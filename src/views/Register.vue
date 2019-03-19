<template>
  <div id="view-register">
    <div class="header">注册</div>

    <div class="main">
      <div class="form-wrap">
        <van-cell-group>
          <!-- <van-field v-model="name"
                     label="昵称" /> -->
          <van-field v-model="email"
                     label="邮箱" />
          <van-field v-model="password"
                     type="password"
                     label="密码" />
          <van-field v-model="password_"
                     type="password"
                     label="确认密码" />
        </van-cell-group>
      </div>
      <van-button size="large"
                  @click="handleConfirm">注册</van-button>
      <van-button size="large"
                  plain
                  to="/login">已有账号？前往登录</van-button>
    </div>
    <div class="footer">橙子账本</div>
  </div>
</template>

<script>
import { register } from "../api/api";
const PASSWORD_MIN_LENGTH = 6;
const EMAIL_RE = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

export default {
  name: "register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_: ""
    };
  },
  methods: {
    handleConfirm() {
      const data = {
        // name: this.name,
        email: this.email,
        password: this.password
      };
      // if (!this.name) {
      //   this.$notify({
      //     message: "请输入昵称",
      //     background: this.$color["error"]
      //   });
      //   return;
      // }
      if (!EMAIL_RE.test(this.email)) {
        this.$notify({
          message: "请输入正确格式的邮箱地址",
          background: this.$color["error"]
        });
        return;
      }
      if (this.password.length < PASSWORD_MIN_LENGTH) {
        this.$notify({
          message: "请输入大于6个字符的密码",
          background: this.$color["error"]
        });
        return;
      }
      if (this.password !== this.password_) {
        this.$notify({
          message: "前后密码不一致",
          background: this.$color["error"]
        });
        return;
      }
      register(data, { setToken: false }).then(res => {
        this.$notify({
          message: res.summary,
          background: this.$color["success"]
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 800);
      });
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
#view-register {
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
    .van-button--default {
      margin-bottom: 6px;
    }
  }

  .footer {
    font-size: 24px;
  }
}
</style>