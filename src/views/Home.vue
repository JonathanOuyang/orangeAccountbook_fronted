<template>
  <div id="view-home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- <div slot="loading" class="loading-wrap">
        <loading :show="isLoading" 
                 type="DoubleBounce" 
                 color="#fff"
                 size="40px"
                 opacity="0"></loading></div> -->
      <header>
        <div class="home-header-banner"> 
        <!-- <div class="home-title">
          <div class="text-book">
            {{bookName}}<Icon name="genghuan"
                  style="margin-left: 0.1rem"></Icon>
          </div>
          <div class="text-extra">
            您已连续记账{{moneyDay}}天
          </div>
        </div> -->
        <router-link 
          tag="div"
          class="button-personal"
          to="/personal">
          <Icon name="wode"
          :size="19"
          style="color: #f6717d;"></Icon>
        </router-link>
        <router-link 
          tag="div"
          class="button-search"
          to="/searchMoney">
          <Icon name="sousuo1" 
          :size="19"
          style="color: #f6717d;"></Icon>
        </router-link>  
      </div>
      <div class="home-panel">
        <div class="home-panel-item">
          <div class="info-title">本月支出</div>
          <div class="info-value">{{outcome}}</div>
        </div>
        <div class="home-panel-item">
          <div class="info-title">本月收入</div>
          <div class="info-value">{{income}}</div>
        </div>
      </div>
    </header>
    <router-link class="button-add orange-button"
                 tag="div"
                 to="/addMoney">
      <icon name="tianjia"
            class="button-icon"></icon>
      添加账单
    </router-link>
    <div 
      class="panel-budget" 
      @click="$router.push('/budget')">
      <div 
        class="budget-text"
        v-if="budgetValue != 0">
        <div class="budget-title">{{lessBudgetValue > 0? '本月预算剩余' : '本月预算超支'}}</div>
        <div class="budget-value">{{lessBudgetValue > 0? lessBudgetValue : -lessBudgetValue}}</div>
      </div>
      <liquidfill
        v-if="budgetValue != 0"
        :data="lessBudgetValue > 0? lessBudgetValue/budgetValue : 0">
      </liquidfill>
      <div 
        class="budget-noValue"
        v-if="budgetValue == 0">
        <div class="budget-title">点击设置预算</div>
      </div>
    </div>
    <div class="moneyList">
      <div class="title-moneyList">
        <span>近期新增账单</span>
      </div>
      <money-list :list="moneys"></money-list>
    </div>
</van-pull-refresh>
  </div>
</template>

<script>
import loading from "../components/loading/loading.vue";
import liquidfill from "../components/charts/liquidfill.vue";
import { searchMoneyList, getMoneySum, getUserInfo } from "../api/api.js";
const PAGE_SIZE = 3;
const SHOW_MONEYS_DAY = 3;
export default {
  name: "home",
  components: {
    loading,
    liquidfill
  },
  data() {
    return {
      bookName: "生活账本",
      moneyDay: 1,
      income: 0,
      outcome: 0,
      budgetValue: 0,
      moneys: [],
      isLoading: false
    };
  },
  computed: {
    lessBudgetValue() {
      return this.budgetValue - this.outcome
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const searchData = {
        searchValue: {
          moneyTimeStart: this.$moment()
            .subtract(SHOW_MONEYS_DAY, "days")
            .format("YYYY-MM-DD HH:mm:ss"),
          moneyTimeEnd: this.$moment().format("YYYY-MM-DD HH:mm:ss")
        },
        sortOption: {
          moneyTime: -1
        },
        page: 1,
        pageSize: PAGE_SIZE
      };

      const moneyTimeStart = this.$moment().startOf("month");
      const sumData = {
        searchValue: {
          moneyTimeStart: moneyTimeStart.format("YYYY-MM-DD"),
          moneyTimeEnd: moneyTimeStart.add(1, "month").format("YYYY-MM-DD")
        }
      };
      searchMoneyList(searchData).then(res => {
        const resData = res.data;
        this.moneys = resData.list;
        this.isLoading && (this.isLoading = false);
      });

      getMoneySum(sumData).then(res => {
        const sums = res.data.result;
        sums.forEach(item => {
          if (item._id.type === 0) {
            this.outcome = item.value;
          }
          if (item._id.type === 1) {
            this.income = item.value;
          }
        });
      });

      getUserInfo().then(res => {
        this.budgetValue = res.data.budgetValue;
      });
    },
    onRefresh() {
      this.init();
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
#view-home {
  color: @primaryTextColor;
  height: 100%;
  .van-pull-refresh,
  .van-pull-refresh__track {
    height: 100%;
  }
  .van-pull-refresh__head {
    background-color: @primaryColor;
  }
}
.home-header-banner {
  display: flex;
  justify-content: space-between;
  .header-background(-40px, 100px);

  .home-title {
    flex: 1;
  }

  .text-book {
    font-size: 24px;
  }
  .text-extra {
    font-size: 14px;
    margin-top: 4px;
  }

  .button-search {
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 12px;
    width: 26px;
    height: 34px;
    border-radius: 17px 0 0 17px;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .button-personal {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 14px;
    width: 28px;
    height: 34px;
    border-radius: 0 17px 17px 0;
    background-color: rgba(255, 255, 255, 0.5);
  }
}

.home-panel {
  width: 80%;
  display: flex;
  margin: 0 10% 20px;
  padding: 16px 0;
  .panel();
  .home-panel-item {
    flex: 1;
    text-align: center;
    .info-title {
      font-size: 16px;
    }
    .info-value {
      font-size: 24px;
      margin-left: -4px;
    }
  }
  .home-panel-item:first-child {
    padding-right: 6px;
    border-right: 1px solid @dividerColor;
  }
  .home-panel-item:last-child {
    padding-left: 6px;
  }
  .info-budget {
    width: 90/20em;
    height: 90/20em;
    border-radius: 50%;
    background: @primaryColor;
  }
}

.button-add {
  margin: 0 40px;
}

.panel-budget {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 40px 0;
  padding: 10px 30px;
  .panel();

  .budget-text {
    flex: 1;

    .budget-title {
      font-size: 16px;
    }
    .budget-value {
      font-size: 30px;
    }
  }

  .budget-noValue {
    flex: 1;
    text-align: center;
    padding: 10px 0;    
    font-size: 16px;
  }
}

.moneyList {
  margin-top: 22px;
  .title-moneyList {
    margin: 0 20px;
    font-size: 16px;
  }
}
</style>