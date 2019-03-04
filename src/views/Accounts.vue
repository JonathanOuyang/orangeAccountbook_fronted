<template>
  <div id="view-accounts">
    <div class="card-account" 
         v-for="item in accountList" 
         :key="item._id">
      <div class="card-account_header">
        <div class="title">
          <span class="title-name">{{item.name}}</span>
          <span class="title-summary">{{item.summary}}</span>
        </div>
      </div>
      <div class="card-account_main">
        <div class="value-number">¥{{item.value}}</div>
      </div>
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
        this.accountList = res.data.data.list;
      })
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
.card-account {
  display: flex;
  flex-direction: column;
  margin: 16px 5%;
  padding: 12px 16px;
  height: 70px;
  border-radius: 4px;
  box-shadow: @shadow;
  background: @linearColor;
  color: @textPrimaryColor;
}

.card-account_header {
  display: flex;
  flex: 1;

  .title-name, .title-summary {
    line-height: 20px;
  }

  .title-name {
    margin-right: 4px;
    font-size: 18px;
  }

  .title-summary {
    font-size: 14px;
  }
}

.card-account_main {
  .value-number {
    font-size: 24px;
  }
}
</style>