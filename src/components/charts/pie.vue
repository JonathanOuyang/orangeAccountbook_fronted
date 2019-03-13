<!--  -->
<template>
  <div :id="elId"
       class="chart-pie"></div>
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
      default: [
        { value: 235, name: "视频广告" },
        { value: 274, name: "联盟广告" },
        { value: 310, name: "邮件营销" },
        { value: 335, name: "直接访问" },
        { value: 400, name: "搜索引擎" }
      ]
      // required: true
    }
  },
  data() {
    return {
      elId: "",
      chartObj: {}
    };
  },
  created() {
    this.elId = uuid(); //获取随机id
  },
  mounted() {
    this.$nextTick(() => {
      this.chartObj = echarts.init(document.getElementById(this.elId));
      this.render();
    })
  },
  computed: {},

  watch: {
    data: {
      deep: true,
      handler: function() {
        this.render();
      }
    }
  },

  methods: {
    render() {
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}{a} <br/> ￥{c} <br/> ({d}%)"
        },
        series: [
          {
            name: "支出",
            type: "pie",
            radius: "68%",
            center: ["50%", "60%"],
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              fontSize: 14
            }
          }
        ]
      };
      this.chartObj.setOption(option);
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../assets/variable.less";
.chart-pie {
  width: 100%;
  height: 250px;
}
</style>