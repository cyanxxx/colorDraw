<template lang="html">
  <div id="comment" class="clearFix">
    <div class="showmsg ignore" ref="msgLists">
      <p class="msg" v-for="msg in msgBox">
        {{ msg }}
      </p>
    </div>
    <div class="clearFix sendMsg">
      <input type="text" v-model="text">
      <button type="button" @click="send(text)">发送</button>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      text:"",
    }
  },
  watch:{
    msgBox:{
      handler(){
        if(this.msgBox.length){
          this.$nextTick(()=>{
            console.log(this.$refs.msgLists.firstElementChild)
            this.$refs.msgLists.firstElementChild.classList.add("active");
            setTimeout(()=>{
              this.msgBox.pop();
            },5000)
          })
        }
      },
    }
  },
  props:{
    msgBox:{
      type:Array
    }
  },
  methods:{
    send(msg) {
      this.text = "";
      var data = {
        ans:msg
      }
      this.$emit('send-msg',data)
    }
  },
}
</script>

<style lang="scss" scoped>
#comment{
  background: #fff;
  margin-top: 16px;
}
.ignore{
  font-size: 14px;
}
  .showmsg{
    margin-bottom: 10px;
    background: #fff;
    color:#000;
    height: 44px;
  }
  input{
    background: #fff;
    width: 600px;
    border:0;
    outline: 0;
    float: left;
    text-indent: 10px;
    line-height: 58px;
    padding: 0;
  }
  button{
    background: #4284c2;
    color:#fff;
    float: left;
    border:0;
    line-height: 58px;
    margin-left: 16px;
    vertical-align: middle;
    text-align: center;
    border-radius: 6px;
    padding: 0 16px;
  }
  .sendMsg{
    background: #4284c2;
    padding:10px 16px;
  }
  .msg{
    opacity: 0;
    display: inline-block;
    color:#4284c2;
    &.active{
      animation: scroll 5s linear;
    }
  }
  @keyframes scroll{
    from {transform: translateX(750px);opacity: 1;}
    to {transform: translateX(-100%);opacity: 1;}
  }
</style>
