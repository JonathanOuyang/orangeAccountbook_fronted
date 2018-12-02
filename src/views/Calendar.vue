<template>
    <div id="view-calendar">
        <vue-event-calendar
      :events="demoEvents"
      @day-changed="handleDayChanged"
      @month-changed="handleMonthChanged"
    ></vue-event-calendar>
    <money-list :data="moneys" class="calendar-moneyList"></money-list>
    </div>
</template>

<script>
let today = new Date();
export default {
  name: "calendar",
  data() {
    return {
        moneys: [
				{
					date: new Date(2018, 9, 30),
					type: 0,
					value: 80,
					isOutcome: true
				},
				{
					date: new Date(2018, 9, 30),
					type: 1,
					value: 65,
					isOutcome: false
				},
				{
					date: new Date(2018, 9, 30),
					type: 0,
					value: 80,
					isOutcome: true
				}
			]
    };
  },
  methods: {
    handleDayChanged(data) {
      console.log("date-changed", data);
    },
    handleMonthChanged(data) {
      console.log("month-changed", data);
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
.calendar-moneyList {
    padding: 8px 16px;
}
</style>