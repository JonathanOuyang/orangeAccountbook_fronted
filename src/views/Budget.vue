<template>
  <div id="view-budget">
    <div class="main">
      <div class="cell-group-header">
          分类预算
        </div
      <van-cell-group>
        <money-field
            v-model="value"
            label="预算金额"
            placeholder="请输入余额"
          />
        <van-cell
          title="预算周期" 
          :value="periodList[period]"/>
      </van-cell-group>
      <div class="wrap-category">
        <div class="cell-group-header">
          分类预算
        </div>
        <div class="item-categoryCard"
        v-for="item in categoryList"
        :key="item._id">
          <category-card
          :data="item">
          </category-card>
        </div>
      </div>
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
  name: "personal-budget",
  data() {
    return {
      value: 0,
      period: 1,
      periodList: {
        "0": "每周",
        "1": "每月",
        "2": "每年"
      },
      categoryList: []
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.initCategoryList();
      getBudget().then(res => {
        this.value = res.data.value;
        this.period = res.data.period;
      });
    },
    initCategoryList() {
      getCategoryList({status: 1, type: 0}).then(res => {
        this.categoryList = res.data.list
      });
    },
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
#view-budget {
  .form-view();
  .van-cell-group {
    background-color: @grey;
    margin-top: 10px;
  }
  .wrap-category {
    box-sizing: border-box;
    margin: 10px 0;
    padding: 10px 12px;
    width: 100%;
    background-color: #fff;
  }
  .cell-group-header {
    display: flex;
    align-items: center;
    line-height: 30px;
    font-size: 16px;
    color: @primaryTextColor;
    &::before {
      content: '';
      margin-right: 8px;
      height: 20px;
      width: 4px;
      background: #f6717d;
    }
  }
  .item-categoryCard {
    margin: 6px 0;
  }
}
</style>