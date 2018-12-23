<template>
    <div id="view-calendar">
      <div class="calendar-banner" :class="thisWeek > -1?`calendar_columns-${thisWeek}`:''">
        <div class="calendar-background"></div>
        <div class="calendar-wrap">
          <v-calendar 
            :attributes='attrs' 
            is-expanded 
            :theme-styles="calendarStyle" 
            title-position="left"
            @dayclick="handleDay">
          </v-calendar>
        </div>
      </div>
      <router-link class="orange-button" tag="div" to="/calendar">
			记一笔
		</router-link>
      <div class="noMoneys-wrap" v-if="noMoneys">
        <div class="noMoneys-tip">这天没有账单哦</div>
      </div>
      <money-list :data="moneys" class="calendar-moneyList" v-else></money-list>
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
const daySize = 40;

const toRem = size => size / 20 + "rem";

export default {
  name: "calendar",
  data() {
    return {
      moneys: [],
      noMoneys: true,
      selectedDate: TODAY,
      thisWeek: 0,
      calendarStyle: {
        wrapper: {
          padding: "4px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e6e6e6",
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
          height: toRem(daySize)
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
    this.reqDay_Moneys({
      year: TODAY.getFullYear(),
      month: TODAY.getMonth() + 1,
      date: TODAY.getDate()
    });
  },
  methods: {
    handleDay(day) {
      console.log(day.week);

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
        const dayMoneys = res.data.moneys;

        if (dayMoneys.length) {
          this.noMoneys = false;
          this.moneys = dayMoneys;
        } else {
          this.noMoneys = true;
          this.moneys = [];
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
.generate-columns(@n, @i: 0) when (@i =< @n) {
  .calendar_columns-@{i} {
    .c-weeks-rows-wrapper {
      height: 36 / @rem;
      transform: translateY(-40 / @rem * @i);
    }
    .calendar-background {
      height: 80px;
      margin-bottom:  -25%;
    }
  }
  .generate-columns(@n, (@i + 1));
}

#view-calendar {
  padding: 0 20 / @rem;
}
.calendar-background {
  transform-origin: top;
  transition: all 0.6s;
  .header-background(200px, -60%);
}
.calendar-wrap {
  .panel(-60%);
  .c-weeks-rows-wrapper {
    height: 240 / @rem;
    transform-origin: top;
    transition: all 0.6s;
  }
}

.c-weeks {
  overflow: hidden;
}

.generate-columns(6);

.calendar-moneyList {
  padding: 8px 10px;
  background: #fff;
}
.noMoneys-wrap {
  padding-top: 60 / @rem;
  margin: 0 auto;
  text-align: center;
  font-size: 14 / @rem;
  color: @secondaryTextColor;
}
</style>