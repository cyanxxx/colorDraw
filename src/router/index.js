import Vue from 'vue'
import Router from 'vue-router'
import Room from '../views/Room.vue'
import OfflineRoom from '../views/OfflineRoom.vue'
import Main from '../views/Main.vue'
import store from '../store'
import {GAMING} from '../utils/constant'

Vue.use(Router)
var test = true
export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      component:Main
    },
    {
      path:'/room:id',
      name:"room",
      component:Room,
      //开始游戏
      beforeEnter: (to, from, next)=>{
        if(store.getters.status === 'GAMING' || test){
          next()
        }else{
          next({path:"/"})
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
