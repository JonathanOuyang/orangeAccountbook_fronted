<template>
    <div id="view-index">
      <keep-alive :max="1" :include="keepAlivePage">
        <router-view></router-view>
      </keep-alive>
        
        <van-tabbar v-model="tabbarActive">
            <van-tabbar-item v-for="(item, index) in tabbar" :key="index" :to="item.link">
                <Icon slot="icon" :name="item.icon" class="tabbar-item-icon"
                      v-if="index != 1 || (index == 1 && tabbarActive != 1)"></Icon>
                <span class="wrap-addBtn" slot="icon" v-else-if="index == 1 && tabbarActive == 1">
                    <Icon name="tianjia" class="tabbar-item-addBtn"></Icon>
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
      tabbarActive: 1,
      keepAlivePage: 'Calendar'
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
}
.van-tabbar {
  box-shadow: #ececec 0 -10px 20px -2px;
  &-item--active {
    color: @primaryColor;
    text-shadow: #e0e0e0 0 0 6px;
  }
  .wrap-addBtn {
    display: inline-block;
    color: @textPrimaryColor;
    width: 30px;
    height: 30px;
    padding: 3px;
    border-radius: 50%;
    background: @linearColor;
  }
  .tabbar-item-icon {
    font-size: 22px;
  }
  .tabbar-item-addBtn {
    font-size: 30px;
  }
}
</style>