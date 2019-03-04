<template>
  <transition name="fade">
    <div class="wrap-loading"
         :class="{'wrap-loading_opacity': opacity == '0.5'}"
         v-show="show">
      <DoubleBounce v-if="type === 'DoubleBounce'"
                    background="#f6717d"
                    size="80px"></DoubleBounce>
      <RotateSquare2 v-if="type === 'RotateSquare2'"
                     background="#f6717d"
                     size="60px"></RotateSquare2>
    </div>
  </transition>
</template>

<script>
import { DoubleBounce, RotateSquare2 } from "vue-loading-spinner";
export default {
  components: {
    DoubleBounce,
    RotateSquare2
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "DoubleBounce"
    },
    opacity: {
      type: String,
      default: "0.5"
    }
  }
};
</script>

<style lang="less" scoped>
.wrap-loading {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  padding-bottom: 10%;
  background: #fff;
  opacity: 0.9;
  height: 100%;
  width: 100%;
  z-index: 100;

  .spinner::after {
    background: #f6717d;
  }

  &_opacity {
    opacity: 0.5;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>