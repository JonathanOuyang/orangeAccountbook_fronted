<template>
  <div id="view-addMoney">
    <div class="addMoney-header">
      <van-tabs color="#f6717d"
                :line-width="tabWidth"
                v-model="type">
        <van-tab title="收入"></van-tab>
        <van-tab title="支出"></van-tab>
        <van-tab title="转账"></van-tab>
      </van-tabs>
    </div>
    <div class="addMoney-val">
      <div class="addMoney-val-account">
        <div class="account-name">支付宝</div>
      </div>
      <div class="addMoney-val-money"
           @click="isShowNumKey = !isShowNumKey">￥{{value}}</div>
    </div>
    <van-swipe :autoplay="0"
               indicator-color="#f6717d"
               :loop="false">
      <van-swipe-item v-for="(page, pageIdx) in [outCategoryList,inCategoryList][type]"
                      :key="pageIdx">
        <div class="addMoney-type">
          <type-icon class="addMoney-type-item"
                     checker
                     v-for="(category) in page"
                     :key="category._id"
                     :_id="category._id"
                     :type="0"
                     :icon="category.icon"
                     :title="category.name"
                     title-position="bottom"
                     :selected="selectedCategory == category._id"
                     @select="handleSelectCategory"></type-icon>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell title="时间"
                is-link
                :value="formatDate(date)"
                @click="isShowDate = !isShowDate" />
      <van-field v-model="note"
                 placeholder="输入备注" />
    </van-cell-group>
    <!-- <div class="addMoney-numberKeyborad"> -->
    <van-number-keyboard :show="isShowNumKey"
                         extra-key="."
                         @blur="show = false"
                         theme="custom"
                         @input="handleInputNumber"
                         @delete="handleDeleteNumber"
                         @close="handleClose"
                         close-button-text="保存" />
    <!-- </div> -->
    <van-popup v-model="isShowDate"
               position="bottom">
      <van-datetime-picker v-model="date"
                           type="datetime" />
    </van-popup>
  </div>
</template>

<script>
import { addMoney, getCategoryList, getAccountList } from "../api/api.js";
const CATEGORY_PAGE_SIZE = 10; // 每页分类数
const MAX_MONEY = 9; // 金额位数
const CLIENT_WIDTH = document.body.clientWidth;
const TODAY = new Date();

export default {
  name: "addMoney",
  data() {
    return {
      intStack: [],
      floatStack: [],
      isInputInt: true,
      type: 0,
      note: "",
      inCategoryList: [],
      outCategoryList: [],
      accountList: [],
      selectedCategory: 0,
      tabWidth: CLIENT_WIDTH / 3,
      isShowNumKey: false,
      isShowDate: false,
      date: TODAY,
      today: TODAY
    };
  },
  created() {
    this.init();
  },
  watch: {
    type(newVal) {
      this.selectFirstCategory();
    }
  },
  computed: {
    value() {
      const hasInt = Boolean(this.intStack.length),
        hasFloat = Boolean(this.floatStack.length);
      if (hasInt || hasFloat) {
        if (!hasInt) {
          return `0.${this.floatStack.join("")}`;
        } else if (!hasFloat) {
          return `${this.intStack.join("")}`;
        }
        return `${this.intStack.join("")}.${this.floatStack.join("")}`;
      } else return "0";
    },
  },
  methods: {
    init() {
      getCategoryList().then(res => {
        const inCategorys = [];
        const outCategorys = [];
        res.data.data.list.forEach(elem => {
          if (elem.type == 0) {
            outCategorys.push(elem);
          } else if (elem.type == 1) {
            inCategorys.push(elem);
          }
        });
        this.inCategoryList = this.groupToPage(inCategorys, CATEGORY_PAGE_SIZE);
        this.outCategoryList = this.groupToPage(outCategorys, CATEGORY_PAGE_SIZE);
        this.selectFirstCategory();
      });
      getAccountList().then(res => {
        this.accountList = res.data.data.list
      })
    },
    groupToPage(list, pageSize) {
      let result = [];
      for (
        let x = 0;
        x < Math.ceil(list.length / pageSize);
        x++
      ) {
        let start = x * pageSize;
        let end = start + pageSize;
        result.push(list.slice(start, end));
      }
      return result;
    },
    selectFirstCategory() {
      this.selectedCategory = [this.outCategoryList,this.inCategoryList][this.type][0][0]._id

    },
    postMoneys() {
      const data = {
        type: this.type,
        value: this.value,
        category: this.selectedCategory,
        time: date,
        note: this.note
      };
      createMoney(data).then(res => {
        console.log(res);
      });
      this.$router.push("/home");
    },

    handleInputNumber(key) {
      if (this.value.length < MAX_MONEY) {
        if (key == ".") this.isInputInt = false;
        else {
          if (this.isInputInt) {
            this.intStack.push(key);
          } else {
            if (this.floatStack.length <= 1) this.floatStack.push(key);
          }
        }
      }
    },
    handleDeleteNumber() {
      const hasInt = Boolean(this.intStack.length),
        hasFloat = Boolean(this.floatStack.length);
      if (hasFloat) {
        this.floatStack.pop();
        if (hasFloat) {
          this.isInputInt = true;
        }
      } else {
        if (hasInt) {
          this.intStack.pop();
        }
      }
    },
    handleClose() {
      this.postMoneys();
    },
    handleSelectCategory(id) {
      this.selectedCategory = id;
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
#view-addMoney {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: @primaryTextColor;
  background-color: #fff;
}
.addMoney-header {
  border-bottom: 1px solid @dividerColor;
}
.addMoney-val {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  border-bottom: 1px solid @dividerColor;
  &-account {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 60%;
    border-right: 1px solid @dividerColor;
    font-size: 18px;
    .account-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36px;
      height: 36px;
      border-radius: 4px;
      background: #2873ff;
      color: #fff;
      font-size: 40px;
    }
  }
  &-money {
    flex: 1;
    padding: 0 12px;
    height: 100%;
    line-height: 72px;
    text-align: right;
    font-size: 30px;
  }
}

.van-swipe {
  .addMoney-type {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: 160px;
    padding: 14px 18px 12px;
    &-item {
      width: 20%;
      margin: 4px 0;
    }
  }
}

.addMoney-infoBar {
  display: flex;
  align-items: center;
  background: #fff;
  border-top: 1px solid @dividerColor;
  .addMoney-infoBar-date {
    display: inline-block;
    padding: 0 10px;
    line-height: 36px;
    border-right: 1px solid @dividerColor;
    .iconfont {
      font-size: 30px;
    }
  }
}

.addMoney-tagBar {
  display: flex;
  align-items: center;
  height: 32px;
  width: 100%;
  border-top: 1px solid @dividerColor;
}
</style>