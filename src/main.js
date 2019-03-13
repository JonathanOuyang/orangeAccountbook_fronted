import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import {
  Button,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  NumberKeyboard,
  Field,
  Swipe,
  SwipeItem,
  DatetimePicker,
  Popup,
  Notify,
  Panel,
  Actionsheet,
  Dialog,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  PullRefresh,
  Search,
  List
} from "vant";
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import OIcon from './components/o-icon'
import moneyList from './components/moneyList'
import typeIcon from "./components/typeIcon";
import accountCard from "./components/accountCard";
import dateSelector from "./components/dateSelector";
import { filterDate, filterDatetime, filterCurrency } from './utils/filter'
import Loading from './components/loading/loading'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Cell)
  .use(CellGroup)
  .use(Button)
  .use(NumberKeyboard)
  .use(Tab)
  .use(Tabs)
  .use(Field)
  .use(Swipe)
  .use(SwipeItem)
  .use(DatetimePicker)
  .use(Notify)
  .use(Panel)
  .use(Popup)
  .use(Actionsheet)
  .use(Loading)
  .use(RadioGroup)
  .use(Radio)
  .use(Dialog)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(List)
  .use(Search)
  .use(PullRefresh);
Vue.component('Icon', OIcon)
Vue.component('typeIcon', typeIcon)
Vue.component("moneyList", moneyList);
Vue.component('accountCard', accountCard)
Vue.component('dateSelector', dateSelector)

// Use v-calendar, v-date-picker & v-popover components
Vue.use(VCalendar, {
  locale: 'zh',
})

Vue.filter('date', filterDate)
Vue.filter('datetime', filterDatetime)
Vue.filter('currency', filterCurrency)

Vue.prototype.$color = {
  success: '#47bb51',
  error: '#ec3b3f',
}
Vue.prototype.$moment = moment

Notify.setDefaultOptions({ duration: 1000 })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
