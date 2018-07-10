<template lang="html">
  <div class="color">
    <ul @click="chooseColor($event)">
      <li :style="{background: item}"
          v-for="item in colorList"
          :key="item"
          :id = "item"

      ></li>
      <li :style="{background:newColor}"></li>
    </ul>
    <button class="newColorModal" @click="open = !open">
      add new color
    </button>
    <div id="colorControl" v-show = "open" >
      <div>
        <label for="r">Red</label>
        <input type="range" id="r" v-model="rv" min = 0 max = 255>
      </div>
      <div>
        <label for="g">Green</label>
        <input type="range" id="g" v-model="gv" min = 0 max = 255>
      </div>
      <div>
        <label for="b">Blue</label>
        <input type="range" id="b" v-model="bv" min = 0 max = 255>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return{
      rv:255,
      bv:255,
      gv:255,
      colorList:[ '#000','#F44336', '#E91E63', '#9C27B0', '#2196F3', '#48C6FF', '#4CAF50',
        '#8BC34A', '#FFEB3B', '#FFC107', '#FF9800', '#795548', '#607D8B',
        '#666', '#999', '#BBB', '#DDD'],
      open:false,
    }
  },
  props:{
    lineColor:Object
  },
  computed:{
    newColor() {
      return `rgb(${this.rv},${this.bv},${this.gv})`
    }
  },
  methods:{
    chooseColor(e) {
      var color = e.target.style.background;
      var colorObject = {
        r:0,
        g:0,
        b:0
      };
      if(color){
          var arr = color.match(/\((.*)\)/)[1].split(",").forEach(function(el,index){
            colorObject[Object.keys(colorObject)[index]] = parseInt(el);
          })
          this.$emit('change-color',colorObject)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .color{
    width: 80%;
    ul{
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li{
        flex-basis: 12.5%;
        padding-top: 12.5%;
        margin: 10px;
        height: 0;
        border-radius: 50%;

      }
    }
    .newColorModal{
      background: #4284c2;
      color:#fff;
      text-align: center;
      border: 0;
      width: 100%;
      padding: 10px 26px;
    }
  }
  #colorControl{
    padding: 16px 26px;
    color:#666;
    border-radius: 6px;
    label{
      width: 100px;
      margin-right: 16px;
    }
    input{
      border: 0;
      margin: 0;
    }
    label,input{
      display: inline-block;
      vertical-align:middle;
    }
  }

</style>
