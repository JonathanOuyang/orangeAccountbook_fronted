<template>
    <div id="view-addMoney">
        <div class="addMoney-header">
            <icon name="quxiao" class="addMoney-header-icon"></icon>
            <div class="addMoney-header-tab">
                <van-tabs type="card" color="#f6717d">
                    <van-tab title="收入"></van-tab>
                    <van-tab title="支出"></van-tab>
                    <van-tab title="转账"></van-tab>
                </van-tabs>
            </div>
            <icon name="queren" class="addMoney-header-icon"></icon>
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
											:type="0" 
											name-position="bottom"
											v-for="(type, typeIdx) in page"
											:key="type.name"
											:name="type.name"
											:icon="type.icon"
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
                <van-field v-model="desc" placeholder="请输入备注" />
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
            />
        </div>
    </div>
</template>

<script>
const MAX_TYPE = 15;
export default {
  name: "addMoney",
  data() {
    return {
      intStack: [],
      floatStack: [],
      isInputInt: true,
      desc: "",
      typeList: [],
      selectedType: [0, 0]
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
    }
  },
  methods: {
    getTypeList() {
      const data = [
        { name: "餐饮", icon: "canyin", whereabouts: 0 },
        { name: "购物", icon: "gouwu", whereabouts: 0 },
        { name: "服饰", icon: "fushi", whereabouts: 0 },
        { name: "交通", icon: "jiaotong", whereabouts: 0 },
        { name: "娱乐", icon: "yule", whereabouts: 0 },
        { name: "社交", icon: "shejiao", whereabouts: 0 },
        { name: "居家", icon: "jujia", whereabouts: 0 },
        { name: "通讯", icon: "tongxun", whereabouts: 0 },
        { name: "零食", icon: "lingshi", whereabouts: 0 },
        { name: "美容", icon: "meirong", whereabouts: 0 },
        { name: "运动", icon: "yundong", whereabouts: 0 },
        { name: "旅行", icon: "lvxing", whereabouts: 0 },
        { name: "数码", icon: "shuma", whereabouts: 0 },
        { name: "学习", icon: "xuexi", whereabouts: 0 },
        { name: "医疗", icon: "yiliao", whereabouts: 0 },
        { name: "书籍", icon: "shuji", whereabouts: 0 },
        { name: "宠物", icon: "chongwu", whereabouts: 0 },
        { name: "彩票", icon: "caipiao1", whereabouts: 0 },
        { name: "汽车", icon: "qiche", whereabouts: 0 },
        { name: "办公", icon: "bangong", whereabouts: 0 },
        { name: "住房", icon: "zhufang", whereabouts: 0 },
        { name: "维修", icon: "weixiu", whereabouts: 0 },
        { name: "孩子", icon: "haizi", whereabouts: 0 },
        { name: "长辈", icon: "changbei", whereabouts: 0 },
        { name: "礼物", icon: "liwu", whereabouts: 0 },
        { name: "礼金", icon: "lijin", whereabouts: 0 },
        { name: "还款", icon: "huankuan", whereabouts: 0 },
        { name: "捐赠", icon: "juanzeng", whereabouts: 0 }
      ];
      this.typeList.push(data.slice(0, MAX_TYPE), data.slice(MAX_TYPE));
    },
    handleInputNumber(key) {
      if (this.value.length < 9) {
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
  padding: 12 / @rem 18 / @rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid @dividerColor;
  &-icon {
    font-size: 18 / @rem;
  }
  &-tab {
    flex: 1;
  }
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