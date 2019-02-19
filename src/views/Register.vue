<template>
  <div id="view-register">
    <div class="header">注册</div>

    <div class="main">
      <div class="form-wrap">
        <van-cell-group>
          <van-field v-model="name"
                     placeholder="昵称" />
          <van-field v-model="email"
                     placeholder="邮箱" />
          <van-field v-model="password"
                     placeholder="密码" />
          <van-field v-model="password_"
                     placeholder="确认密码" />
        </van-cell-group>
      </div>
      <van-button size="large"
                  @click="handleConfirm">注册</van-button>
    </div>
    <div class="footer">橙子账本</div>
  </div>
</template>

<script>
import { register } from "../api/api";
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
      register.then(res => {});
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
  padding: 20px 30px;
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