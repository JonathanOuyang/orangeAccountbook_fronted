/**
 * typeIcon
 * @desc 账单类型组件
 * @param {Number} [icon] 图标
 * @param {String} [title] 标题
 * @param {Number} [type] 账单类型
 * @param {String} [titlePosition] 类型名相对图标的位置, 可选值: "right", "bottom", 默认为"right"
 * @param {Boolean} [checker] 是否开启可选择模式(可用于将该组件设为单选框或者复选框), 默认为false
 * @param {selected} [selected] 是否为选中状态, 默认为false. checker参数值为true时有效
 * @example <money-list :data="moneys"></money-list>
 */
<template>
  <div class="typeIcon"
       :class="titlePositionMap[titlePosition]"
       @click="handleClick">
    <div class="typeIcon-icon"
         :class="[{'unSelected':checker&&!selected}, type? 'in': 'out']">
      <Icon :name="icon" :size="20"></Icon>
    </div>
    <div class="typeIcon-title"
         v-if="title">{{title}}</div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    _id: {
      type: String
    },
    icon: {
      type: String
    },
    title: {
      type: String
    },
    type: {
      type: Number
    },
    titlePosition: {
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
      titlePositionMap: {
        right: "typeIcon-title-right",
        bottom: "typeIcon-title-bottom"
      }
    };
  },
  methods: {
    handleClick() {
      this.$emit("select", this._id);
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
    width: 34px;
    height: 34px;
    border-radius: 50%;
    color: @textPrimaryColor;
    text-align: center;
    font-size: 20px;
    .iconfont {
      line-height: 34px;
      font-size: 24px;
    }
    &.out {
      background: @accentColor;
    }
    &.in {
      background: @primaryColor;
    }
    &.unSelected {
      background: #cccccc;
      color: @textPrimaryColor;
    }
  }
}
.typeIcon-title-right {
  .typeIcon-title {
    margin-left: 8px;
    font-size: 18px;
  }
}
.typeIcon-title-bottom {
  flex-direction: column;
  .typeIcon-title {
    margin-top: 2px;
    font-size: 14px;
  }
}
</style>