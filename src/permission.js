import Vue from 'vue'
import router from './router'
import store from './store'
import webSocketSerive from './webSocketSerive'
import bar from './bar'
import tip from './tip'

router.beforeEach((to, from, next) => {
  bar.on()
  tip.msg('加载中...')
  if(Vue.prototype.$ws){
    next()
  }else{
    Vue.prototype.$ws = new webSocketSerive();
    next()
  }
})
router.afterEach((to, from, next) => {
  bar.off()
  tip.finish()
})
