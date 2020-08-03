import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';

import App from './App.vue';
import router from './router';
import './bus';
// filter
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;

// 將外部元件註冊成全域
Vue.component('Loading', Loading);

// 全域filter使用
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

// 將套件加入原型那層
Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
