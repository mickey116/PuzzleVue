import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import {
  ValidationProvider,
  extend,
  localize,
  configure,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import TW from 'vee-validate/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';
import './bus';
// filter
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;

// 將外部元件註冊成全域
Vue.component('Loading', Loading);

// input驗證
Vue.component('ValidationProvider', ValidationProvider);
// 表單中文字
localize('zh_TW', TW);

// 安裝所有 VeeValidate 規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

// 全域filter使用
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

// 將套件加入原型那層
Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
