import Vue from 'vue'
import Tip from './components/Tip.vue'

const tip = Vue.prototype.$tip = new Vue(Tip).$mount()
//挂载在body
document.body.appendChild(tip.$el);

export default tip;
