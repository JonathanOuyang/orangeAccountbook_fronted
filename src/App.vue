<template>
  <div id="app">
    
    <transition :name="transitionName">
      <!-- <keep-alive :max="1" :include="keepAlivePage"> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keepAlivePage: [],
      transitionName: ''
    };
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
	    //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  }
};
</script>

<style lang="less">
@import "./assets/variable.less";
html {
  font-size: 20px;
}
@media only screen and (min-width: 401px) {
  html {
    font-size: 25px !important;
  }
}
@media only screen and (min-width: 428px) {
  html {
    font-size: 26.75px !important;
  }
}
@media only screen and (min-width: 481px) {
  html {
    font-size: 30px !important;
  }
}
@media only screen and (min-width: 569px) {
  html {
    font-size: 35px !important;
  }
}
@media only screen and (min-width: 641px) {
  html {
    font-size: 40px !important;
  }
}
html,
body,
#app {
  height: 100%;
}
#app {
  font-family: "å¾®è½¯é›…é»‘";
  color: @primaryTextColor;
  background: #fff;
  overflow-x: hidden;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  height: 100%;
  backface-visibility: hidden;
  perspective: 1000;
}
.slide-right-enter {
  opacity: 0;
  // transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  // transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  // transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  // transform: translate3d(-100%, 0, 0);
}
</style>
