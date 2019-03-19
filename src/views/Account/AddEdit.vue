<!--  -->
<template>
  <div class="view-addEditAccount">
    <div class="main">
      <van-cell-group>
        <van-field
          v-model="name"
          required
          label="账户名称"
          placeholder="请输入账户名称"
        />
        <money-field
          v-model="value"
          label="账户余额"
          placeholder="请输入余额"
        />
        <van-field
          v-model="summary"
          required
          label="账户描述"
          placeholder="请输入账户描述, 如“工资卡”"
        />
      </van-cell-group>
    </div>
    <div class="footer">
      <van-button size="large"
                  type="primary"
                  @click="handleConfirm">保存</van-button>
    </div>
  </div>
</template>

<script>
import {
  getAccountList,
  addAccount,
  updateAccount,
  updateMoney
} from "../../api/api.js";
const MAX_MONEY = 9; // 金额位数
export default {
  name: "addEditAccount",
  data() {
    return {
      name: "",
      summary: "",
      value: 0,
      accountId: ""
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.accountId = this.$route.query.accountId;
      getAccountList({ accountId: this.accountId }).then(res => {
        const detail = res.data.detail;
        this.name = detail.name;
        this.summary = detail.summary;
        this.value = detail.value;
      });
    },
    handleConfirm() {
      const data = {
        name: this.name,
        summary: this.summary,
        value: this.value
      };
      if (this.accountId) {
        updateAccount(
          { ...data, accountId: this.accountId },
          { successDialog: true, goBack: true }
        ).then(res => {});
      } else {
        addAccount(
          data,
          { successDialog: true, goBack: true }
        ).then(res => {});
      }
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../assets/variable.less";
.view-addEditAccount {
  .form-view();
}
</style>