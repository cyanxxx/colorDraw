import Vue from 'vue'
import ProgressImg from './components/ProgressImg.vue'

const bar = Vue.prototype.$bar = new Vue(ProgressImg).$mount()
//挂载在body
document.body.appendChild(bar.$el);

export default bar;
