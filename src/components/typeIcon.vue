/**
 * typeIcon
 * @desc 账单类型组件
 * @param {Number} [typeId] 类型id
 * @param {Number} [whereabouts] 账单去向
 * @param {Boolean} [isShowName] 是否显示类型名
 * @param {String} [namePosition] 类型名相对图标的位置, 可选值: "right", "bottom", 默认为"right"
 * @param {Boolean} [checker] 是否开启可选择模式(可用于将该组件设为单选框或者复选框), 默认为false
 * @param {selected} [checker] 是否为选中状态, 默认为false. checker参数值为true时有效
 * @example <money-list :data="moneys"></money-list>
 */
<template>
    <div class="typeIcon" :class="namePositionClass" @click="handleClick">
        <div class="typeIcon-icon" :class="{'unSelected':checker&&!selected}">
            <Icon :name="outcome[typeId].icon"></Icon>
        </div>
        <div class="typeIcon-name">{{outcome[typeId].name}}</div>
    </div>
</template>

<script type="text/javascript">
const OUTCOME = [
  { name: "餐饮", icon: "canyin" },
  { name: "购物", icon: "gouwu" },
  { name: "服饰", icon: "fushi" },
  { name: "交通", icon: "jiaotong" },
  { name: "娱乐", icon: "yule" },
  { name: "社交", icon: "shejiao" },
  { name: "居家", icon: "jujia" },
  { name: "通讯", icon: "tongxun" },
  { name: "零食", icon: "lingshi" },
  { name: "美容", icon: "meirong" },
  { name: "运动", icon: "yundong" },
  { name: "旅行", icon: "lvxing" },
  { name: "数码", icon: "shuma" },
  { name: "学习", icon: "xuexi" },
  { name: "医疗", icon: "yiliao" },
  { name: "书籍", icon: "shuji" },
  { name: "宠物", icon: "chongwu" },
  { name: "彩票", icon: "caipiao1" },
  { name: "汽车", icon: "qiche" },
  { name: "办公", icon: "bangong" },
  { name: "住房", icon: "zhufang" },
  { name: "维修", icon: "weixiu" },
  { name: "孩子", icon: "haizi" },
  { name: "长辈", icon: "changbei" },
  { name: "礼物", icon: "liwu" },
  { name: "礼金", icon: "lijin" },
  { name: "还款", icon: "huankuan" },
  { name: "捐赠", icon: "juanzeng" }
];
export default {
  props: {
    typeId: {
      type: Number
    },
    whereabouts: {
        type: Number
    },
    isShowName: {
      type: Boolean,
      default: false
    },
    namePosition: {
      type: String,
      default: "right"
    },
    checker: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
        outcome: OUTCOME
    };
  },
  computed: {
    namePositionClass() {
      if (this.namePosition == "right") {
        return "typeIcon-name-right";
      } else if (this.namePosition == "bottom") {
        return "typeIcon-name-bottom";
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit("select", this.typeId)
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
.typeIcon {
  display: flex;
  align-items: center;
  .typeIcon-icon {
    display: inline-block;
    width: 34 / @rem;
    height: 34 / @rem;
    border-radius: 50%;
    background: @primaryColor;
    color: @textPrimaryColor;
    text-align: center;
    font-size: 20 / @rem;
    .iconfont {
      line-height: 34 / @rem;
      font-size: 24 / @rem;
    }
    &.unSelected {
      background: #cccccc;
      color: @textPrimaryColor;
    }
  }
}
.typeIcon-name-right {
  .typeIcon-name {
    margin-left: 8 / @rem;
  }
}
.typeIcon-name-bottom {
  flex-direction: column;
  .typeIcon-name {
    margin-top: 2px;
    font-size: 14 / @rem;
  }
}
</style>