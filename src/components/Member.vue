<template lang="html">
  <div id="member">
    <ul>
      <li v-for="item in lists"
          :key=item.id
          :class="[item.id === currentId ? 'active' : '']"
      >
      <div class="userImg ignore">
        <img :src="item.img" alt="">
        <span class="floatTip" v-show="item.offline">离线</span>    
      </div>
        <p class="ignore">{{ item.name }}</p>
        <p class="ignore">{{ item.score }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import userImg from '../assets/image/1.jpg'
export default {
  data(){
    return{
    }
  },
  props:{
    lists:Array,
    currentId:String
  }
}
</script>

<style lang="scss" scoped>
  li{
    display: inline-block;
    margin-right: 16px;
    &.active{
      img{border: 1px solid #fff;}
    }
    text-align: center;
  }
  img{
    width: 80px;
    height: 80px;
    border:1px solid #4284c2;

  }
  p{
    text-align: center;

  }
  .userImg{
    position: relative;
    display: inline-block;
  }
  .floatTip{
    background: rgba(0,0,0,0.7);
    color:#fff;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    text-align: center;
    line-height: 80px;
  }
  .ignore{
    font-size: 14px;
  }
</style>
