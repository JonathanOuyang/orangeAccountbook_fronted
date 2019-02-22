/**
 * moneyList
 * @desc 账单列表
 * @param {Array} [data] 账单数据
 * @example <money-list :data="moneys"></money-list>
 */
<template>
  <div class="wrap-moneyList">
    <!-- <div class="header-moneyList">
      <div class="text-date">{{list[0].moneyTime | date}}</div>
    </div> -->
    <div class="list-money"
         v-if="list.length">
      <div class="item-money-wrap"
           v-for="money in list"
           :key="money._id"
           @click="handleTapMoney(money._id)">
        <div class="item-money">
          <type-Icon :icon="money.categoryIcon"
                     :type="money.type"
                     @select="handleTapType"></type-Icon>
          <div class="wrap-text-left">
            <div class="text-category">{{money.categoryName}}</div>
            <div class="text-time">{{$moment(money.moneyTime).format('YYYY-MM-DD HH:mm')}}</div>
          </div>
          <div class="wrap-text-right">
            <div class="text-value">{{money.value | currency}}</div>
            <div class="text-account">{{money.accountName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="noMoneys-wrap"
         v-else>
      <div class="noMoneys-tip">这天没有账单哦</div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      default: () => ({
        date: false
      })
    }
  },
  methods: {
    handleTapMoney(id) {
      this.$emit("tapMoney", id);
      this.$router.push("/moneyDetail/" + id);
    },
    handleTapType(type) {
      this.$emit("tapType", type);
    },
    moment() {
      return moment;
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
.header-moneyList {
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
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
  margin: 4px 0 14px 0;
  .item-money {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 10px 0;
    .wrap-text-left {
      flex: 1;
      margin-left: 8px;
    }
    .wrap-text-right {
      text-align: right;
    }
    .text-category {
      flex: 1;
      font-size: 18px;
    }
    .text-time {
      font-size: 12px;
    }
    .text-value {
      font-size: 18px;
    }
    .text-account {
      font-size: 14px;
    }
  }
}

.noMoneys-wrap {
  padding-top: 40px;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  color: @secondaryTextColor;
}
</style>