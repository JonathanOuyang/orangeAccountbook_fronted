<template>
  <transition name="fade">
    <div class="wrap-loading" v-show="show">
      <DoubleBounce background="#f6717d" size="80px"></DoubleBounce>
    </div>
  </transition>
</template>

<script>
import { DoubleBounce } from "vue-loading-spinner";
export default {
  components: {
    DoubleBounce
  },
  props: {
    show: {
      type: Boolean,
      default: false
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
  background: rgba(255, 255, 255, 0.4);
  height: 100%;
  width: 100%;
  z-index: 100;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>