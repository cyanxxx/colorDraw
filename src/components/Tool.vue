<template lang="html">
  <div id="tool" class="clearFix">
    <button class="colorBtn" :style='{background:currentColor}' @click = "open = true"></button>
    <input class="lineChoose" type="range"
            v-model="line"
            min = 1
            max = 15
    />
    <div class="btnGroup">
      <div class="icon iconfont icon-houtui ignore" :class="{active:canBackward}" @click="backward"></div>
      <div class="icon iconfont icon-qianjin ignore" :class="{active:canForward}" @click="forward"></div>
      <div class="icon iconfont icon-lajixiang1 ignore" @click="reset"></div>
    </div>
    <div class="layer" v-show = "open" @click.self="open = false">
      <color-control class="modal"
                     :lineColor.sync="lineColor" 
                     @change-color="change"
      />
    </div>
  </div>

</template>

<script>
import ColorControl from './ColorControl.vue'
import '../assets/iconfont.css'
export default {
  components:{
    ColorControl
  },
  data(){
    return{
      line:2,
      open:false
    }
  },
  props: {
    lineWidth:Number,
    lineColor:Object,
    canBackward:Boolean,
    canForward:Boolean,
  },
  computed: {
    currentColor() {
      return `rgb(${this.lineColor.r},${this.lineColor.g},${this.lineColor.b})`
    }
  },
  watch:{
    line() {
      this.$emit('change-line',parseInt(this.line))
    }
  },
  methods: {
    change(val) {
      this.$emit('change-color',val)
    },
    backward() {
      this.$emit('backward')
    },
    forward() {
      this.$emit('forward')
    },
    reset() {
      this.$emit('reset');
    }
  }
}
</script>

<style lang="scss" scoped>
  .colorBtn{
    width:82px;
    height:82px;
    border-radius: 50%;
    border: 0;
    vertical-align: middle;
  }
  #tool{
    width: 100%;
  }
  .lineChoose{
    vertical-align: middle;
    margin-left: 16px;
  }
  .btnGroup{
    float: right;
    line-height: 82px;
  }
  .icon{
    display: inline-block;
    vertical-align: middle;
    color:rgb(196,196,196);
    &.active{
      color:#4284c2;
    }
  }
  .ignore{
    font-size:20px;
    padding: 0 6px;
  }
  .layer{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    top:0;
    left: 0;
    .modal{
      position: absolute;
      top: 50%;
      left:50%;
      transform: translate(-50%, -50%);
      margin-bottom: 20px;
      background: #fff;
      border-radius: 10px;
      padding: 16px;
    }
  }



</style>
