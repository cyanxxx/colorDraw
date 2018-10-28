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
        this.request({},'login').then((data) => {
          if(data.status){
            LS.clearUser()
            store.commit('SAVE_USER',data);
            next();
          }else{
            if(data.status === 'gaming'){
              next({name: 'room', params: {id: data.roomId}})
            }
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
