<template>
  	<i 
      class="iconfont" 
      :class="'icon-'+name"
      :style="{fontSize: size+'px'}"
      ></i>
</template>

<script type="text/javascript">
export default {
  props: {
    name: {
      required: true
    },
    link: {
      type: String
    },
    size: {
      type: Number,
      default: 16
    }
  }
};
</script>

<style lang="less">
@import "../assets/icon/iconfont.css";
.iconfont {
  line-height: 1.4em;
}
</style>
