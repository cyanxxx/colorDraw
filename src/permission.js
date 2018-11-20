import Vue from 'vue'
import router from './router'
import store from './store'
import LS from './utils/LocalStorage'
import webSocketSerive from './webSocketSerive'
import bar from './bar'
import tip from './tip'
router.beforeEach((to, from, next) => {
  bar.on()
  tip.msg('加载中...')
  if(Vue.prototype.$ws){
    next()
  }else{
    Vue.prototype.$ws = new webSocketSerive({
      open() {
        var user = store.getters.user
        this.request(user,'login').then((data) => {
          //已经过期了，返回新的id
          if(data.id){
            store.commit('SAVE_USER',data);
            next({path:'/'})
          }else{
            //没过期返回状态
            if(data.inGame){
              next({path: '/room', params: {id: data.roomId}})
            }
            //没在游戏中返回到大厅
            next({path:'/'})
          }
        })
      }
    });
  }
})
router.afterEach((to, from, next) => {
  bar.off()
  tip.finish()
})
