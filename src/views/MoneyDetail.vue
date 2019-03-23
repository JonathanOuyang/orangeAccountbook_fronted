<template>
  <div id="view-moneyDetail">
    <div class="detail-wrap">
      <div class="detail-header">
        <type-Icon :icon="money.categoryId.icon" :type="money.type" :title="money.categoryId.name"></type-Icon>
        <div class="detail-value">￥{{money.value}}</div>
      </div>
      <div class="detail-cell">
        <div class="detail-item_title">类型</div>
        <div class="detail-item_info">{{type[money.type]}}</div>
      </div>
      <!-- <div class="detail-cell">
        <div class="detail-item_title">账本</div>
        <div class="detail-item_info">{{book? book : '未选择'}}</div>
      </div> -->
      <div class="detail-cell">
        <div class="detail-item_title">账户</div>
        <div class="detail-item_info">{{money.accountId.name}}</div>
      </div>
      <div class="detail-cell">
        <div class="detail-item_title">时间</div>
        <div class="detail-item_info">{{$moment(money.moneyTime).format('YYYY-MM-DD HH:mm')}}</div>
      </div>
      <div class="detail-cell">
        <div class="detail-item_title">备注</div>
        <div class="detail-item_info">{{money.note || '无'}}</div>
      </div>
      <div class="detail-cell">
        <van-button type="primary" plain :to="`/addMoney?moneyId=${moneyId}`">编辑</van-button>
        <van-button type="danger" 
                    @click="handleDelete">删除</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getMoneyDetail, deleteMoney } from "../api/api.js";
export default {
  name: "moneyDetail",
  data() {
    return {
      moneyId: "",
      money: {},
      type: ["支出", "收入", "转账"]
    };
  },
  created() {
    this.moneyId = this.$route.params.id;
    this.getMoneyDetail();
  },
  methods: {
    getMoneyDetail() {
      getMoneyDetail({ moneyId: this.moneyId }).then(res => {
        this.money = res.data.detail;
      });
    },
    handleDelete() {
      this.$dialog.confirm({
        title: "提示",
        message: "确认删除该账单？"
      })
        .then(() => {
          deleteMoney({ moneyId: this.moneyId }).then(res => {
            // this.$notify({
            //   message: res.data.summary,
            //   background: this.$color["success"]
            // });
            this.$router.go(-1);
          });
        })
        .catch(() => {});
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
  padding: 50px 16px 0;
  background: @linearColor;
  height: 100%;
}
.detail-wrap {
  .panel();
  padding: 16px 12px 8px;

  .detail-header,
  .detail-cell {
    display: flex;
  }

  .detail-header {
    justify-content: space-between;
  }

  .detail-header,
  .detail-cell,
  .detail-note {
    padding: 12px 6px;
  }

  .detail-value {
    font-size: 32px;
  }

  .detail-item_title {
    flex: 1;
    font-size: 16px;
  }

  .detail-item_info {
    color: @secondaryTextColor;
    font-size: 14px;
  }

  .detail-note .detail-item_title {
    padding-bottom: 6px;
  }

  .detail-cell:last-child {
    display: flex;
    justify-content: flex-end;
    .van-button--normal:not(:last-child) {
      margin-right: 4px;
    }
  }
}
</style>