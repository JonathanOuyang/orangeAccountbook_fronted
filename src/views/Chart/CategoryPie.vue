<template>
  <div id="view-chartPie">
    <date-selector 
      selectYear
      @changeDate="changeDate"
      @changeType="changeDateType"></date-selector>
    <div class="chartPie-toolBar">
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
    <pie
      v-if="data.length"
      :data="data"
      :selectedIndex="selectedIndex"
      @selectPie="selectCard"/>
    <div 
      class="list-categoryCard"
      v-if="data.length">
      <div class="item-categoryCard"
        v-for="(item, index) in data"
        :key="item._id">
        <category-card
         :data="item"
         :selected="selectedIndex === index"
         :selecteKey="index"
         @select="selectCard"
         @disselect="selectedIndex = -1">
          <div class="info-value">¥{{item.value}}</div>
          <div class="info-count">共{{item.count}}笔</div>
        </category-card>
      </div>
    </div>
    <div
      v-if="!data.length"
      class="noData-tip">
      暂无数据
    </div>
  </div>
</template>

<script>
import pie from "../../components/charts/pie";
import { getMoneySum } from "../../api/api.js";
export default {
  name: "category-pie",
  components: {
    pie
  },
  data() {
    return {
      data: [],
      selectedIndex: -1,
      selectedType: 0,
      selectedDateType: "month",
      selectedMoment: this.$moment(),
      typeList: ["支出", "收入"]
    };
  },

  created() {
    this.init();
  },

  computed: {},

  methods: {
    init() {
      this.initData(
        this.$moment(),
        this.selectedDateType,
        this.selectedType
      );
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
        groupType: 1
      };
      getMoneySum(data).then(res => {
        this.data = res.data.result.map(item => ({
          _id: item._id.categoryId,
          name: res.data.categorys[item._id.categoryId].name,
          icon: res.data.categorys[item._id.categoryId].icon,
          type: res.data.categorys[item._id.categoryId].type,
          value: item.value,
          count: item.count
        }));
      });
    },
    changeDate(moment) {
      this.initData(moment, this.selectedDateType, this.selectedType);
      this.selectedMoment = moment;
    },
    changeDateType(type) {
      this.selectedDateType = type.key;
      this.initData(this.selectedMoment, type.key, this.selectedType);
    },
    changeType(index) {
      this.selectedType = index;
      this.initData(
        this.selectedMoment,
        this.selectedDateType,
        index
      );
    },
    selectCard(key) {
      this.selectedIndex = key;
    }
  }
};
</script>

<style lang="less">
@import "../../assets/variable.less";
.chartPie-toolBar {
  padding: 6px 12px 0;
}
.list-categoryCard {
  margin: 20px 12px;
  .item-categoryCard {
    padding: 4px 0;

    .info-value {
      text-align: right;
      font-size: 15px;
      color: @primaryTextColor;
    }
    .info-count {
      text-align: right;
      font-size: 12px;
      color: @secondaryTextColor;
    }
  }
}

.noData-tip {
  text-align: center;
  padding: 50px 0;
  font-size: 14px;
  color: @secondaryTextColor;
}
</style>