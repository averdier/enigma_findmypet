import Vue from 'vue'
import Vuex from 'vuex'
import * as alert from './modules/alert'
import * as worker from './modules/worker'
import * as auth from './modules/auth'
import * as pet from './modules/pet'
import * as subscription from './modules/subscription'
import * as setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    reset ({ dispatch }) {
      dispatch('pet/reset')
      dispatch('auth/reset')
      dispatch('alert/reset')
      dispatch('worker/reset')
      dispatch('subscription/reset')
      dispatch('setting/reset')
    },
  },
  modules: { worker, pet, alert, subscription, setting, auth }
})
