<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import gobal from './assets/gobal.scss'
export default {
  name: 'App',
  mounted() {
    document.addEventListener('visibilitychange', ()=>{
    var isHidden = document.hidden;
    if (isHidden) {
      console.log('hidden')
     this.$ws.sendMsg(null,'close')
    } else {
     location.reload();
    }
    });
  }
}
</script>

<style lang="scss" scoped>
  #app{
    height: 100%;
  }
</style>
