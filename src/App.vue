<template>
  <div id="app">
    <keep-alive :max="1" :include="keepAlivePage">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keepAlivePage: ['calendar']    
    };
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
</style>
