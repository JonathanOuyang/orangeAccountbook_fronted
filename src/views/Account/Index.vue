<template>
  <div id="view-accounts">
    <div class="wrap-account" 
         v-for="item in accountList" 
         :key="item._id">
      <account-card 
        :data="item"></account-card>
    </div>
    <router-link
      to="/addEditAccount"
      class="button-addAccount">
      <Icon name="tianjia" :size="14"/>
      添加账户
    </router-link>
  </div>
</template>

<script>
import {
  getAccountList
} from "../../api/api.js";
export default {
  name: "accounts",
  data() {
    return {
      accountList: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getAccountList().then(res => {
        this.accountList = res.data.list;
      })
    }
  }
};
</script>

<style lang="less">
@import "../../assets/variable.less";
.wrap-account {
  margin: 16px 12px;
}
.button-addAccount {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 12px;
  height: 48px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid @dividerColor;
  background: #fff;
  color: @secondaryTextColor;

  .iconfont {
    margin-right: 6px;
  }
}
</style>