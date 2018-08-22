<template lang="html">
  <div class="lawyer" :style="{'display': show ? 'block' : 'none'}">
    <img src="../assets/image/loading.gif" alt="loading">
  </div>
</template>

<script>
export default {
  data(){
    return{
      show:false
    }
  },
  methods:{
    on() {
      this.show = true;
    },
    off() {
      this.show = false;
    }
  }
}
</script>

<style lang="scss">
  .lawyer{
    position: absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.75);
    text-align: center;
    img{
      position: relative;
      top:50%;
      transform: translateY(-50%);
      width: 300px;
    }
  }
</style>
