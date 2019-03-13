<template>
  <div id="view-chart">
    <date-selector></date-selector>
    <pie :data="data"></pie>
  </div>
</template>

<script>
import pie from "../../components/charts/pie";
import { getMoneySum } from "../../api/api.js";
export default {
  name: "chart",
  components: {
    pie
  },
  data() {
    return {
      data: []
    };
  },

  created() {
    this.init();
  },

  computed: {},

  methods: {
    init() {
      const data = {
        searchValue: {
          moneyTimeStart: this.$moment().startOf('month'),
          moneyTimeEnd: this.$moment().add(1, 'month').startOf('month')
        },
        groupOptions: {
          categoryId: 1
        }
      }
      getMoneySum(data).then(res=>{
        this.data = res.data.result.map(item => ({
          name: res.data.categorys[item._id.categoryId].name,
          value: item.value
        }))
      })
    }
  }
};
</script>

<style lang="less">
@import "../../assets/variable.less";
</style>