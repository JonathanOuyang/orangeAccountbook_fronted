<!--  -->
<template>
  <div id="view-categoryMoneys">
    <div class="categoryMoneys-header">
      <category-card
        :data="detail">
        <div class="text-date">
          {{moment.format(dateType.format)}}          
        </div>
      </category-card>
    </div>
    <van-list
      v-model="isListLoading"
      :error="isListError"
      :finished="isListFinished"
      :finished-text="moneys.length>8?'已经到底啦':''"
      error-text="请求失败，点击重新加载"
      @load="handleListLoad"
      :offset="10">
      <money-list :list="moneys"
                  date-format="YYYY-MM-DD HH:mm"
                  :isLoading="isListIniting"></money-list>
    </van-list>
  </div>
</template>

<script>
import { getCategoryList, searchMoneyList } from "../api/api.js";
const PAGE_SIZE = 10;
export default {
  name: "categoryMoneys",
  data() {
    return {
      categoryId: "",
      detail: {},
      moneys: [],
      isListIniting: false,
      isListLoading: false,
      isListFinished: false,
      isListError: false,
      page: 1,
      moment: this.$moment(),
      dateType: ""
    };
  },

  created() {
    this.categoryId = this.$route.query.categoryId;
    if (this.$route.query.month) {
      this.dateType = { key: "month", format: "YYYY年M月" };
    } else if (this.$route.query.year) {
      this.dateType = { key: "year", format: "YYYY年" };
    }
    this.moment = this.$moment(this.$route.query[this.dateType.key]);
    this.handleListLoad();
    getCategoryList({ categoryId: this.categoryId }).then(res => {
      this.detail = res.data.detail;
    });
  },

  methods: {
    handleListLoad() {
      // debugger

      const moment = this.$moment();
      const data = {
        searchValue: {
          categoryId: this.categoryId,
          moneyTimeStart: this.moment.startOf(this.dateType.key).format(),
          moneyTimeEnd: this.moment.endOf(this.dateType.key).format()
        },
        sortOption: {
          moneyTime: -1
        },
        page: this.page,
        pageSize: PAGE_SIZE
      };
      this.isListLoading = true;
      searchMoneyList(data, { loadingToast: false })
        .then(res => {
          this.moneys = [...this.moneys, ...res.data.list];
          this.incomeSum = res.data.incomeSum;
          this.outcomeSum = res.data.outcomeSum;
          this.isListLoading = false;

          if (res.data.currPage === res.data.maxPage) {
            this.isListFinished = true;
          }
          this.page += 1;
        })
        .catch(err => {
          this.isListLoading = false;
          this.isListError = true;
        });
    }
  }
};
</script>

<style lang='less'>
@import "../assets/variable.less";
#view-categoryMoneys {
  .card-category_info {
    padding-right: 10px;
  }
}
.categoryMoneys-header {
  margin: 16px 14px 8px;
  .text-date {
    color: @primaryTextColor;
  }
}
</style>