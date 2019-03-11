<template>
  <div id="view-accounts">
    <div class="wrap-account" 
         v-for="item in accountList" 
         :key="item._id">
      <account-card 
        :name="item.name"
        :summary="item.summary"
        :value="item.value"></account-card>
    </div>
  </div>
</template>

<script>
import {
  getAccountList
} from "../api/api.js";
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
@import "../assets/variable.less";
.wrap-account {
  margin: 16px 12px;
}
</style>