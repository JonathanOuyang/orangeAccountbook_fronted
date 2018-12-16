<template>
    <div id="view-calendar">
      <v-calendar :attributes='attrs' is-expanded :theme-styles="calendarStyle" @dayclick="handleDay">
        <!-- <template slot='day-content' slot-scope='props'>
           <div class="day-money">
            {{ props.attributes }}
           </div>
        </template> -->
      </v-calendar>
      <money-list :data="moneysInDay" class="calendar-moneyList"></money-list>
    </div>
</template>

<script>
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

const toRem = size => size / 20 + "rem";

export default {
  name: "calendar",
  data() {
    return {
      moneys: [
        {
          _id: 0,
          date: new Date(2018, 11, 12),
          type: 0,
          value: 80,
          isOutcome: true
        },
        {
          _id: 1,
          date: new Date(2018, 11, 16),
          type: 1,
          value: 65,
          isOutcome: false
        },
        {
          _id: 2,
          date: new Date(2018, 11, 24),
          type: 0,
          value: 80,
          isOutcome: true
        }
      ],
      selectedDate: TODAY,
      calendarStyle: {
        wrapper: {
          padding: "0 4px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e6e6e6"
        },
        headerTitle: {
          fontSize: `18px`
        },
        weekdays: {
          padding: "4px 0"
        },
        dayContent: {
          height: toRem(44),
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
            width: toRem(45),
            height: toRem(45),
            borderColor: primaryColor,
            borderWidth: "1px",
            borderRadius: "8px"
          },
          dates: this.selectedDate.getDate() == TODAY.getDate() ? null : TODAY
        },
        {
          key: "selectedDay",
          highlight: {
            width: toRem(45),
            height: toRem(45),
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
            .map(item => item.date)
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
        item => item.date.getDate() == this.selectedDate.getDate()
      );
    }
  },
  methods: {
    handleDay(day) {
      if (day.inMonth) {
        this.selectedDate = day.date;
      }
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
#view-calendar {
  padding: 0 20 / @rem;
}
.calendar-moneyList {
  padding: 8px 10px;
  background: #fff;
}
</style>