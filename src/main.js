import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button, Cell, CellGroup, Tabbar, TabbarItem, Tab, Tabs, NumberKeyboard, Field, Swipe, SwipeItem } from 'vant';
import OIcon from './components/o-icon'
import infoPanel from './components/infoPanel'
import moneyList from './components/moneyList'
import typeIcon from "./components/typeIcon";

import vueEventCalendar from "./components/money-calendar";
// import vueEventCalendar from '../dist'
// import '../dist/style.css'
Vue.use(vueEventCalendar, { locale: "zh"});

Vue.config.productionTip = false
Vue.use(Tabbar).use(TabbarItem)
  .use(Cell).use(CellGroup)
  .use(Button)
  .use(NumberKeyboard)
  .use(Tab).use(Tabs)
  .use(Field)
  .use(Swipe).use(SwipeItem);
Vue.component('Icon', OIcon);
Vue.component('infoPanel', infoPanel);
Vue.component('typeIcon', typeIcon);
Vue.component("moneyList", moneyList);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
