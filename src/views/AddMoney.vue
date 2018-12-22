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
            <div class="addMoney-val-money">￥{{value}}</div>
        </div>
        <van-swipe :autoplay="0" indicator-color="#f6717d" :loop="false">
            <van-swipe-item v-for="(page, pageIdx) in typeList" :key="pageIdx">
                <div class="addMoney-type">
                    <type-icon
											checker
											v-for="(type, typeIdx) in page"
											:key="type.name"
											:whereabouts="0"
											:typeId="typeIdx"
											name-position="bottom"
											:selected="selectedType[0] == pageIdx && selectedType[1] == typeIdx"
											@select="handleSelectType(pageIdx, typeIdx)"
											class="addMoney-type-item"></type-icon>
                </div>
            </van-swipe-item>
        </van-swipe>
        <div class="addMoney-tagBar"></div>
        <div class="addMoney-infoBar">
            <div class="addMoney-infoBar-date" slot="label">
                <icon name="rili30"></icon>
            </div>
            <van-cell-group>
                <van-field v-model="note" placeholder="请输入备注" />
            </van-cell-group>
        </div>
        <div class="addMoney-numberKeyborad">
            <van-number-keyboard
							:show="true"
							extra-key="."
							@blur="show = false"
							theme="custom"
							@input="handleInputNumber"
							@delete="handleDeleteNumber"
              @close="handleClose"
							close-button-text="保存"
            />
        </div>
    </div>
</template>

<script>
import { createMoney } from "../api/moneys.js";
const MAX_TYPE = 15;
const MAX_MONEY = 9;
const CLIENT_WIDTH = document.body.clientWidth;
export default {
  name: "addMoney",
  data() {
    return {
      intStack: [],
      floatStack: [],
      isInputInt: true,
      whereabouts: 0,
      note: "",
      typeList: [],
      selectedType: [0, 0],
      tabWidth: CLIENT_WIDTH / 3
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
      this.typeList.push(typeSort.slice(0, MAX_TYPE), typeSort.slice(MAX_TYPE));
    },
    postMoneys() {
      const data = {
        whereabouts: this.whereabouts,
        value: this.value,
        type: this.selectedTypeVal,
        time: new Date(),
        note: this.note
      };
      createMoney(data).then(res => {
        console.log(res);
      });
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
    handleSelectType(page, type) {
      this.selectedType = [page, type];
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
#view-addMoney {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  color: @primaryTextColor;
  background-color: #fff;
  &::after {
    content: "";
    width: 100%;
    height: 216px;
  }
}
.addMoney-header {
  border-bottom: 1px solid @dividerColor;
}
.addMoney-val {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70 / @rem;
  border-bottom: 1px solid @dividerColor;
  &-account {
    display: flex;
    align-items: center;
    padding: 0 20 / @rem;
    height: 60%;
    border-right: 1px solid @dividerColor;
    font-size: 20 / @rem;
    .account-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 36 / @rem;
      height: 36 / @rem;
      border-radius: 4 / @rem;
      background: #2873ff;
      color: #fff;
      font-size: 36 / @rem;
    }
  }
  &-money {
    font-size: 32 / @rem;
    padding: 0 8 / @rem;
  }
}

.van-swipe {
  flex: 1;

  .addMoney-type {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: 88%;
    padding: 12 / @rem 18 / @rem 18 / @rem;
    &-item {
      width: 20%;
      margin: 4 / @rem 0;
    }
  }
}

.addMoney-infoBar {
  display: flex;
  align-items: center;
  background: #fff;
  // border-top: 1px solid @dividerColor;
  .addMoney-infoBar-date {
    padding: 0 16px;
    border-right: 1px solid @dividerColor;
    .iconfont {
      font-size: 26px;
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