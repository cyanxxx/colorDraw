import Vue from 'vue'
import Vuex from 'vuex'
import LS from '../utils/LocalStorage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SAVE_USER (state, user) {
      console.log(user);
      state.user = user
      //LS.put('user', user)
    }
  },
  getters: {
    user: state => {
      return state.user;
    }
  }
})
