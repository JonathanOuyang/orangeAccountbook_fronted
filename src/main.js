import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button, Cell, CellGroup, Tabbar, TabbarItem, Tab, Tabs, NumberKeyboard, Field, Swipe, SwipeItem } from 'vant';
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

import OIcon from './components/o-icon'
import infoPanel from './components/infoPanel'
import moneyList from './components/moneyList'
import typeIcon from "./components/typeIcon";


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

// Use v-calendar, v-date-picker & v-popover components
Vue.use(VCalendar, {
  locale: 'zh'
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
