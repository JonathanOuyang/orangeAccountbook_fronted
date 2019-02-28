<template>
  <div id="view-calendar">
    <div class="calendar-header">
    </div>
    <div class="calendar-wrap">
        <v-calendar :attributes='attrs'
                    is-expanded
                    :theme-styles="calendarStyle"
                    nav-visibility="hidden"
                    title-position="left"
                    @dayclick="handleDay">
        </v-calendar>
    </div>
    <!-- <router-link class="orange-button"
                 tag="div"
                 to="/addMoney">
      记一笔
    </router-link> -->
    <money-list :list="moneys"
                :option="moneyListOption"></money-list>
  </div>
</template>

<script>
import { searchMoneyList, getCalendarInfo } from "../api/api.js";

const TODAY = new Date();
const darkPrimaryColor = "#ff3c50";
const primaryColor = "#f6717d";
const lightPrimaryColor = "#faaab1";
const textPrimaryColor = "#fafafa";
const accentColor = "#ffe1e6";
const primaryTextColor = "#505050";
const secondaryTextColor = "#a1a1a1";
const dividerColor = "#e6e6e6";
const grey = "#fafafa";
const linearColor = `linear-gradient(to right, ${lightPrimaryColor}, ${primaryColor})`;
const daySize = 38;

const toRem = size => size / 20 + "rem";

export default {
  name: "calendar",
  data() {
    return {
      moneys: [],
      moneyListOption: {
        date: "HH:mm",
        note: true
      },
      dayHasMoneys: [],
      noMoneys: true,
      selectedDate: TODAY,
      calendarStyle: {
        wrapper: {
          padding: "4px",
          backgroundColor: "#fff",
          boxShadow: "#e4e4e4 0px 10px 10px -5px",
          borderRadius: "10px"
        },
        header: {
          padding: "6px 18px 10px 18px"
        },
        headerTitle: {
          fontSize: `18px`
        },
        headerHorizontalDivider: {
          borderTop: `solid ${dividerColor} 1px`,
          width: "90%"
        },
        weekdays: {
          padding: `6px 5px 0`,
          fontSize: "12px"
        },
        // weeks: {
        //   height: toRem(daySize),
        // },
        dayContent: {
          height: daySize - 4 + "px",
          fontSize: "16px",
          color: primaryTextColor
        },
        dayCell: {
          height: daySize + "px",
          margin: "2px 0"
        }
      }
    };
  },
  computed: {
    attrs() {
      return [
        {
          key: "today",
          contentStyle: {
            color: primaryColor,
            fontWeight: "bolder"
          },
          dates: this.selectedDate.getDate() == TODAY.getDate() ? null : TODAY
        },
        {
          key: "selectedDay",
          highlight: {
            width: daySize - 4 + "px",
            lineHeight: daySize - 4 + "px",
            backgroundColor: lightPrimaryColor,
            borderRadius: "8px"
          },
          dates: this.selectedDate
        },
        {
          key: "dayHasMoneys",
          dot: {
            backgroundColor: primaryColor
          },
          dates: this.dayHasMoneys.filter(
            elem => elem != this.$moment(this.selectedDate).format("YYYY-MM-DD")
          )
        },
        {
          key: "dayAfterToday",
          highlight: {
            opacity: 0.4
          }
        }
      ];
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const data = {
        year: TODAY.getFullYear(),
        month: TODAY.getMonth() + 1
      };
      getCalendarInfo(data).then(res => {
        this.dayHasMoneys = res.data.data.calendarInfo;
      });
      this.getMoneyListByDay(TODAY);
    },
    handleDay(day) {
      this.selectedDate = day.date;
      this.getMoneyListByDay(day.date);
    },
    getMoneyListByDay(date) {
      const moment = this.$moment(date);
      const data = {
        searchValue: {
          moneyTimeStart: moment.startOf("day").valueOf(),
          moneyTimeEnd: moment.endOf("day").valueOf()
        },
        sortOption: {
          moneyTime: -1
        }
      };
      searchMoneyList(data).then(res => {
        const resData = res.data.data;
        this.moneys = resData.list;
      });
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";

#view-calendar {
}

.calendar-header {
  .header-background(-60px, 80px);
}

.calendar-wrap {
  .panel();
  margin: 0 20px 20px;
}

.calendar-moneyList {
  padding: 8px 10px;
  background: #fff;
}
</style>