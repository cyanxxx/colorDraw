<template lang="html">
  <div id="room">
    <my-header class="theme">
      <p class="fl">{{(iscurrentPlay ? '请画:' : '提示:' )}}{{gameData.key}} {{tip}}</p>
      <p class="fr">{{countTime}}</p>
    </my-header>
    <draw :canDraw = "iscurrentPlay" ref="draw"></draw>
    <float-bar class="theme" v-show="currentPlayerTip == 'game' && gameData.currentPlayer.id != user.id">
      <p>轮到:{{gameData.currentPlayer.name}}画</p>
    </float-bar>
    <float-bar class="theme" v-show="gameData.status == 'finish'">
      <p>答案:{{key}}</p>
    </float-bar>
    <game-over class="theme"
               v-show="gameData.status == 'over'"
               :playerLists="lists"
               :imgLists = "imgMap"
     />
     <footer class='bottom'>
       <member class="theme" :lists = "gameData.playerList" :currentId = "gameData.currentPlayer.id"></member>
       <comment :msgData="comMes" @send-msg = "wsMsg" class="comment"></comment>
     </footer>
    <div class="laywer" v-show = "gameData.status == 'over' || gameData.status == 'finish'"></div>
  </div>


</template>

<script>
import {OVER, WAITING} from './utils/constant'
import MyHeader from '../components/MyHeader.vue'
import Member from '../components/Member.vue'
import Comment from '../components/Comment.vue'
import Draw from '../components/Draw.vue'
import FloatBar from '../components/FloatBar.vue'
import GameOver from '../components/GameOver.vue'
import { mapGetters } from 'vuex'

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
          //如果是画家
          this.key = data.key
          this.countTime = data.countTime
          this.playList = data.playerList
          //如果是玩家
          this.key = data.key
          this.countTime = data.countTime
          this.playList = data.playerList
        },
        //有人离线和有人重连回来
        refreshOneStatus(data) {
          //处理离线
          this.playerList = this.playerList.filter((el)=>{
            if(el.id===data.id){
              el.status = data.status
            }
            return el.id !== data.id
          })
          //处理重连
        },
        getGameData(data) {
          this.gameData = data;
          setTimeout(()=>{
            this.currentPlayerTip = 'gaming'
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
      }

    }
  },
  created() {
    var id = this.user.id;
    this.$ws.sendMsg({id},'beginGame')
  },
  methods: {
    wsMsg(data) {
      this.$ws.sendMsg(data, 'checkAnswer')
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
