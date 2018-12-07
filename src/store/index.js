import Vue from 'vue'
import Vuex from 'vuex'
import LS from '../utils/LocalStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: LS.getUser() || null,
    canAction: true
  },
  mutations: {
    SAVE_USER (state, user) {
      // console.log(user)
      state.user = user
      LS.saveUser(user)
    },
    CHANGE_USER_STATUS (state, data){
      if(data.roomId)state.user.roomId = data.roomId
      state.user.status = data.status
    },
    CHANGE_ACTION_STATUS(state, status){
      state.canAction = status;
    }
  },
  getters: {
    user: state => {
      LS.saveUser(state.user)
      return state.user
    },
    canAction: state => {
      return state.canAction
    }
  }
})
