<template>
  <div id="view-chart">
    <van-tabs v-model="activeTab"
              color="#f6717d">
              <!-- @change="changeTab"> -->
      <van-tab title="分类占比">
        <category-pie />
      </van-tab>
      <van-tab title="收支趋势">
        <date-bar />
      </van-tab>
    </van-tabs>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import categoryPie from "./CategoryPie";
import dateBar from "./DateBar";
export default {
  name: "chart",
  components: {
    categoryPie,
    dateBar
  },
  data() {
    return {
      activeTab: 0
    };
  },

  computed: {},

  methods: {
    changeTab(index) {
      const PAGES = ['/chart/categoryPie', '/chart/dateBar']
      this.$router.push(PAGES[index])
    }
  }
};
</script>

<style lang="less">
@import "../../assets/variable.less";
.chart-header {
  box-sizing: border-box;
  padding: 10px 36px;
}
</style>