<!--  -->
<template>
  <div class="view-addEditAccount">
    <div class="addEditAccount-main">
      <van-cell-group>
        <van-field
          v-model="name"
          required
          label="账户名称"
          placeholder="请输入账户名称"
        />
        <van-field
          v-model="summary"
          required
          label="账户描述"
          placeholder="请输入账户描述, 如“工资卡”"
        />
        <van-field
          v-model="value"
          required
          label="账户余额"
          @click="handleValue"
          readonly
          placeholder="请输入余额"
        />
      </van-cell-group>
    </div>
    <div class="addEditAccount-footer">
      <van-button size="large"
                  type="primary"
                  @click="handleConfirm">保存</van-button>
    </div>
    <van-number-keyboard :show="isShowNumKey"
                         extra-key="."
                         @blur="isShowNumKey = false"
                         theme="custom"
                         @input="handleInputNumber"
                         @delete="handleDeleteNumber"
                         close-button-text="确认" />
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
      value: "0",
      isShowNumKey: false,
      intStack: [],
      floatStack: [],
      isInputInt: true,
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
        this.value = detail.value.toString();
        const { intStack, floatStack } = this.numToStack(this.value);
        this.intStack = intStack;
        this.floatStack = floatStack;
      });
    },
    handleValue() {
      this.isShowNumKey = true;
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
    },
    handleInputNumber(key) {
      if (this.value.length < MAX_MONEY || this.value == "0") {
        if (key == ".") this.isInputInt = false;
        else {
          if (this.isInputInt) {
            this.intStack.push(key);
          } else {
            if (this.floatStack.length <= 1) this.floatStack.push(key);
          }
        }
      }
      this.getValue();
    },
    handleDeleteNumber() {
      const hasInt = Boolean(this.intStack.length),
        hasFloat = Boolean(this.floatStack.length);
      if (hasFloat) {
        this.floatStack.pop();
        if (hasFloat) {
          this.isInputInt = true;
        }
      } else {
        if (hasInt) {
          this.intStack.pop();
        }
      }
      this.getValue();
    },
    getValue() {
      const hasInt = Boolean(this.intStack.length),
        hasFloat = Boolean(this.floatStack.length);
      if (hasInt || hasFloat) {
        if (!hasInt) {
          return (this.value = `0.${this.floatStack.join("")}`);
        } else if (!hasFloat) {
          return (this.value = `${this.intStack.join("")}`);
        }
        return (this.value = `${this.intStack.join("")}.${this.floatStack.join(
          ""
        )}`);
      } else return (this.value = "0");
    },
    numToStack(num) {
      const nums = typeof num == "number" ? num.toString : num;
      const intFloat = nums.split(".");
      let intStack = [],
        floatStack = [];

      intStack = intFloat[0].split("");
      if (intFloat.length > 1) {
        floatStack = intFloat[1].split("");
      }
      return { intStack, floatStack };
    }
  }
};
</script>

<style lang='less' scoped>
.view-addEditAccount {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.addEditAccount-main {
  flex: 1;
}
.addEditAccount-footer {
  padding: 10px 12px;
}
</style>