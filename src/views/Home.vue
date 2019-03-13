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
          class="button-search"
          to="/searchMoney">
          <Icon name="sousuo1" 
          style="color: #f6717d; font-size: 20px;"></Icon>
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
    <div class="home-button-group">
      <router-link class="home-button orange-button"
                   tag="div"
                   to="/calendar">
        <icon name="rili"
              class="button-icon"></icon>
        所有账单
      </router-link>
      <router-link class="home-button orange-button"
                   tag="div"
                   to="/chart">
        <icon name="tubiaobingzhuangtu"
              class="button-icon"></icon>
        财务报表
      </router-link>
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
import loading from '../components/loading/loading.vue'

import { searchMoneyList, getMoneySum } from "../api/api.js";
const PAGE_SIZE = 3;
const SHOW_MONEYS_DAY = 3;
export default {
  name: "home",
  components: {
    loading
  },
  data() {
    return {
      bookName: "生活账本",
      moneyDay: 1,
      income: 0,
      outcome: 0,
      moneys: [],
      isLoading: false
    };
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

      const sumData = {
        searchValue: {
          moneyTimeStart: this.$moment()
            .startOf("month")
            .format("YYYY-MM-DD HH:mm:ss"),
          moneyTimeEnd: this.$moment().format("YYYY-MM-DD HH:mm:ss")
        }
      };
      searchMoneyList(searchData).then(res => {
        const resData = res.data;
        this.moneys = resData.list;
        this.isLoading && (this.isLoading = false);
      });

      // getMoneySum(sumData).then(res => {
      //   const sums = res.data;
      //   this.income = sums.incomeSum;
      //   this.outcome = sums.outcomeSum;
      // });
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
  .van-pull-refresh, .van-pull-refresh__track {
    height: 100%;
  }
  .van-pull-refresh__head {
    background-color: @primaryColor;
  }
}
.home-header-banner {
  display: flex;
  justify-content: flex-end;
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
    padding-left: 10px;
    width: 50px;
    height: 34px;
    border-radius: 17px 0 0 17px;
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

.home-button-group {
  display: flex;
  // justify-content: center;
  margin: 0 10%;
  width: 80%;
  .home-button {
    margin: 6px;
    flex: 1;
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