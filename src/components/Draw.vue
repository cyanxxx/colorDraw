<template lang="html">
  <div id="draw">
    <canvas ref="canvas"
            v-if = "canDraw"
            @touchstart = "doAction('start', $event)"
            @touchmove = "doAction('move', $event)"
            @touchend = "doAction('end')"
            class = "canvas ignore"
    />
    <canvas v-else class = "canvas ignore" ref="canvas"></canvas>
    <tool :lineWidth = "lineWidth"
          :lineColor ="lineColor"
          :canBackward ="canBackward"
          :canForward ="canForward"
          @change-line = "changeLW"
          @change-color = "changeCL"
          @reset = "doAction('reset')"
          @forward = "doAction('forward')"
          @backward = "doAction('backward')"
          class = "tool"
          v-if = "canDraw"
    />
  </div>

</template>

<script>
import Tool from './Tool.vue'

export default {
  components: {
    Tool
  },
  data() {
    return {
      lineWidth:2,
      lineColor:{
        r:0,
        g:0,
        b:0
      },
      startPos:{
        x: 0,
        y: 0
      },
      endPos:{
        x: 0,
        y: 0
      },
      socketEvents:{
        getCanvas(data) {
          this.lineWidth = data.lineWidth;
          this.lineColor = data.lineColor;
          this[data.type](data.pos);
        },
        reset() {
          this.reset();
        },
        drawImage(data) {
          this.drawImage(data);
        }
      },
      ctx:null,
      left:0,
      top:0,
      width:0,
      canvas:null,
      historyArr:[],
      historyIndex:-1,
      repaint:false
    }
  },
  props:{
    canDraw:Boolean,
    height: Number
  },
  mounted() {
    this.$nextTick(()=>{
       this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.width = document.body.clientWidth;
      // this.height = this.canvas.parentElement.clientHeight;
      
      this.canvas.width = this.width;
      this.left = this.canvas.getBoundingClientRect().left;
      this.top = this.canvas.getBoundingClientRect().top;
      this.saveData();
    })
   
  },
  watch:{
    historyIndex () {
      let data = this.historyArr[this.historyIndex]
      //调用前进后退才会进入
      if(this.repaint){
        if (data) {
          this.drawImage({dataUrl: data})
          this.sendImage(data)
        }
        this.repaint = false;
      }
    },
    height (val) {
      if(val > 0){
        this.canvas.height = this.height;
      }
    }
  },
  computed:{
    canBackward() {
      return this.historyIndex > 0;
    },
    canForward() {
      return this.historyIndex < this.historyArr.length - 1;
    }

  },
  methods:{
    start({x,y}) {
      this.ctx.beginPath();
      this.startPos.x = x;
      this.startPos.y = y;
      this.ctx.moveTo(this.startPos.x,this.startPos.y);
    },
    move({x,y}) {
      this.ctx.lineWidth  = this.lineWidth;
      this.ctx.strokeStyle  = `rgb(${this.lineColor.r},${this.lineColor.g},${this.lineColor.b})`;
      this.endPos.x = x;
      this.endPos.y = y;
      this.ctx.lineTo(this.endPos.x,this.endPos.y);
      this.ctx.stroke();
    },
    end() {
      this.saveData();
    },
    getPoint(e){
      var pos = e.touches[0];
      return{
        x:pos.clientX - this.left,
        y:pos.clientY - this.top
      }
    },
    draw(type, $event){
      var pos = this.getPoint($event);
      this[type](pos);
      this.$ws.sendMsg({type, pos,
                        lineColor:this.lineColor,
                        lineWidth:this.lineWidth},'canvas')
    },
    doAction(type, $event){
      switch(type){
        case 'start':
        case 'move':
          this.draw(type, $event);
          console.log("s")
          break;
        case 'end':
          this.end();
          break;
        case 'reset':
          this.reset();
          this.$ws.sendMsg({},'reset');
          break;
        case 'backward':
          this.backward();
          this.repaint = true;
          break;
        case 'forward':
          this.forward();
          this.repaint = true;
          break;
      }
    },
    changeLW(val) {
      this.lineWidth = val;
    },
    changeCL(val){
      this.lineColor = val;
    },
    reset() {
      this.clearImg();
      this.historyIndex = -1;
      this.saveData();
    },
    clearImg() {
      this.ctx.clearRect(0, 0, this.width, this.height)
    },
    backward() {
      this.canBackward && this.historyIndex--;
    },
    forward() {
      this.canForward && this.historyIndex++;
    },
    saveData() {
      this.historyArr.splice(this.historyIndex + 1, this.historyArr.length)
      this.historyArr.push(this.canvas.toDataURL())
      this.historyIndex = this.historyArr.length - 1
    },
    drawImage(data) {
      var img = new window.Image()
      img.onload = () => {
        this.clearImg()
        this.ctx.drawImage(img, 0, 0)
      }
      img.src = data.dataUrl
    },
    saveRoundImg() {
      this.canDraw && this.$ws.sendMsg({
       dataUrl: this.historyArr[this.historyIndex]
     }, 'sendImg')
    },
    sendImage (data) {
      this.canDraw && this.$ws.sendMsg({
        dataUrl: data
      }, 'drawImage')
    },
  }
}
</script>

<style lang="scss">
#draw{
  position: relative;
  font-size: 0;
  .tool{
    position: absolute;
    padding: 16px;
    bottom:0;
  }
}

</style>
