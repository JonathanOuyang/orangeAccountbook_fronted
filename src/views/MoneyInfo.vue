<template>
  <div id="view-money_info">
    <div class="info-wrap">
      <div class="info-header">
        <!-- <type-Icon :typeId="money.type" :whereabouts="0"></type-Icon>         -->
      </div>
      <div class="info-item"></div>
      <div class="info-note"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "money_info"
};
</script>

<style lang="less">
@import "../assets/variable.less";
#money_info {
  background: @linearColor;
}
.info-wrap {
  .panel(80/@rem);
  .info-header,
  .info-item {
    display: flex;
  }
}
</style>