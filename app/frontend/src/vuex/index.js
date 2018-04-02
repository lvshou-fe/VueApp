import Vue from 'vue';
import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';

import state from './state';
import actions from './actions';
import mutations from './mutations';
import { isServer } from '../util';

Vue.use(Vuex);

export function createStore() {
  const store = new Vuex.Store({
    state,
    actions,
    mutations,
    plugins: !isServer() ? [createLogger()] : [],
    strict: process.env.NODE_ENV !== 'production'
  });

  return store;
}
