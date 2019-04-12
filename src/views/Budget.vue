<template>
  <div id="view-budget">
    <div class="wrap-budget">
      <div class="header-budget">
        <liquidfill
          v-if="budgetValue != 0"
          :data="lessBudgetValue > 0? lessBudgetValue/budgetValue : 0">
        </liquidfill>
        <div 
          class="budget-text"
          v-if="budgetValue != 0">
          <div class="budget-title">{{lessBudgetValue > 0? '本月预算剩余' : '本月预算超支'}}</div>
          <div class="budget-value">{{lessBudgetValue > 0? lessBudgetValue : -lessBudgetValue | currency}}</div>
        </div>
        <div 
          class="budget-noValue"
          v-if="budgetValue == 0">
          <div class="budget-title">点击设置预算</div>
        </div>
      </div>
      <div class="info-budget">
        <div class="info-budget_item">
          <div class="item-title">本月支出</div>
          <div class="item-value">{{value | currency}}</div>
        </div>
        <div class="info-budget_item"
          @click="$router.push('/budgetEdit')">
          <div class="item-title">
            总预算
          </div>
          <div class="item-value">
            {{budgetValue | currency}}
            <Icon name="bianji" :size="12"/>
          </div>
        </div>
        <div class="info-budget_item">
          <div class="item-title">本月剩余</div>
          <div class="item-value">{{$moment().daysInMonth()-$moment().date()}}天</div>
        </div>
      </div>
    </div>
    <div class="wrap-budget">
      <div class="wrap-budget_title">
        分类预算
      </div>
      <div class="item-categoryCard"
        v-for="item in categoryList"
        :key="item._id">
        <category-card
        :data="item">
          <div class="item-categoryCard_info">
            <div class="title">本月支出</div>
            <div class="value">{{item.moneyValue | currency}}</div>
          </div>
          <div 
            class="item-categoryCard_info"
            @click="$router.push('/categoryBudgetEdit')">
            <div class="title">剩余预算</div>
            <div class="value">
              {{item.budgetValue - item.moneyValue | currency}}
              <Icon name="bianji" :size="14"/>
            </div>
          </div>
          <liquidfill
            v-if="budgetValue != 0"
            :radius="40"
            :data="item.budgetValue - item.moneyValue > 0? (item.budgetValue - item.moneyValue)/item.budgetValue : 0">
          </liquidfill>
        </category-card>
      </div>
      <router-link 
        class="button-addCategoryBudget"
        to="/categoryBudgetEdit">
        <Icon name="tianjia" :size="14"/>
        添加分类预算
      </router-link>
    </div>
	</div>
</template>

<script>
import { getBudget, getMoneySum, getCategoryList } from "../api/api.js";
import liquidfill from "../components/charts/liquidfill.vue";
import axios from "axios";
export default {
  name: "personal-budget",
  components: {
    liquidfill
  },
  data() {
    return {
      value: 0,
      budgetValue: 0,
      categoryList: []
    };
  },
  created() {
    this.init();
  },
  computed: {
    lessBudgetValue() {
      return this.budgetValue - this.value;
    }
  },
  methods: {
    init() {
      const moneyTimeStart = this.$moment().startOf("month");
      const sumData = {
        searchValue: {
          moneyTimeStart: moneyTimeStart.format("YYYY-MM-DD"),
          moneyTimeEnd: moneyTimeStart.add(1, "month").format("YYYY-MM-DD"),
          type: 0
        }
      };
      const categorySumData = {
        ...sumData,
        groupType: 1
      };
      axios
        .all([
          getCategoryList({ status: 1, type: 0, showBudget: true }),
          getBudget(),
          getMoneySum(sumData),
          getMoneySum(categorySumData)
        ])
        .then(
          axios.spread((categoryRes, budgetRes, sumRes, categorySumRes) => {
            this.categoryList = categoryRes.data.list;
            this.budgetValue = budgetRes.data.value;
            this.value = sumRes.data.result[0].value;
            this.categoryList.forEach(category => {
              const categoryHasValue = categorySumRes.data.result.find(item => {
                return item._id.categoryId == category._id;
              });
              category.moneyValue = categoryHasValue
                ? categoryHasValue.value
                : 0;
            });
          })
        );
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
#view-budget {
  background-color: @grey;
  .item-categoryCard {
    margin: 6px 10px;
    .card-category {
      height: 60px;
    }
    .card-category_info {
      display: flex;
      align-items: center;
      flex: 1.8;
    }

    &_info {
      flex: 1;
      text-align: center;
      border-left: 1px solid @dividerColor;
    }

    .title {
      font-size: 13px;
      line-height: 20px;
      color: @secondaryTextColor;
    }
    .value {
      font-size: 16px;
      line-height: 24px;
      color: @primaryTextColor;
    }
    .chart-liquidfill {
      margin: 0 6px 0 0;
    }
  }

}

.wrap-budget {
  background-color: #fff;
  margin-bottom: 10px;
  padding-bottom: 10px;

  &_title {
    display: flex;
    align-items: center;
    height: 48px;
    padding-left: 12px;
    font-size: 14px;
    color: @primaryTextColor;
    &::before {
      content: "";
      margin-right: 8px;
      background-color: @primaryColor;
      width: 6px;
      height: 16px;
    }
  }
}

.header-budget {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;

  .budget-text {
    flex: 1;
    margin-left: 15px;

    .budget-title {
      font-size: 14px;
      line-height: 24px;
      color: @secondaryTextColor;
    }
    .budget-value {
      font-size: 30px;
      color: @primaryTextColor;
    }
  }

  .budget-noValue {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
  }
}

.info-budget {
  display: flex;
}

.info-budget_item {
  flex: 1;
  text-align: center;
  border-right: 1px solid @dividerColor;
  .info-budget_item:last-child {
    border-right: 0;
  }
  .item-title {
    font-size: 13px;
    line-height: 20px;
    color: @secondaryTextColor;
  }
  .item-value {
    font-size: 16px;
    line-height: 24px;
    color: @primaryTextColor;
  }
}

.button-addCategoryBudget {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid @dividerColor;
  border-radius: 4px;
  margin: 6px 10px;
  height: 36px;
  font-size: 14px;
  color: @secondaryTextColor;
  .iconfont {
    margin-right: 4px;
  }
}
</style>