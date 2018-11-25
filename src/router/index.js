import Vue from 'vue'
import Router from 'vue-router'
import Room from '../views/Room.vue'
import OfflineRoom from '../views/OfflineRoom.vue'
import Main from '../views/Main.vue'
import store from '../store'
import { USER_GAMING } from '../utils/constant'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name: 'lobby',
      component:Main
    },
    {
      path:'/room:id',
      name:"room",
      component:Room,
      //开始游戏
      beforeEnter: (to, from, next)=>{
        console.log(store.getters.user.status)
        if (store.getters.user.status === USER_GAMING) {
          console.log('?')
          next()
        }else{
          next({path:'/'})
        }
      }
    },
    {
      path:'/offlineRoom:id',
      name:"offlineRoom",
      component:OfflineRoom,
    }
  ]
})
