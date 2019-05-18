<!--  -->
<template>
  <div>
    <div 
      class="card-account card-account_normal"
      v-if="type === 'normal'"
      @click="handleClick">
      <div class="card-account_title">
        <span class="title-name">{{data.name}}</span>
        <span class="title-summary">{{data.summary}}</span>
      </div>
      <div class="card-account_main">
        <div class="value-number">{{data.value | currency}}</div>
      </div>
    </div>
    <div 
      class="card-account card-account_large"
      v-if="type==='large'">
      <div class="card-account_wrap">
        <div class="card-account_header">
          <div class="card-account_title">
            <span class="title-name">{{data.name}}</span>
            <span class="title-summary">{{data.summary}}</span>
          </div>
        </div>
        <div class="card-account_main">
          <div class="value-number">{{data.value | currency}}</div>
          <van-button 
            type="primary" 
            plain
            size="small"
            :to="`/addEditAccount?accountId=${data._id}`">
            编辑
          </van-button>
        </div>
      </div>
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
        name: "",
        summary: "",
        value: 0
      })
    },
    type: {
      type: String,
      default: "normal"
    }
  },
  data() {
    return {};
  },

  computed: {},

  methods: {
    handleClick() {
      this.$router.push("/accountDetail?accountId=" + this.data._id);
    }
  }
};
</script>

<style lang='less' scoped>
@import "../assets/variable.less";
.card-account {
  border-radius: 4px;
  border: 1px solid @dividerColor;
  background: #fff;
  color: @primaryTextColor;
  overflow: hidden;

  &::before {
    content: "";
    background-color: @primaryColor;
    height: 110%;
    width: 8px;
  }
}

.card-account_normal {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 16px;
  height: 48px;
  &::before {
    content: "";
    background-color: @primaryColor;
    height: 110%;
    width: 6px;
  }
  .card-account_title {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 10px;

    .title-name,
    .title-summary {
      line-height: 20px;
    }

    .title-name {
      margin-right: 4px;
      font-size: 18px;
    }

    .title-summary {
      font-size: 14px;
      color: @secondaryTextColor;
    }
  }

  .card-account_main {
    margin-right: 10px;
    .value-number {
      font-weight: 300;
      font-size: 24px;
    }
  }
}

.card-account_large {
  display: flex;
  margin: 16px 12px;
  height: 90px;
  &::before {
    content: "";
    background-color: @primaryColor;
    height: 110%;
    width: 8px;
  }
  .card-account_wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 10px 4px;
    width: 100%;
  }
  .card-account_header {
    display: flex;
  }
  .card-account_title {
    line-height: 20px;
    flex: 1;
    font-size: 18px;
      
  }
  .title-summary {
    margin-left: 8px;
    line-height: 20px;
    font-size: 14px;
    color: @secondaryTextColor;
  }
  .card-account_main {
    display: flex;
    align-items: center;
    .value-number {
      flex: 1;
      font-size: 36px;
      line-height: 40px;
      font-weight: 200;
    }
  }
}
</style>