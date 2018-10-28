import Vue from 'vue'
import Vuex from 'vuex'
import LS from '../utils/LocalStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: LS.getUser() || null
  },
  mutations: {
    SAVE_USER (state, user) {
      console.log(user)
      state.user = user
      LS.saveUser(user)
    }
  },
  getters: {
    user: state => {
      return state.user
    }
  }
})
