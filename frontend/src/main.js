import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VeeValidate from 'vee-validate';

import App from './App';
import router from './router';
import store from './vuex';
import './config/socket';

import './styles/global.scss';

Vue.config.productionTip = false;

Vue.use(VeeValidate);

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
