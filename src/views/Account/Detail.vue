<!--  -->
<template>
  <div class="view-accountDetail">
    <div class="accountDetail-header">
      <account-card
        type="large"
        :data="detail"></account-card>
    </div>
    <van-list
      v-model="isListLoading"
      :error="isListError"
      :finished="isListFinished"
      :finished-text="moneys.length>6?'已经到底啦':''"
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
import { getAccountList, searchMoneyList } from "../../api/api.js";
const PAGE_SIZE = 10;
export default {
  name: "accountDetail",
  data() {
    return {
      accountId: "",
      detail: {},
      moneys: [],
      isListIniting: false,
      isListLoading: false,
      isListFinished: false,
      isListError: false,
      page: 1,
    };
  },

  created() {
    this.accountId = this.$route.query.accountId;
    getAccountList({ accountId: this.accountId }).then(res => {
      this.detail = res.data.detail;
    });
    this.handleListLoad()
  },

  methods: {
    handleListLoad() {
      const moment = this.$moment();
      const data = {
        searchValue: {
          accountId: this.accountId
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
            this.page += 1;    
          }
        })
        .catch(err => {
          this.isListLoading = false;
          this.isListError = true;
        });
    }
  }
};
</script>

<style lang='less' scoped>
</style>