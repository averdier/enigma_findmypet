import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './modules/auth'
import * as pet from './modules/pet'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    reset ({ dispatch }) {
      dispatch('pet/reset')
      dispatch('auth/reset')
    }
  },
  modules: { pet, auth }
})
