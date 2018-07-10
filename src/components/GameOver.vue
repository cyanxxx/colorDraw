<template lang="html">
  <div id="gameOver">
    <dl class="memberLists">
      <dt>排行榜</dt>
      <dd v-for="(player, index) in scoreList">
        <span class="index">{{ index+1 }}</span>
        <img :src="player.img"></img>
        <span class="name">{{ player.name }}</span>
        <span class="score">{{ player.score }}分</span>
      </dd>
    </dl>
    <dl class="drawLists">
      <dt>看看大家的画作</dt>
      <dd v-for="img in imgLists">
        <img :src="img">
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props:{
    playerLists:Array,
    imgLists:Array
  },
  computed:{
    scoreList(){
      return this.playerLists.sort((u1,u2)=>{
        return u1.score < u2.score
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #gameOver{
    display: inline-block;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding:26px 36px;
    z-index: 50;
    width: 626px;
    .memberLists{
      dd{
        vertical-align: middle;
        position: relative;
        margin-bottom: 16px;
        .index{
          width: 60px;
        }
        .name{
          width: 120px;
        }
        .score{
          position: absolute;
          right:0;
          top:50%;
          transform: translateY(-50%);
        }
        *{
          vertical-align: middle;
          display: inline-block;
        }
      }
      img{
        width: 80px;
        height: 80px;
      }
    }
    .drawLists{
      margin-top: 26px;
      height: 600px;
      overflow: scroll;
      dd{
          background: #fff;
          margin-bottom: 16px;
      }
      img{
        width: 100%;
      }
    }
    dt{
      margin-bottom: 16px;
    }
  }

</style>
