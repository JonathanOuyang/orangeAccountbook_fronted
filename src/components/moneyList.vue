<template>
  <div class="wrap-moneyList" v-if="data.length">
    <div class="header-moneyList">
      <div class="text-date">{{data[0].time | monthDateDay}}</div>
        <!-- <div class="text-reduce">支出: {{data.outSum}}&nbsp;&nbsp;&nbsp;收入: {{data.inSum}}</div> -->
      </div>
    <div class="list-money">
      <div class="item-money-wrap" v-for="money in data" :key="money._id">
        <div class="item-money">
          <type-Icon :typeId="money.type" :whereabouts="0"></type-Icon>
          <div class="wrap-text">
            <span class="text-value">{{money.value | currency}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    // groupByDate() {
    //   let newArr = [];
    //   this.data.forEach(elem => {
    //     let index = -1;
    //     let newMoney = {
    //       type: elem.type,
    //       value: elem.value,
    //       isOutcome: elem.isOutcome
    //     };
    //     let alreadyExists = newArr.some((newGroup, j) => {
    //       if (
    //         elem.time.getFullYear() === newGroup.time.getFullYear() &&
    //         elem.time.getMonth() === newGroup.time.getMonth() &&
    //         elem.time.getDate() === newGroup.time.getDate()
    //       ) {
    //         index = j;
    //         return true;
    //       }
    //     });
    //     if (alreadyExists) {
    //       newArr[index].moneys.push(newMoney);
    //       if (newMoney.isOutcome) {
    //         newArr[index].outSum += newMoney.value;
    //       } else {
    //         newArr[index].inSum += newMoney.value;
    //       }
    //     } else {
    //       if (newMoney.isOutcome) {
    //         newArr.push({
    //           date: elem.date,
    //           moneys: [newMoney],
    //           outSum: newMoney.value,
    //           inSum: 0
    //         });
    //       } else {
    //         newArr.push({
    //           time: elem.time,
    //           moneys: [newMoney],
    //           outSum: 0,
    //           inSum: newMoney.value
    //         });
    //       }
    //     }
    //   });
    //   return newArr;
    // }
  },
  filters: {
    monthDateDay(val) {
      return `${val.getMonth() + 1}月${val.getDate()}日`;
    },
    currency(val) {
      return parseFloat(Number(val).toFixed(2)).toLocaleString();
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
.header-moneyList {
  margin: 4 / @rem 0;
  display: flex;
  justify-content: space-between;
  font-size: 12 / @rem;
  color: @secondaryTextColor;
}
.item-money-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  &:after {
    content: "";
    width: 88%;
    height: 1px;
    background: @dividerColor;
  }
}
.list-money {
  margin: 4 / @rem 0 14 / @rem 0;
  .item-money {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 14 / @rem 0;
    .wrap-text {
      display: inline-flex;
      justify-content: space-between;
      font-size: 22 / @rem;
    }
  }
}
</style>