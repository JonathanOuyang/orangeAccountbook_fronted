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
    <div class="detail-footer">
      <div class="detail-footer_btn">
        <Icon name="bianji"></Icon>
        <span>编辑</span>
      </div>
      <div class="detail-footer_btn">
        <Icon name="shanchu1"></Icon>
        <span>删除</span>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30/@rem 0 0;
  background: @linearColor;
  height: 100%;
}
.detail-wrap {
  .panel(0);
  margin: 0 16/@rem;
  padding: 20/@rem 12/@rem;

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
.detail-footer {
  display: flex;
}
.detail-footer_btn {
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: #fff;
  padding: 18px 0;

  &:first-child {
    border-right: 1px solid @dividerColor;
  }

  .iconfont {
    line-height: 18/@rem;
    font-size: 18/@rem;
    margin-right: 4px;
  }

  span {
    line-height: 16/@rem;
    font-size: 16/@rem;
  }
}
</style>