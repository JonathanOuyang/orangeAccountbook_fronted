<template>
  <div id="view-chart">
    <!-- <pie :data="data"></pie> -->
  </div>
</template>

<script>
// import pie from '../components/charts/pie'
export default {
	name: "chart",
	components: {
		// pie
	},
	data () {
    return {
      data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" }
            ]
    };
  },

  computed: {},

  methods: {}
};
</script>

<style lang="less">
@import "../../assets/variable.less";
</style>