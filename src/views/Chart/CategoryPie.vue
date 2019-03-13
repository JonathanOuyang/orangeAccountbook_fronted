<template>
  <div id="view-chart">
    <date-selector 
      @change="dateChange"></date-selector>
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
      this.initCategorySum(this.$moment())
    },
    initCategorySum(moment){
      const data = {
        searchValue: {
          moneyTimeStart: moment.startOf('month'),
          moneyTimeEnd: moment.add(1, 'month').startOf('month')
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
    },
    dateChange(moment){
      // console.log('moment: ', moment);
      this.initCategorySum(moment);
    }
  }
};
</script>

<style lang="less">
@import "../../assets/variable.less";
</style>