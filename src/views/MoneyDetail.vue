<template>
  <div id="view-moneyDetail">
    <div class="detail-wrap">
      <div class="detail-header">
        <type-Icon :typeId="Number(type)" :whereabouts="whereabouts"></type-Icon>
        <div class="detail-value">￥{{value}}</div>
      </div>
      <div class="detail-cell">
        <div class="detail-item_title">流向</div>
        <div class="detail-item_info">{{whereaboutsData[whereabouts]}}</div>
      </div>
      <div class="detail-cell">
        <div class="detail-item_title">账本</div>
        <div class="detail-item_info">{{book? book : '未选择'}}</div>
      </div>
      <div class="detail-cell">
        <div class="detail-item_title">账户</div>
        <div class="detail-item_info">{{account? account : '未选择'}}</div>
      </div>
      <div class="detail-cell">
        <div class="detail-item_title">时间</div>
        <div class="detail-item_info">{{time | datetime}}</div>
      </div>
      <div class="detail-cell">
        <div class="detail-item_title">备注</div>
        <div class="detail-item_info">{{note}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {getMoneyDetail} from '../api/api.js'
export default {
  name: "moneyDetail",
  data() {
    return {
      type: -1,
      whereabouts: -1,
      value: 0,
      time: '',
      note: '',
      id: '',
      book: '',
      account: '',
      whereaboutsData: ['支出','收入','转账']
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getMoneyDetail();
  },
  methods: {
    getMoneyDetail() {
      getMoneyDetail({id: this.id}).then(res => {
        this.type = res.data.money.type;
        this.value = res.data.money.value;
        this.time = res.data.money.time;
        this.note = res.data.money.note;
      })
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
#view-moneyDetail {
  box-sizing: border-box;
  padding: 30px 16px;
  background: @linearColor;
  height: 100%;
}
.detail-wrap {
  .panel(0);
  padding: 20px 12px;

  .detail-header,
  .detail-cell {
    display: flex;
    justify-content: space-between;
  }

  .detail-header,
  .detail-cell,
  .detail-note {
    padding: 12px 6px;
  }

  .detail-value {
    font-size: 32/@rem;
  }
  
  .detail-item_title{
    font-size: 16/@rem;
  }

  .detail-item_info {
    color: @secondaryTextColor;
    font-size: 14/@rem;    
  }

  .detail-note .detail-item_title {
    padding-bottom: 6px;
  }
}
</style>