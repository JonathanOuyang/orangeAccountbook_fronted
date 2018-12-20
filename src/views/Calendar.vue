<template>
    <div id="view-calendar">
      <div class="calendar-background"></div>
      <div class="calendar-wrap">
        <v-calendar :attributes='attrs' is-expanded :theme-styles="calendarStyle" @dayclick="handleDay">
          <!-- <template slot='day-content' slot-scope='props'>
            <div class="day-money">
              {{ props.attributes }}
            </div>
          </template> -->
        </v-calendar>
      </div>
      <money-list :data="moneysInDay" class="calendar-moneyList"></money-list>
    </div>
</template>

<script>
import { getDayMoneys } from "../api/moneys.js";

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
const daySize = 36;

const toRem = size => size / 20 + "rem";

export default {
  name: "calendar",
  data() {
    return {
      moneys: [],
      selectedDate: TODAY,
      calendarStyle: {
        wrapper: {
          padding: "8px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e6e6e6",
          borderRadius: "10px"
        },
        header: {
          padding: "6px 8px"
        },
        headerTitle: {
          fontSize: `18px`
        },
        weekdays: {
          padding: "4px 0",
          fontSize: toRem(16)
        },
        dayContent: {
          height: toRem(daySize),
          fontSize: toRem(16),
          color: primaryTextColor
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
            width: toRem(daySize),
            height: toRem(daySize),
            borderColor: primaryColor,
            borderWidth: "1px"
          },
          dates: this.selectedDate.getDate() == TODAY.getDate() ? null : TODAY
        },
        {
          key: "selectedDay",
          highlight: {
            width: toRem(daySize),
            height: toRem(daySize),
            backgroundColor: lightPrimaryColor,
            borderRadius: "8px"
          },
          dates: this.selectedDate
        },
        {
          key: "dayHasMoneys",
          dot: {
            backgroundColor: "red"
          },
          dates: this.moneys
            .map(item => item.time)
            .filter(
              item =>
                item.getDate() != this.selectedDate.getDate() &&
                item.getDate() != TODAY.getDate()
            )
        },
        {
          key: "dayAfterToday",
          highlight: {
            opacity: 0.4
          }
        }
      ];
    },
    moneysInDay() {
      return this.moneys.filter(
        item => item.time.getDate() == this.selectedDate.getDate()
      );
    }
  },
  created() {
    this.reqDay_Moneys({
      userId: "5c179e948b4450478c646a93",
      year: TODAY.getFullYear(),
      month: TODAY.getMonth() + 1,
      date: TODAY.getDate()
    });
  },
  methods: {
    handleDay(day) {
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
    reqDay_Moneys(data) {
      getDayMoneys(data).then(res => {
        const dayMoneys = res.data;
        dayMoneys.map(item => (item.time = new Date(item.time)));
        this.moneys = dayMoneys;
      });
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
#view-calendar {
  padding: 0 20 / @rem;
  .calendar-background {
    .header-background(200px);
  }
  .calendar-wrap {
    .panel(-56%);
    border-radius: 10px;
  }
}
.calendar-moneyList {
  padding: 8px 10px;
  background: #fff;
}
</style>