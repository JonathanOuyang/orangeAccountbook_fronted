<template>
  <div id="view-budget">
    <div class="main">
      <van-cell-group>
        <money-field
            v-model="value"
            label="总预算金额"
            placeholder="请输入余额"
          />
        <van-cell
          title="预算周期" 
          :value="periodList[period]"/>
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
import { updateBudget, getBudget, getCategoryList } from "../../api/api.js";
export default {
  name: "personal-budgetEdit",
  data() {
    return {
      value: 0,
      period: 1,
      periodList: {
        "0": "每周",
        "1": "每月",
        "2": "每年"
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getBudget().then(res => {
        this.value = res.data.value;
        this.period = res.data.period;
      });
    },
    handleConfirm() {
      const data = {
        value: this.value,
        period: this.period
      };
      updateBudget(data, {
        goBack: true,
        successDialog: true,
        errorDialog: false
      }).then(res => {
        if (res.code === "update_value_wrong") {
          this.$dialog
            .confirm({
              title: "提示",
              message: res.summary + ", 是否将总预算设为分类预算之和"
            })
            .then(() => {
              updateBudget({value: res.data.budgetValue}, {
                goBack: true,
                successDialog: true
              }).then();
            })
            .catch(() => {});
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../../assets/variable.less";
#view-budget {
  .form-view();
  .van-cell-group {
    background-color: @grey;
    margin-top: 10px;
  }
}
</style>