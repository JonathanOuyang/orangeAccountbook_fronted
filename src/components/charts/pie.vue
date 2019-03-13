<!--  -->
<template>
  <div :id="elId"
       class="chart-pie"> </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// 引入雷达图组件
import "echarts/lib/chart/pie";
// 引入提示框和图例组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
//引入uuid文件
import uuid from "uuid/v1";

export default {
  name: "chart-pie",
  props: {
    data: {
      type: Array,
      // required: true
    }
  },
  data() {
    return {
      elId: ""
    };
  },
  created() {
    this.elId = uuid(); //获取随机id
  },
  mounted() {
    this.render();
  },

  computed: {},

  methods: {
    render() {
      const option = {
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            data: this.data
          }
        ]
      };
      const chartObj = echarts.init(document.getElementById(this.elId));
      chartObj.setOption(option);
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../assets/variable.less";
.chart-pie {
  width: 100%;
  height: 300px;
}
</style>