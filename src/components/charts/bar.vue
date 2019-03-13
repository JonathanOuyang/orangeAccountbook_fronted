<!--  -->
<template>
  <div class="chart-bar">
    
  </div>
</template>

<script>
 import echarts from 'echarts/lib/echarts'
 // 引入雷达图组件
 import 'echarts/lib/chart/bar'
 // 引入提示框和图例组件
 import 'echarts/lib/component/tooltip'
 import 'echarts/lib/component/legend'

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    };
  },

  computed: {},

  methods: {}
}

</script>

<style lang='less' scoped>
@import "../../assets/variable.less";
</style>