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
    <router-link class="orange-button"
                 tag="div"
                 to="/addMoney">
      记一笔
    </router-link>
    <div class="noMoneys-wrap"
         v-if="noMoneys">
      <div class="noMoneys-tip">这天没有账单哦</div>
    </div>
    <money-list :data="moneys"
                class="calendar-moneyList"
                v-else></money-list>

  </div>
</template>

<script>
import { getDayMoneys } from "../api/api.js";

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
      dayInfo: {
        date: new Date("2019-09-12"),
        income: "20",
        outcome: "60"
      },
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
          padding: `6px ${toRem(5)} 0`,
          fontSize: toRem(12)
        },
        // weeks: {
        //   height: toRem(daySize),
        // },
        dayContent: {
          height: toRem(daySize - 4),
          fontSize: toRem(16),
          color: primaryTextColor
        },
        dayCell: {
          height: toRem(daySize),
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
          highlight: {
            width: toRem(daySize - 6),
            height: toRem(daySize - 6),
            borderColor: primaryColor,
            borderWidth: "1px"
          },
          dates: this.selectedDate.getDate() == TODAY.getDate() ? null : TODAY
        },
        {
          key: "selectedDay",
          highlight: {
            width: toRem(daySize - 4),
            height: toRem(daySize - 4),
            backgroundColor: lightPrimaryColor,
            borderRadius: "8px"
          },
          dates: this.selectedDate
        },
        // {
        //   key: "dayHasMoneys",
        //   dot: {
        //     backgroundColor: "red"
        //   },
        //   dates: this.moneys
        //     .map(item => item.time)
        //     .filter(
        //       item =>
        //         item.getDate() != this.selectedDate.getDate() &&
        //         item.getDate() != TODAY.getDate()
        //     )
        // },
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
    this.thisWeek = this.getWeek(TODAY);
    this.reqDay_Moneys({
      year: TODAY.getFullYear(),
      month: TODAY.getMonth() + 1,
      date: TODAY.getDate()
    });
  },
  methods: {
    handleDay(day) {
      this.thisWeek = day.week;

      if (day.inMonth) {
        this.selectedDate = day.date;
        this.reqDay_Moneys({
          userId: "5c179e948b4450478c646a93",
          year: day.date.getFullYear(),
          month: day.date.getMonth() + 1,
          date: day.date.getDate()
        });
      }
    },
    handleClickArrow() {
      this.isShrink = !this.isShrink;
    },
    handleClickCalendarMask() {},
    toggleCalendar() {
      this.isShowCalendar = !this.isShowCalendar;
    },
    reqDay_Moneys(data) {
      getDayMoneys(data).then(res => {
        const dayMoneys = res.data.moneys;

        if (dayMoneys.length) {
          this.noMoneys = false;
          this.moneys = dayMoneys;
        } else {
          this.noMoneys = true;
          this.moneys = [];
        }
      });
    },
    getWeek(date) {
      // 先计算出该日期为第几周
      let week = Math.ceil(date.getDate() / 7);
      // 判断这个月前7天是周几，如果不是周一，则计入上个月
      // if (date.getDate() < 7) {
      //   if (date.getDay() !== 1) {
      //     week = 5;
      //   }
      // }
      return week;
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";

#view-calendar {
  padding: 0 20px;
}

.calendar-header {
  .header-background(-60px, 80px);
}

.calendar-wrap {
  .panel(0)
}

.calendar-moneyList {
  padding: 8px 10px;
  background: #fff;
}
.noMoneys-wrap {
  padding-top: 60px;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  color: @secondaryTextColor;
}
</style>