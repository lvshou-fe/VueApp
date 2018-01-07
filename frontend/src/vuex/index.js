import Vue from 'vue';
import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';

import state from './state';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  plugins: [createLogger()],
  strict: process.env.NODE_ENV !== 'production'
});

export default store;
