<template lang="html">
  <div id="comment" class="clearFix">
    <div class="showmsg ignore" ref="msgLists">
      <span class="msg" v-for="msg in msgData">
        {{ msg }}
      </span>
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
      aniamted: false,
      aniName: 'active'
    }
  },
  watch:{
    // msgBox:{
    //   handler(){
    //     if(this.msgBox.length){
    //       this.initAnim()
    //     }
    //   },
    // }   1 0   2 1  3 2      3 - 2 = 1
    msgData:function(newVal, oldVal){
      console.log(newVal)
      if(newVal.length > 0){
        this.$nextTick(()=>{
          var domArr = Array.prototype.slice.call(this.$refs.msgLists.children);
          this.initAnim(domArr)
        })
        
      }
    }
  },
  props:{
    msgData:{
      type:Array
    }
  },
  mounted() {
    // var domArr = Array.prototype.slice.call(this.$refs.msgLists.children);
    // this.initAnim(domArr)
  },
  methods:{
    //1.新增数据加样式  2  3
    //2.删去dom节点
    initAnim(domArr) {
      console.log(domArr)
      domArr.forEach((el, i )=>{
        el.classList.add('active')
        el.style.animationDelay = i*2 +'s'
        if(i===domArr.length-1){
          el.addEventListener('webkitAnimationEnd',()=>{
            this.$emit('empty-msg');
          })
        }
      })
    },
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
  padding-top: 16px;
}
.ignore{
  font-size: 14px;
}
  .showmsg{
    padding-bottom: 10px;
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
    position: absolute;
    display: inline-block;
    color:#4284c2;
    &.active{
      animation: scroll 5s linear;
    }
  }
  @keyframes scroll{
    from {transform: translateX(100vw);opacity: 1;}
    to {transform: translateX(-100%);opacity: 1;}
  }
</style>
