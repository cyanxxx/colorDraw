<template lang="html">
  <div id="room">
    <my-header class="theme" ref="header">
      <p class="fl">{{(iscurrentPlay ? '请画:' : '提示:' )}}{{gameData.key}} {{tip}}</p>
      <p class="fr">{{countTime}}</p>
    </my-header>
    <draw :canDraw = "iscurrentPlay" ref="draw" :height="canvasHeight"></draw>
    <float-bar class="theme" v-show="!currentPlayerTip && !iscurrentPlay && gameData.status == ROUND_START">
      <p>轮到:{{gameData.currentPlayer.name}}画</p>
    </float-bar>
    <float-bar class="theme" v-show="gameData.status == ROUND_FINISH">
      <p>答案:{{key}}</p>
    </float-bar>
    <game-over class="theme"
               v-show="gameData.status == GAME_OVER"
               :playerLists="lists"
               :imgLists = "imgMap"
               @back-to-lobby="backToLobby"
     />
    <footer class='bottom' ref="btm">
       <member class="theme" :lists = "gameData.playerList" :currentId = "gameData.currentPlayer.id"></member>
       <comment :msgData="comMes" @send-msg = "wsMsg" @empty-msg="emptyMsg" class="comment"></comment>
     </footer>
    <div class="laywer" v-show = "gameData.status == GAME_OVER || gameData.status == ROUND_FINISH"></div>
  </div>


</template>

<script>
import {GAME_OVER, ROUND_FINISH, ROUND_START, USER_RECONNECT, USER_LEAVING} from '@/utils/constant'
import MyHeader from '../components/MyHeader.vue'
import Member from '../components/Member.vue'
import Comment from '../components/Comment.vue'
import Draw from '../components/Draw.vue'
import FloatBar from '../components/FloatBar.vue'
import GameOver from '../components/GameOver.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components:{
    Member,
    Comment,
    Draw,
    MyHeader,
    FloatBar,
    GameOver
  },

  data() {
    return {
      comMes: [],
      key: "",
      tip: "",
      gameData:{
        currentPlayer:{
          name:"",
          id:"",
          img:"",
          score:0
        },
        status:'',
        playerList:[],
        key:''
      },
      currentPlayerTip:false,
      imgMap:[],
      countTime:60,
      canvasHeight:0,
      GAME_OVER: GAME_OVER,
      ROUND_START: ROUND_START,
      ROUND_FINISH: ROUND_FINISH,
      lists:[], //总分排名
      socketEvents:{
        timeOut(time) {
          this.countTime = time;
        },
        getKey(data) {
          this.key = data;
        },
        getTip(data) {
          this.tip = data;
        },
        getcomMes(data) {
          this.comMes.push(data);
        },
        reconnect(data) {
          this.gameData = data
        },
        changeUserStatus(data) {
          this.CHANGE_USER_STATUS(data)
        },
        //有人离线和有人重连回来
        refreshOneStatus(data) {
          if(data.type === USER_RECONNECT){
            this.gameData.playerList[data.userIndex].offline = false
          }else if(data.type === USER_LEAVING){
            this.gameData.playerList[data.userIndex].offline = true
          }
        },
        getGameData(data) {
          this.gameData = data;
          this.$nextTick(()=>{
            this.canvasHeight = window.innerHeight - this.$refs.btm.offsetHeight -this.$refs.header.$el.offsetHeight
            console.log( window.innerHeight ,this.$refs.btm.offsetHeight ,this.$refs.header.$el.offsetHeight)
          })
          setTimeout(()=>{
            this.currentPlayerTip = true
          },3 * 1000);
        },
        gameOver(data) {
          this.gameData.status = data.status;
          this.imgMap = data.roundImgs;
          this.lists = data.playerList;
        },
        roundFinish(data) {
          this.key = data.key;
          this.gameData.status = data.status;
          this.$refs.draw.saveRoundImg();
          this.$refs.draw.reset();
          this.tip = "";
          this.currentPlayerTip = false;
        },
        getScore(data){
          this.gameData.playerList.forEach((user) => {
            if(user.id == this.gameData.currentPlayer.id){
              user.score = data.drawerScore;
            }else if(user.id == data.ans.id){
              user.score = data.ans.score
            }
          })
        }
      }
    }
  },
  computed:{
    ...mapGetters(['user']),
    iscurrentPlay() {
      if(this.gameData.currentPlayer){
        return this.user.id == this.gameData.currentPlayer.id
      }else{
        return false
      }
    }
  },
  created() {
    var id = this.user.id;
    this.$ws.sendMsg({id},'beginGame')
  },
  methods: {
    ...mapMutations(['CHANGE_USER_STATUS']),
    wsMsg(data) {
      this.$ws.sendMsg(data, 'checkAnswer')
    },
    emptyMsg() {
      this.comMes = [];
    },
    backToLobby() {
      this.$router.push({name:'lobby'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .theme{
    background: #4284c2;
    color:#fff;
    padding:16px;
  }
  .bottom{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .laywer{
    background: rgba(0,0,0,0.6);
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
</style>
