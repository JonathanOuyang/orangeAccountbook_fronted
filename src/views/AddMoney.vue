<template>
    <div id="view-addMoney">
      <div class="addMoney-header">
        <van-tabs color="#f6717d" :line-width="tabWidth" v-model="whereabouts">
          <van-tab title="收入"></van-tab>
          <van-tab title="支出"></van-tab>
          <van-tab title="转账"></van-tab>
        </van-tabs>
      </div>
      <div class="addMoney-val">
          <div class="addMoney-val-account">
              <!-- <div class="account-icon">
                  <icon name="zhifubaob"></icon>
              </div> -->
              <div class="account-name">支付宝</div>
          </div>
          <div class="addMoney-val-money" @click="isShowNumKey = !isShowNumKey">￥{{value}}</div>
      </div>
      <van-swipe :autoplay="0" indicator-color="#f6717d" :loop="false">
          <van-swipe-item v-for="(page, pageIdx) in categoryList" :key="pageIdx">
              <div class="addMoney-type">
                  <type-icon
										checker
										v-for="(type) in page"
										:key="type.name"
										:whereabouts="0"
										:typeId="type"
										name-position="bottom"
										:selected="selectedCategory == type"
										@select="handleSelectCategory"
										class="addMoney-type-item"></type-icon>
              </div>
          </van-swipe-item>
      </van-swipe>
      <van-cell-group>
        <van-cell title="时间" is-link :value="formatDate(date)" @click="isShowDate = !isShowDate"/>
            <van-field v-model="note" placeholder="输入备注" />
          </van-cell-group>
      <!-- <div class="addMoney-numberKeyborad"> -->
          <van-number-keyboard
						:show="isShowNumKey"
						extra-key="."
						@blur="show = false"
						theme="custom"
						@input="handleInputNumber"
						@delete="handleDeleteNumber"
            @close="handleClose"
						close-button-text="保存"
          />
      <!-- </div> -->
      <van-popup v-model="isShowDate" position="bottom">
        <van-datetime-picker
          v-model="date"
          type="datetime"
        />
      </van-popup>
    </div>
</template>

<script>
import { createMoney } from "../api/api.js";
const MAX_TYPE = 10;
const MAX_MONEY = 9;
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
      categoryList: [],
      selectedCategory: 0,
      tabWidth: CLIENT_WIDTH / 3,
      isShowNumKey: false,
      isShowDate: false,
      date: TODAY,
      today: TODAY
    };
  },
  created() {
    this.getTypeList();
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
    selectedTypeVal() {
      if (this.selectedType[0] == 0) {
        return this.selectedType[1];
      } else {
        return this.selectedType[1] + this.selectedType[0] * 15;
      }
    }
  },
  methods: {
    getTypeList() {
      let typeSort = [];
      for (let idx = 0; idx < 29; idx++) {
        typeSort.push(idx);
      }
      for (let x = 0; x < Math.ceil(typeSort.length / MAX_TYPE); x++) {
        let start = x * MAX_TYPE;
        let end = start + MAX_TYPE;
        this.categoryList.push(typeSort.slice(start, end));
      }
    },
    postMoneys() {
      const data = {
        whereabouts: this.whereabouts,
        value: this.value,
        type: this.selectedTypeVal,
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
    handleSelectCategory(idx) {
      this.selectedCategory = idx;
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
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