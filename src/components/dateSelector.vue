<template>
  <div class="date-selector">
    <div
      v-if="selectYear" 
      class="date-selector_change"
      >
      <van-button
        v-for="(item, index) in typeList"
        :key="index"
        size="small"
        :type="selectedType === index? 'primary' : 'default'"
        @click="changeType(index)"
        style="marginRight: 2px">
        {{item}}
      </van-button>
    </div>
    <div class="date-selector_main">
      <div 
        class="date-selector_btn"
        @click="handlePrev">
        <Icon name="fanhui1" />
      </div>
      <div class="date-selector_text">
        {{momentString}}
      </div>
      <div 
        class="date-selector_btn"
        @click="handleNext">
        <Icon name="gengduo1" />
      </div>
    </div>
    <div class="date-selector_tool"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    selectYear: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      moment: new Date().getTime(),
      momentString: this.$moment().format("YYYY-MM"),
      selectedType: 0,
      typeList: ['月', '年']
    };
  },
  methods: {
    handlePrev() {
      this.moment = this.$moment(this.moment)
        .subtract(1, "month")
        .valueOf();
      this.momentString = this.$moment(this.moment).format("YYYY-MM");
      this.$emit("change", this.$moment(this.moment));
    },
    handleNext() {
      this.moment = this.$moment(this.moment)
        .add(1, "month")
        .valueOf();
      this.momentString = this.$moment(this.moment).format("YYYY-MM");
      this.$emit("change", this.$moment(this.moment));
    },
    changeType(index) {
      this.selectedType = index;
      this.initCategorySum(this.selectedMoment);
    },
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
.date-selector {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  height: 42px;
  background: rgb(252, 252, 252);
  &_main {
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 50%;
  }
  &_change, &_tool {
    display: flex;
    align-items: center;
    width: 70px;
  }
  &_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
  }

  &_text {
    flex: 1;
    text-align: center;
    font-size: 16px;
    color: @primaryTextColor;
  }
}
</style>
