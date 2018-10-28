<template lang="html">
  <div id="tip">
    <div class="content" v-show="open">{{ tip }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tip:"",
      open:true
    }
  },
  methods: {
    msg(s) {
      this.tip = s;
      this.open = true;
    },
    finish() {
      this.open = false;
      this.tip = ""
    }
  }
}
</script>

<style lang="css">
@keyframes shake {
  0%{
    transform: rotate(-3deg) translate(-55%,-10%) ;
  }
  100%{
    transform: rotate(3deg) translate(-45%,10%) ;
  }
}
.content{
  position: fixed;
  display: inline-block;
  text-align: center;
  top: 10%;
  left: 50%;
  /* transform: translateX(-50%); */
  background: rgba(0,0,0,0.5);
  color: #fff;
  padding: 2% 3%;
  border-radius: 10px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.6);
  animation: shake 0.5s infinite alternate cubic-bezier(0,-0.54,1,1.5);
}

</style>
