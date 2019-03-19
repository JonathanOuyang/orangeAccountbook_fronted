<!--  -->
<template>
  <div 
    :id="elId"
    class="chart-bar">
    
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
// 引入提示框和图例组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import uuid from "uuid/v1";

export default {
  props: {
    data: {
      type: Array,
      required: true
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
    });
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
      const vm = this;
      const option = {
        title: {
          text: "ECharts 入门示例"
        },
        // tooltip: {
        //   triggerOn: 'click'
        // },
        xAxis: [
          {
            data: this.data.map(item => item.name),
            position: "bottom",
            minInterval: 5,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#ddd",
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowBlur: 10
              }
            },
            axisLabel: {
              color: '#767676',
              fontSize: 11,
              formatter: function (value, index) {
                return vm.$moment(value).format('MM-DD')
              }
            }
          },
          {
            data: this.data.map(item => item.value),
            position: "top",
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisPointer: {
              value: "03-01",
              snap: false,
              lineStyle: {
                color: "#f6717d",
                opacity: 0.5,
                width: 2
              },
              triggerTooltip: false,
              label: {
                show: true,
                formatter: function(params) {
                  const name = params.seriesData[0]? params.seriesData[0].name : vm.data[vm.data.length-1].name
                  return `${vm.$moment(name).format('M月D日')}\n¥${params.value}`;
                },
                backgroundColor: "#a02530"
              },
              handle: {
                show: true,
                color: "#f6717d",
                margin: -400
              }
            },
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            }
          }
        ],
        yAxis: {
          show: false
        },
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 0,
            end: 10
          }
        ],
        series: [
          {
            barWidth: 5,
            name: "dateBar",
            xAxisIndex: 1,
            type: "bar",
            data: this.data,
            itemStyle: {
              barBorderRadius: [2.5, 2.5, 0, 0],
              color: "#f6717d"
            }
          }
        ],
        // tooltip: {
        //   position: ['50%', '10%'],
        //   formatter: function (params) {
        //     debugger
        //     return `${params.name}
        //     ${params.value}`
            
        //   }
        // }
      };
      this.chartObj.setOption(option);

      this.chartObj.dispatchAction({
        type: "highlight",
        seriesName: "dateBar",
        // 可选，数据的 index
        dataIndex: 0
      });
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../assets/variable.less";
.chart-bar {
  width: 108%;
  transform: translateX(-4%);
  height: 250px;
}
</style>