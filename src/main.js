// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import permission from './permission'


Vue.config.productionTip = false


FastClick.attach(document.body);
Vue.mixin({
  created () {
    const events = this.$data.socketEvents;
    if (events) {
      Object.keys(events).forEach(k => {
        this.$ws.on(k, events[k].bind(this))
      })
    }
  },
  beforeDestory () {
    const events = this.socketEvents
    if (events) {
      Object.keys(events).forEach(k => {
        this.$ws.off(k, events[k].bind(this))
      })
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
