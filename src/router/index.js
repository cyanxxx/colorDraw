import Vue from 'vue'
import Router from 'vue-router'
import Room from '../views/Room.vue'
import Main from '../views/Main.vue'

Vue.use(Router)

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
      component:Room
    }
  ]
})
