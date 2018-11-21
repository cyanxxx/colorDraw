<template lang="html">
  <div id="circle" ref="c">
    <div class="middle">
      <p>{{room.userList.length}}</p>
      <button type="button" :class="{disable: !canStart}" :disabled="!canStart" @click="gotoRoom">
        START
      </button>
      <button type="button" :class="{disable: !canJoin}" :disabled="!canJoin" @click="join">
        JOIN
      </button>
      <button type="button" :class="{disable: !canExit}" :disabled="!canExit" @click="exit">
        EXIT
      </button>
    </div>
    <div class="userInfo spin"
         v-for = "(user, index) in room.userList">
      <img :src="user.img" class="small" >
      <p class="ignore">{{user.name}}</p>
    </div>

  </div>
</template>

<script>
import {FREE, GAMING, LEAVING} from '../utils/constant'
export default {
  data() {
    return{
      circleR:0
    }
  },
  computed:{
    user() {
      return this.$store.getters.user;
    },
    canStart() {
      //当前房号跟用户所在房间符合
      console.log(!!this.user,!!(this.user.roomId == this.room.roomId),!!(this.room.userList.length >1))
      return this.user && this.user.roomId == this.room.roomId && this.room.userList.length >1;
    },
    canJoin() {
      return this.user && this.user.status == FREE
    },
    canExit() {
      return this.user && this.user.roomId == this.room.roomId;
    },
    length() {
      //样式处理
      return this.room.userList.length;
    }
  },
  watch:{
    length:{
      handler: function(){
        this.$nextTick(function(){
        var arr = Array.prototype.slice.call(document.querySelectorAll('.userInfo'));
        var len = arr.length;
        console.log(arr);
        var r = this.circleR;
        arr.forEach(function(el,i) {
          //translate(-50%,-50%)
          el.style.transform = `translate(-50%,-50%) rotate(${360/len*(i+1)}deg) translateY(-121px) rotate(${-360/len*(i+1)}deg)`;
          //console.log(`translate(-50%,-50%) rotate(${360/len*i}deg) translateY(-121px) rotate(${360/len*i}deg)`)
            console.log(el.style.transform);//rotate(360/${len}*${i})
        })
      })
    },
    immediate: true

    }
  },
  props:{
    room:{
      type:Object,
      default(){
        return {
          roomId:null,
          userList:[],
          status:FREE
        }
      }
    },
  },
  mounted() {
    this.circleR = this.$refs.c.offsetWidth / 2;
  },
  methods:{
    gotoRoom() {
      this.$ws.sendMsg({}, 'startGame')
    },
    join() {
      this.$emit('join-room',this.room.roomId)
      
    },
    exit() {
      this.$ws.sendMsg({},'exitRoom');
    }
  }

}
</script>

<style lang="scss" scoped>
  $width:600px;
  $r: $width / 2;
  $img-width:100px;
  // @for $i from 1 through 8 {
  //
  //   @keyframes spin-#{$i} {
  //     from {
  //   		transform: rotate(0deg)
  //   		           translateY(-$r) translateY(50%)
  //   		           rotate(360deg)
  //   	}
  //   	to {
  //   		transform: rotate($i * 45deg)
  //   		           translateY(-$r) translateY(50%)
  //   		           rotate(360deg -$i * 45deg);
  //   	}
  //   }
  //   .spin-#{$i} {
  //     animation:spin-#{$i} 3s linear;
  //     animation-fill-mode: forwards;
  //   }
  // }

  #circle{
    width: $width;
    height: $width;
    border-radius: 50%;
    position: relative;
    box-sizing: content-box;
    padding:20px;
    color:#fff;
    .middle{
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      text-align: center;
      p{
        margin:0;
        margin-top: 10px;
      }
    }
    .userInfo{
      display: block;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      width:100px;
      text-align: center;
      transition: transform 1s linear;
      .small{
        display: block;
        width:100px;
        height: 100px;
        border-radius: 50%;
      }
      .ignore{
        font-size: 14px;
      }
      p{
        display: inline-block;
        margin: 0;
        margin-top: 10px;
      }
    }
    .other{
      margin-top: -$img-width - 55;
    }
  }
  button{
    width: 100%;
    background: transparent;
    border: 0;
    outline: 0;
    text-align: center;
    display: inline-block;
    color:#fff;
    font-weight: bold;
    margin-bottom: 16px;
    &.disable{
      color:#bababa;
    }
  }

  // @keyframes spin {
	// from {
	// 	transform: rotate(0deg)
	// 	           translateY(-$r) translateY(50%)
	// 	           rotate(360deg)
	// }
	// to {
	// 	transform: rotate(360deg)
	// 	           translateY(-$r) translateY(50%)
	// 	           rotate(0deg);
	// }
//}
</style>
