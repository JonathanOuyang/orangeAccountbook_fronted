<template>
    <div id="view-index">
      
      <router-view></router-view>
      <van-tabbar 
        v-model="tabbarActive"
        active-color="#f6717d">
          <van-tabbar-item 
            v-for="(item, index) in tabbar"
            :key="index"
            :to="item.link">
            <icon 
              slot="icon"
              :size="22"
              :name="item.icon"/>
              {{item.title}}
          </van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
const PAGES = ["home", "calendar", "accounts", "chart"]
export default {
  data() {
    return {
      tabbarActive: 0
    };
  },
  created() {
    this.setTabbarActive()
  },
  computed: {
    tabbar() {
      var tabbarActive = this.tabbarActive;
      var list = [
        {
          icon: "jizhang",
          link: "home",
          title: '主页'
        },
        {
          icon: "rili",
          link: "calendar",
          title: '日历'
        },
        {
          icon: "xinyongqiahuankuan",
          link: "accounts",
          title: '账户'
        },
        {
          icon: "tubiaobingzhuangtu",
          link: "chart",
          title: '报表'
        }
      ];
      return list;
    }
  },
  methods: {
    setTabbarActive() {
      this.tabbarActive = PAGES.indexOf(this.$route.name)
    }
  },
};
</script>

<style lang="less">
@import "../assets/variable.less";
#view-index {
  margin-bottom: 60px;
  min-height: 90%;
}
.van-tabbar {
  box-shadow: rgba(0, 0, 0, 0.1) 0 -10px 20px -2px;
}
</style>