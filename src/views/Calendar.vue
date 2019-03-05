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
                    @update:fromPage="changePage"
                    @dayclick="handleDay">
        </v-calendar>
    </div>
    <!-- <router-link class="orange-button"
                 tag="div"
                 to="/addMoney">
      记一笔
    </router-link> -->
    <money-list :list="moneys"
                :option="moneyListOption"
                :isLoading="isListLoading"></money-list>
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
      isListLoading: false,
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
          padding: "2px 18px 6px 18px"
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
            width: daySize - 6 + "px",
            height: daySize - 6 + "px",
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
    this.$loading.show();
    this.initCalendarPage(
      TODAY.getFullYear(),
      TODAY.getMonth() + 1,
      TODAY.getDate()
    );
  },
  methods: {
    // 更新当前日历页和对应的账单列表
    initCalendarPage(year, month, date = 1) {
      getCalendarInfo({ year, month }, { loadingToast: false }).then(res => {
        this.dayHasMoneys = res.data.data.calendarInfo;
      });
      this.getMoneyListByDay(year, month, date);
    },

    // 点击日期
    handleDay(day) {
      this.selectedDate = day.date;
      this.getMoneyListByDay(
        day.year,
        day.month,
        day.day
      );
    },

    // 更新账单列表
    getMoneyListByDay(year, month, date) {
      const moment = this.$moment(`${year}-${month}-${date}`, "YYYY-M-D");
      const data = {
        searchValue: {
          moneyTimeStart: moment.startOf("day").format("YYYY-MM-DD"),
          moneyTimeEnd: moment
            .startOf("day")
            .add(1, "days")
            .format("YYYY-MM-DD")
        },
        sortOption: {
          moneyTime: -1
        }
      };
      this.isListLoading = true;
      this.moneys = [];
      searchMoneyList(data, { loadingToast: false }).then(res => {
        this.isListLoading && (this.isListLoading = false);
        const resData = res.data.data;
        this.moneys = resData.list;
      });
    },

    // 切换日历页
    changePage(page) {
      this.selectedDate = new Date(page.year, page.month - 1, 1);
      this.initCalendarPage(page.year, page.month);
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";

#view-calendar {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.calendar-header {
  .header-background(-60px, 80px);
}

.calendar-wrap {
  .panel();
  margin: 0 14px 20px;
}

.calendar-moneyList {
  padding: 8px 10px;
  background: #fff;
}
</style>