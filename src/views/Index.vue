<template>
    <div id="view-index">
      <router-view></router-view>
      <van-tabbar v-model="tabbarActive">
          <van-tabbar-item v-for="(item, index) in tabbar" :key="index" :to="item.link">
              <Icon slot="icon" :name="item.icon" class="tabbar-item-icon" :size="20"
                    v-if="index != 1 || (index == 1 && tabbarActive != 1)"></Icon>
              <span class="wrap-addBtn" slot="icon" v-else-if="index == 1 && tabbarActive == 1">
                  <Icon name="tianjia" class="tabbar-item-addBtn" :size="25"></Icon>
              </span>
          </van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pages: ["calendar", "accounts", "home", "chart", "personal"],
      tabbarActive: 1
    };
  },
  computed: {
    tabbar() {
      var tabbarActive = this.tabbarActive;
      var list = [
        {
          icon: "xinyongqiahuankuan",
          link: "accounts"
        },
        {
          icon: "jizhang",
          link: this.$route.name == "home" ? "/addMoney" : "/"
        },

        {
          icon: "wode",
          link: "personal"
        }
      ];
      return list;
    }
  }
};
</script>

<style lang="less">
@import "../assets/variable.less";
#view-index {
  margin-bottom: 90px;
  height: 100%;
}
.van-tabbar {
  box-shadow: rgba(0, 0, 0, 0.1) 0 -10px 20px -2px;
  &-item--active {
    color: @primaryColor;
    text-shadow: #e0e0e0 0 0 6px;
  }
  .wrap-addBtn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: @textPrimaryColor;
    width: 30px;
    height: 30px;
    padding: 3px 3px 3px;
    border-radius: 50%;
    background: @linearColor;
  }
  .tabbar-item-icon {
    font-size: 22px;
  }
}
</style>