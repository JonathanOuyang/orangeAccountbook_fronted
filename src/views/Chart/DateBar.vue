<template>
  <div id="view-chartBar">
    <date-selector 
      selectYear
      @change="changeDate"></date-selector>
    <div class="chartBar-toolBar">
      <van-button
        v-for="(item, index) in typeList"
        :key="index"
        size="small"
        :type="selectedType === index? 'primary' : 'default'"
        @click="changeType(index)"
        style="marginRight: 2px"
        plain>
        {{item}}
      </van-button>
    </div>
    <bar :data="data"></bar>
    <div class="date-list">
      <div 
        class="date-header">
        <div class="item-title">日期</div>
        <div class="item-value">金额</div>
        <div class="item-count">账单数</div>
      </div>
      <div 
        class="date-item"
        v-for="item in data"
        :key="item.name">
        <div class="item-title">{{$moment(item.name).format('M月D日')}}</div>
        <div class="item-value">¥{{item.value}}</div>
        <div class="item-count">{{item.count}}笔</div>
      </div>
    </div>
  </div>
</template>

<script>
import bar from "../../components/charts/bar";
import { getMoneySum } from "../../api/api.js";
export default {
  name: "date-bar",
  components: {
    bar
  },
  data() {
    return {
      data: [
        { value: 235, name: "视频广告" },
        { value: 274, name: "联盟广告" },
        { value: 310, name: "邮件营销" },
        { value: 335, name: "直接访问" },
        { value: 400, name: "搜索引擎" }
      ],
      selectedMoment: this.$moment(),
      selectedType: 0,
      typeList: ["支出", "收入"]
    };
  },

  computed: {},

  created() {
    this.init();
  },

  methods: {
    init() {
      const params = [];
      this.initDateBar(this.$moment());
    },
    initDateBar(moment) {
      const moneyTimeStart = moment.startOf("month").valueOf();
      const data = {
        searchValue: {
          type: this.selectedType,
          moneyTimeStart: this.$moment(moneyTimeStart).format("YYYY-MM-DD"),
          moneyTimeEnd: this.$moment(moneyTimeStart)
            .add(1, "month")
            .format("YYYY-MM-DD")
        },
        groupType: 2
      };
      this.data = this.getXAxis(moment);
      getMoneySum(data).then(res => {
        this.data = this.getXAxis(moment).map(day => {
          const item = res.data.result.find(item => item._id.day === day);
          return {
            name: this.$moment(day).format("YYYY-MM-DD"),
            value: item ? item.value : 0,
            count: item ? item.count : 0
          };
        });
      });
    },
    changeType(index) {
      this.selectedType = index;
      this.initDateBar(this.selectedMoment);
    },
    changeDate(moment) {
      this.initDateBar(moment);
      this.selectedMoment = moment;
    },
    getXAxis(moment) {
      let xAxis = [];
      let currentMoment = moment.startOf('month');
      let currentDate = currentMoment.date();
      while (currentDate <= moment.endOf('month').date()) {
        currentMoment.date(currentDate)
        xAxis.push(currentMoment.format("YYYY-MM-DD"));
        currentDate++;
      }
      return xAxis;
      
    }
  }
};
</script>

<style lang="less">
@import "../../assets/variable.less";
.chartBar-toolBar {
  padding: 6px 12px 0;
}
.date-item, .date-header {
  display: flex;
  align-items: center;
  margin: 0 10px;
  padding: 0 10px;
  border-bottom: 1px solid @dividerColor;
  background: #fff;
  color: @primaryTextColor;
  overflow: hidden;
  height: 40px;

  .item-title {
    flex: 1;
    font-size: 14px;
    font-weight: lighter;
  }

  .item-value {
    flex: 1;
    text-align: left;
    font-size: 14px;
    font-weight: lighter;
  }
  .item-count {
    width: 20%;
    text-align: left;
    font-size: 14px;
    font-weight: lighter;
  }
}
.date-header {
  font-weight: bold;  
}
</style>