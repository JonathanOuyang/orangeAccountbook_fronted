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
    <div class="moneyList-header">
      <div class="header-info">收入: {{incomeSum}} 支出: {{outcomeSum}}</div>
      <div class="header-tool">
        <van-button size="mini"
                    type="primary"
                    @click="changeSort"
                    plain>
          {{sortTypes[sort].name}}
        </van-button>
      </div>
    </div>
    <money-list :list="moneys"
                date-format="HH:mm"
                :isLoading="isListLoading"></money-list>
    <!-- <router-link class="button-float button-addMoney"
                 tag="div"
                 :to="`/addMoney?date=${selectedDate.getTime()}`">
      记一笔
    </router-link>
    <div class="button-float button-manage">
      <Icon name="liebiao"></Icon>
    </div> -->
    <van-button size="small"
                type="primary"
                round
                :to="`/addMoney?date=${selectedDate.getTime()}`"
                class="button-float button-addMoney">记一笔</van-button>
    <van-button size="small"
                type="primary"
                round
                class="button-float button-manage">
      <Icon name="liebiao"></Icon>
    </van-button>
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
const SORT_TYPES = [
  { key: "moneyTime", name: "按时间" },
  { key: "value", name: "按金额" }
];

export default {
  name: "calendar",
  data() {
    return {
      moneys: [],
      incomeSum: 0,
      outcomeSum: 0,
      isListLoading: false,
      dayHasMoneys: [],
      noMoneys: true,
      selectedDate: TODAY,
      sortTypes: SORT_TYPES,
      sort: 0,
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
        this.dayHasMoneys = res.data.calendarInfo;
      });
      this.getMoneyListByDay(year, month, date);
    },

    // 点击日期
    handleDay(day) {
      this.selectedDate = day.date;
      this.getMoneyListByDay(day.year, day.month, day.day);
    },

    // 更新账单列表
    getMoneyListByDay(
      year = this.selectedDate.getFullYear(),
      month = this.selectedDate.getMonth() + 1,
      date = this.selectedDate.getDate()
    ) {
      const moment = this.$moment(`${year}-${month}-${date}`, "YYYY-M-D");
      const data = {
        searchValue: {
          moneyTimeStart: moment.startOf("day").format("YYYY-MM-DD"),
          moneyTimeEnd: moment
            .startOf("day")
            .add(1, "days")
            .format("YYYY-MM-DD")
        },
        sortOption: {}
      };
      data.sortOption[this.sortTypes[this.sort].key] = -1;
      this.isListLoading = true;
      this.moneys = [];
      searchMoneyList(data, { loadingToast: false }).then(res => {
        this.isListLoading && (this.isListLoading = false);
        this.moneys = res.data.list;
        this.incomeSum = res.data.incomeSum;
        this.outcomeSum = res.data.outcomeSum;
      });
    },

    // 切换日历页
    changePage(page) {
      this.selectedDate = new Date(page.year, page.month - 1, 1);
      this.initCalendarPage(page.year, page.month);
    },

    // 切换排序类型
    changeSort() {
      if (this.sort == this.sortTypes.length - 1) {
        this.sort = 0;
      } else {
        this.sort++;
      }
      this.getMoneyListByDay();
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

.moneyList-header {
  margin: 4px 18px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: @secondaryTextColor;

  .header-info {
    display: inline-block;
    line-height: 24px;
  }
}

.button-float {
  position: fixed;
  bottom: 20px;

  &.button-addMoney {
    right: 20px;
  }

  &.button-manage {
    left: 20px;
  }
}
</style>