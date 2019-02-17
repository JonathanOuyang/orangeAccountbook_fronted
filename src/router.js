import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("./views/Index.vue"),
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("./views/Home.vue")
        },
        {
          path: "/accounts",
          name: "accounts",
          component: () => import("./views/Accounts.vue")
        },
        {
          path: "/books",
          name: "books",
          component: () => import("./views/Books.vue")
        },
        {
          path: "/personal",
          name: "personal",
          component: () => import("./views/Chart.vue")
        }
      ]
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("./views/Calendar.vue")
    },
    {
      path: "/chart",
      name: "chart",
      component: () => import("./views/Chart.vue")
    },
    {
      path: "/addMoney",
      name: "addMoney",
      component: () => import("./views/AddMoney.vue")
    },
    {
      path: "/moneyDetail/:id",
      name: "moneyDetail",
      component: () => import("./views/MoneyDetail.vue")
    }
  ]
});
