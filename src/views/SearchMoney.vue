<!-- 搜索账单页 -->
<template>
  <div id="view-serachMoney">
    <van-search 
      placeholder="请输入账单备注关键词"
      background="#fff"
      v-model="value" 
      @search="onSearch"/>
    <money-list :list="moneys"
                date-format="YYYY-MM-DD"
                :isLoading="isListIniting"
                no-data-text=" "></money-list>
  </div>
</template>

<script>
import { searchMoneyList } from "../api/api.js";
export default {
  data () {
    return {
      value: '',
      isListIniting: false,
      moneys: []
    };
  },

  computed: {},

  methods: {
    onSearch() {
      const data = {
        searchValue: {
          note: this.value
        },
        sortOption: {
          moneyTime: -1
        },
        page: 1,
        pageSize: 15
      }
      searchMoneyList(data).then(res => {
        this.moneys = res.data.list
      })
    }
  }
}

</script>

<style lang='less' scoped>
@import "../assets/variable.less";
#view-serachMoney {
  height: 100%;
  background-color: @grey;
}
</style>