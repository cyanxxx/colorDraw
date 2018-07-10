<template lang="html">
  <div id="member">
    <ul>
      <li v-for="item in lists"
          :key=item.id
          :class="[item.id === currentId ? 'active' : '']"
      >
        <img :src="item.img" alt="">
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
  }
  img{
    width: 80px;
    height: 80px;
    border:1px solid #4284c2;

  }
  p{
    text-align: center;

  }
  .ignore{
    font-size: 14px;
  }
</style>
