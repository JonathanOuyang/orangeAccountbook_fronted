<template>
  <div id="view-personal">
    <div class="main">
      <van-cell-group>
        <money-field
            v-model="value"
            label="账户余额"
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
import { updateBudget, getBudget } from "../../api/api.js";
export default {
  name: "personal-budget",
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
    getBudget().then(res => {
      this.value = res.data.value;
      this.period = res.data.period;
    });
  },
  methods: {
    handleConfirm() {
      const data = {
        value: this.value,
        period: this.period
      }
      updateBudget(data, {goBack: true, successDialog: true}).then(res => {})
    }
  },
};
</script>

<style lang="less">
@import "../../assets/variable.less";
#view-personal {
  .form-view();
  .van-cell-group {
    background-color: @grey;
    margin-top: 10px;
  }
}
</style>