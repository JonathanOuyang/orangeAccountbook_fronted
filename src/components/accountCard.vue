<!--  -->
<template>
  <div class="card-account">
    <div class="card-account_title">
      <span class="title-name">{{name}}</span>
      <span class="title-summary">{{summary}}</span>
    </div>
    <div class="card-account_main">
      <div class="value-number">¥{{value}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    summary: {
      type: String
    },
    value: {
      type: Number
    }
  },
  data () {
    return {
    };
  },

  computed: {},

  methods: {}
}

</script>

<style lang='less' scoped>
@import "../assets/variable.less";
.card-account {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 16px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid @dividerColor;
  background: #fcfdff;
  color: @primaryTextColor;

  &::before {
    content: '';
    background-color: @primaryColor;
    height: 110%;
    width: 5px;
  } 
}

.card-account_title {
  flex: 1;
  margin-left: 10px;

  .title-name, .title-summary {
    line-height: 20px;
  }

  .title-name {
    margin-right: 4px;
    font-size: 18px;
  }

  .title-summary {
    font-size: 14px;
  }
}

.card-account_main {
  margin-right: 10px;
  .value-number {
    font-weight: 300;
    font-size: 24px;
  }
}
</style>