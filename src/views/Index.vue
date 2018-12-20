<template>
    <div id="view-index">
        <router-view></router-view>
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
          link: this.$route.name == "home" ? "/addmoney" : "/"
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
  height: 100%;
  margin-bottom: 50px;
}
.van-tabbar {
  box-shadow: #ececec 0 -10/20rem 20/20rem -2/20rem;
  &-item--active {
    color: @primaryColor;
    text-shadow: #e0e0e0 0 0 6/20rem;
  }
  .wrap-addBtn {
    display: inline-block;
    color: @textPrimaryColor;
    width: 30/20rem;
    height: 30/20rem;
    padding: 3/20rem;
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