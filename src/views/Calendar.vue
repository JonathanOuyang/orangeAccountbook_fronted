<template>
  <div id="view-calendar">
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
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
        <van-button size="small"
                    type="primary"
                    @click="changeSort"
                    plain>
          按{{sortTypes[sort].name}}
        </van-button>
      </div>
    </div>
    <van-list
  v-model="isListLoading"
  :error="isListError"
  :finished="isListFinished"
  :finished-text="moneys.length?'已经到底啦':''"
  error-text="请求失败，点击重新加载"
  @load="handleListLoad"
  :offset="30"
>
    <money-list :list="moneys"
                date-format="HH:mm"
                :isEditing="isListEditing"
                :isLoading="isListIniting"
                no-data-text="这天没有账单哦"></money-list>
    </van-list>
    <!-- 
    <div class="button-float button-manage">
      <Icon name="liebiao"></Icon>
    </div> -->
    </van-pull-refresh>
    <van-button 
      type="primary"
      round
      :to="`/addMoney?date=${selectedDate.getTime()}`"
      class="button-float button-addMoney">记一笔</van-button>
    <!-- <van-button 
      type="primary"
      round
      class="button-float button-manage">
      <Icon name="liebiao" :style="{fontSize: '16px'}"></Icon>
    </van-button> -->
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
const daySize = 36;

const toRem = size => size / 20 + "rem";
const SORT_TYPES = [
  { key: "moneyTime", name: "时间" },
  { key: "value", name: "金额" }
];
const PAGE_SIZE = 6;

export default {
  name: "calendar",
  data() {
    return {
      moneys: [],
      incomeSum: 0,
      outcomeSum: 0,
      isRefreshing: false,
      isListIniting: false,
      isListLoading: false,
      isListFinished: false,
      isListError: false,
      isListEditing: false,
      dayHasMoneys: [],
      noMoneys: true,
      selectedDate: TODAY,
      sortTypes: SORT_TYPES,
      sort: 0,
      page: 1,
      calendarStyle: {
        wrapper: {
          padding: "4px 10px",
          backgroundColor: "#fff",
          boxShadow: "#e4e4e4 0px 10px 10px -5px",
          borderRadius: "10px"
        },
        header: {
          padding: "8px 18px 6px 18px"
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
          fontSize: "14px",
          color: primaryTextColor
        },
        dayCell: {
          height: daySize + "px",
          margin: "0"
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
    this.initCalendarPage(TODAY);
  },
  methods: {
    // 更新当前日历页和对应的账单列表
    initCalendarPage(date) {
      getCalendarInfo(
        { year: date.getFullYear(), month: date.getMonth() + 1 },
        { loadingToast: false }
      ).then(res => {
        this.dayHasMoneys = res.data.calendarInfo;
      });
      this.initMoneyListByDay(date);
    },

    // 点击日期
    handleDay(day) {
      this.selectedDate = day.date;
      this.initMoneyListByDay(day.date);
    },

    // 更新账单列表
    initMoneyListByDay(date = this.selectedDate) {
      const moment = this.$moment(date);
      const data = {
        searchValue: {
          moneyTimeStart:
            moment.startOf("day").format("YYYY-MM-DD") + " 00:00:00",
          moneyTimeEnd:
            moment
              .startOf("day")
              .add(1, "days")
              .format("YYYY-MM-DD") + " 00:00:00"
        },
        sortOption: {},
        page: 1,
        pageSize: PAGE_SIZE
      };
      this.incomeSum = 0;
      this.outcomeSum = 0;
      data.sortOption[this.sortTypes[this.sort].key] = -1;
      this.isListIniting = true;
      this.moneys = [];
      searchMoneyList(data, { loadingToast: false }).then(res => {
        this.isListIniting && (this.isListIniting = false);
        this.isRefreshing && (this.isRefreshing = false);
        this.moneys = res.data.list;
        this.incomeSum = res.data.incomeSum;
        this.outcomeSum = res.data.outcomeSum;

        if (res.data.currPage === res.data.maxPage) {
          this.isListFinished = true;
        } else if (res.data.currPage < res.data.maxPage) {
          this.isListFinished = false;
        }
      });
    },

    // 切换日历页
    changePage(page) {
      this.selectedDate = new Date(page.year, page.month - 1, 1);
      this.page = 1;
      this.initCalendarPage(page.year, page.month);
    },

    // 切换排序类型
    changeSort() {
      if (this.sort == this.sortTypes.length - 1) {
        this.sort = 0;
      } else {
        this.sort++;
      }
      this.page = 1;
      this.initMoneyListByDay();
    },

    onRefresh() {
      const date = this.selectedDate;
      this.initCalendarPage(date);
    },

    handleListLoad() {
      const moment = this.$moment(this.selectedDate);
      this.page += 1;
      const data = {
        searchValue: {
          moneyTimeStart:
            moment.startOf("day").format("YYYY-MM-DD") + " 00:00:00",
          moneyTimeEnd:
            moment
              .startOf("day")
              .add(1, "days")
              .format("YYYY-MM-DD") + " 00:00:00"
        },
        sortOption: {},
        page: this.page,
        pageSize: PAGE_SIZE
      };
      data.sortOption[this.sortTypes[this.sort].key] = -1;
      this.isListLoading = true;
      searchMoneyList(data, { loadingToast: false })
        .then(res => {
          this.moneys = [...this.moneys, ...res.data.list];
          this.incomeSum = res.data.incomeSum;
          this.outcomeSum = res.data.outcomeSum;
          this.isListLoading = false;

          if (res.data.currPage === res.data.maxPage) {
            this.isListFinished = true;
          }
        })
        .catch(err => {
          this.isListError = true;
        });
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";

#view-calendar {
  display: flex;
  flex-direction: column;
  height: 100%;

  .van-pull-refresh {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .van-pull-refresh,
  .van-pull-refresh__track {
    height: 100%;
  }
  .van-pull-refresh__head {
    background-color: @primaryColor;
    color: @textPrimaryColor;
  }
}

.calendar-header {
  .header-background(-60px, 80px);
}

.calendar-wrap {
  .panel();
  margin: 0 24px 20px;
}

.moneyList-header {
  margin: 4px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: @secondaryTextColor;

  .header-info {
    display: inline-block;
    line-height: 30px;
  }
}

.button-float {
  position: fixed;
  bottom: 10px;

  &.button-addMoney {
    right: 20px;
  }

  &.button-manage {
    left: 20px;
  }
}
</style>