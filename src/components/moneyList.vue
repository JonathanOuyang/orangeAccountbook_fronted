/**
 * moneyList
 * @desc 账单列表
 * @param {Array} [data] 账单数据
 * @example <money-list :data="moneys"></money-list>
 */
<template>
  <div class="wrap-moneyList">
    <div class="list-money"
         v-if="list.length">
      <div class="item-money-wrap"
           v-for="money in list"
           :key="money._id"
           @click="handleTapMoney(money._id)">
        <div class="item-money">
          <type-Icon :icon="money.category.icon"
                     :type="money.type"
                     @select="handleTapType"></type-Icon>
          <div class="wrap-text-left">
            <div class="text-category">{{money.category.name}}</div>
            <div class="text-secondary">
              {{$moment(money.moneyTime).format(dateFormat)}}
              {{note && money.note}}
            </div>
          </div>
          <div class="wrap-text-right">
            <div class="text-value">{{money.value | currency}}</div>
            <div class="text-account">{{money.account.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="noMoneys-wrap"
         v-else-if="!list.length && !isLoading">
      <div class="noMoneys-tip">{{noDataText}}</div>
    </div>
    <loading :show="isLoading" type="RotateSquare2" opacity="9"></loading>
  </div>
</template>

<script type="text/javascript">
import loading from '../components/loading/loading.vue'
export default {
  components: {
    loading
  },
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    dateFormat: {
      type: String,
      default: "YYYY-MM-DD HH:mm"
    },
    note: {
      type: Boolean,
      default: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    noDataText: {
      type: String,
      default: '没有账单哦'
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
.wrap-moneyList {
  position: relative;
  margin-top: ;
  flex: 1;
  min-height: 243px;
}
.item-money-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 24px;
  background-color: #fff;
  &:after {
    content: "";
    width: 88%;
    height: 1px;
    background: @dividerColor;
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.list-money {
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
    .text-secondary {
      color: @secondaryTextColor;
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