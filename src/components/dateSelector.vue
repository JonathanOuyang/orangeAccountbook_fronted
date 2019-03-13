<template>
  <div class="date-selector">
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
</template>

<script type="text/javascript">
export default {
  props: {
    
  },
  data() {
    return {
      moment: this.$moment(),
      momentString: this.$moment().format('YYYY-MM')
    }
  },
  methods: {
    handlePrev(){
      this.moment = this.moment.subtract(1, 'month')
      this.momentString = this.moment.format('YYYY-MM')
      this.$emit('change', this.moment)
    },
    handleNext(){
      this.moment = this.moment.add(1, 'month')
      this.momentString = this.moment.format('YYYY-MM')
      this.$emit('change', this.moment)
    }
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
  border-bottom: 1px solid @dividerColor;
  background: #fff;

  &_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
  }

  &_text {
    font-size: 16px;
    color: @primaryTextColor;
  }
}
</style>
