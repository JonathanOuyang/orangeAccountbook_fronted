<!--  -->
<template>
  <div 
    class="card-category"
    :class="{active: isActive}"
    @click="selectCard">
    <div class="card-category_title">
    <type-icon :icon="data.icon" :type="Number(data.type)" :title="data.name"/>
    </div>
    <div 
      class="card-category_info"
      v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        _id: "",
        icon: "",
        type: 0,
        name: ""
      })
    },
    type: {
      type: String,
      default: "normal"
    },
    selected: {
      type: [Boolean, Number],
      default: 0
    },
    selecteKey: {
      type: [String, Number]
    } 
  },
  data() {
    return {
      isActive: false
    };
  },

  computed: {},

  created() {
    this.isActive = this.selected
  },

  watch: {
    selected(newVal) {
      this.isActive = newVal;
    }
  },

  methods: {
    selectCard() {
      if (this.selected !== 0) {
        if (this.isActive) {
          this.isActive = false;
          this.$emit("disselect", this.selecteKey)          
        } else {
          this.isActive = true;
          this.$emit("select", this.selecteKey)
        }
      }
    }
  }
};
</script>

<style lang='less' scoped>
@import "../assets/variable.less";
.card-category {
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 4px;
  border: 1px solid @dividerColor;
  background: #fff;
  color: @primaryTextColor;
  overflow: hidden;

  height: 48px;

  &_title {
    flex: 1;
  }

  &.active {
    border: 1px solid @primaryColor;
    box-shadow: @shadow1;
  }
}
</style>