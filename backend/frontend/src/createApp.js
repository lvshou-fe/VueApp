import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { sync } from 'vuex-router-sync';
import App from './App';

import { createRouter } from './router';
import { createStore } from './vuex';

export function createApp() {
  const store = createStore();
  const router = createRouter(store);

  sync(store, router);

  Vue.use(VeeValidate);

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  return { app, router, store };
}
