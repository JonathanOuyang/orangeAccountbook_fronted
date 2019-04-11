import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

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
          meta: { title: "首页-橙子记账", index: 0 },
          component: () => import("./views/Home.vue")
        },
        {
          path: "/accounts",
          name: "accounts",
          meta: { title: "账户-橙子记账", index: 0 },
          component: () => import("./views/Account/Index.vue")
        },
        {
          path: "/calendar",
          name: "calendar",
          meta: { title: "所有账单-橙子记账", index: 0 },
          component: () => import("./views/Calendar.vue")
        },
        {
          path: "/chart",
          name: "chart",
          meta: { title: "财务报表-橙子记账", index: 0 },
          component: () => import("./views/Chart/Index.vue"),
          // redirect: "/chart/categoryPie",
          children: [
            {
              path: "categoryPie",
              name: "category-pie",
              meta: { title: "财务报表-橙子记账" },
              component: () => import("./views/Chart/CategoryPie.vue")
            },
            {
              path: "dateBar",
              name: "date-bar",
              meta: { title: "财务报表-橙子记账" },
              component: () => import("./views/Chart/DateBar.vue")
            }
          ]
        }
        // {
        //   path: "/books",
        //   name: "books",
        //   component: () => import("./views/Books.vue")
        // },
      ]
    },
    {
      path: "/register",
      name: "register",
      meta: { title: "注册-橙子记账" },
      component: () => import("./views/Register.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: { title: "登录-橙子记账" },
      component: () => import("./views/Login.vue")
    },
    {
      path: "/personal",
      name: "personal",
      meta: { title: "个人中心-橙子记账", index: -1 },
      component: () => import("./views/Personal/Index.vue")
    },
    {
      path: "/budget",
      name: "personal-budget",
      meta: { title: "预算-橙子记账", index: 1 },
      component: () => import("./views/Budget.vue")
    },
    {
      path: "/categoryBudgetEdit",
      name: "personal-categoryBudgetEdit",
      meta: { title: "预算设置-橙子记账", index: 1 },
      component: () => import("./views/Personal/CategoryBudget.vue")
    },
    {
      path: "/budgetEdit",
      name: "personal-budgetEdit",
      meta: { title: "预算设置-橙子记账", index: 1 },
      component: () => import("./views/Personal/Budget.vue")
    },
    {
      path: "/categoryManage",
      name: "category-manage",
      meta: { title: "分类管理-橙子记账", index: 2 },
      component: () => import("./views/Personal/CategoryManage.vue")
    },
    {
      path: "/addMoney",
      name: "addMoney",
      meta: { title: "添加账单-橙子记账", index: 1 },
      beforeEnter: (to, from, next) => {
        document.title = to.query.moneyId
          ? "编辑账单-橙子记账"
          : "添加账单-橙子记账";
        next();
      },
      component: () => import("./views/AddMoney.vue")
    },
    {
      path: "/searchMoney",
      name: "searchMoney",
      meta: { title: "搜索账单-橙子记账" },
      component: () => import("./views/SearchMoney.vue")
    },
    {
      path: "/moneyDetail/:id",
      name: "moneyDetail",
      meta: { title: "账单详情-橙子记账" },
      component: () => import("./views/MoneyDetail.vue")
    },
    {
      path: "/addEditAccount",
      name: "addEditAccount",
      meta: { title: "账户-橙子记账" },
      component: () => import("./views/Account/AddEdit.vue")
    },
    {
      path: "/accountDetail",
      name: "accountDetail",
      meta: { title: "账户详情-橙子记账" },
      component: () => import("./views/Account/Detail.vue")
    },
    {
      path: "/categoryMoneys",
      name: "categoryMoneys",
      meta: { title: "账单-橙子记账", index: 0 },
      component: () => import("./views/CategoryMoneys.vue")
    }
  ]
});
