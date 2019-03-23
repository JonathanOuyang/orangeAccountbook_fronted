<template>
  <div id="view-chartBar">
    <date-selector 
      selectYear
      @changeDate="changeDate"
      @changeType="changeDateType"></date-selector>
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
        <div class="item-title">{{item.name}}</div>
        <div class="item-value">¥{{item.value}}</div>
        <div class="item-count">{{item.count}}笔</div>
      </div>
    </div>
  </div>
</template>

<script>
import bar from "../../components/charts/bar";
import { getMoneySum } from "../../api/api.js";

const DATE_TYPES = {
  month: {
    groupKey: 2,
    format: 'M月D日',
    item: 'day'
  },
  year: {
    groupKey: 3,
    format: 'YYYY年M月',
    item: 'month'    
  }
}
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
      selectedDateType: 'month',
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
      this.initData(this.$moment(), this.selectedDateType, this.selectedType);
    },
    initData(moment, dateType, type) {
      const moneyTimeStart = moment.startOf(dateType).format();
      const data = {
        searchValue: {
          type: type,
          moneyTimeStart: moneyTimeStart,
          moneyTimeEnd: this.$moment(moneyTimeStart)
            .add(1, dateType)
            .format()
        },
        groupType: DATE_TYPES[this.selectedDateType].groupKey
      };
      this.data = this.getXAxis(moment);
      getMoneySum(data).then(res => {
        this.data = this.getXAxis(moment).map(day => {
          const item = res.data.result.find(item => item._id[DATE_TYPES[this.selectedDateType].item] === day);
          return {
            name: this.$moment(day).format(DATE_TYPES[this.selectedDateType].format),
            value: item ? item.value : 0,
            count: item ? item.count : 0
          };
        });
      });
    },
    changeType(index) {
      this.selectedType = index;
      this.initData(this.selectedMoment, this.selectedDateType, index);
    },
    changeDate(moment) {
      this.selectedMoment = moment;
      this.initData(moment, this.selectedDateType, this.selectedType);
    },

    changeDateType(type) {
      this.selectedDateType = type.key;
      this.initData(this.selectedMoment, type.key, this.selectedType);
    },
    getXAxis(moment) {
      let xAxis = [];
      if (this.selectedDateType == 'month') {
        let currentMoment = moment.startOf(this.selectedDateType);
        let currentDate = currentMoment.date();
        while (currentDate <= moment.endOf(this.selectedDateType).date()) {
          currentMoment.date(currentDate);
          xAxis.push(currentMoment.format("YYYY-MM-DD"));
          currentDate++;
        }
      } else if (this.selectedDateType == 'year') {
        let currentMoment = moment.startOf(this.selectedDateType);
        let currentDate = currentMoment.month();
        while (currentDate <= moment.endOf(this.selectedDateType).month()) {
          currentMoment.month(currentDate);
          xAxis.push(currentMoment.format("YYYY-MM"));
          currentDate++;
        }
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
.date-item,
.date-header {
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