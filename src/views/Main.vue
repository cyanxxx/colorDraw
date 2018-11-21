<template lang="html">
  <div id="entry">
    <my-header class="blue">
      <!-- <p>房间号：{{roomLists.roomId}}</p> -->
      <p>用户名：{{userName}}</p>
    </my-header>
    <div class="room"
         @touchstart="doAction('start', $event)"
         @touchmove ="doAction('move', $event)"
         @touchend = "doAction('end', $event)" >
      <div class="container clearFix" ref="roomBox">
        <circle-room v-if = "roomLists.length>0" v-for="(room, index) in roomLists" :key="room.id" class="circle" :class="theme[index]" :room="room" @join-room='join'></circle-room>
      </div>
    </div>
  </div>
</template>

<script>
import CircleRoom from '../components/Circle'
import MyHeader from '../components/MyHeader'
import { mapGetters, mapMutations } from 'vuex';
import { FREE } from '@/utils/constant'
export default {
  components:{
    CircleRoom,
    MyHeader
  },
  data() {
    return{
      socketEvents:{
        newUserJoin(data) {
        console.log(data.roomId, data.userData.id)
        //新增的那个人数据，如果是同id就改状态，都会放入用户列表
        this.roomLists.forEach((room) =>{
          if(this.user.id == data.userData.id && room.roomId == data.roomId){
              //直接改状态
              console.log(data.roomId)
              this.$store.commit('CHANGE_USER_STATUS',{status: data.userData.status,roomId: data.roomId})
              room.userList.push(this.user)
            }
          else if(room.roomId == data.roomId){
            //加入新成员
            room.userList.push(data.userData)
            console.log(room.userList)
            //添加用户数据
            
          }
        })
        },
        sbLeaveRoom(data) {
          this.roomLists[data.roomIndex].userList.splice(data.userIndex,1);
        },
        startGame(data) {
          this.$router.replace({name:'room',params:{id:data.roomId}})
        },
        exitRoom(data) {
          this.CHANGE_USER_STATUS({atatus: FREE})
        },
        changeUserStatus(data) {
          this.CHANGE_USER_STATUS(data)
        }
      },
      roomLists:[],
      startPos:{},
      endPos:{},
      minPos: 30,
      maxTime: 500,
      startTime:null,
      endTime:null,
      left:null,
      theme: ['green' ,'blue', 'red']
    }
  },
  created() {
    this.$bar.on();
    this.$tip.msg('获取房间中...')
    //加载
      this.$ws.request({},'getRoomData').then((data) => {
        this.roomLists = data;
        this.getLeft();
        this.$bar.off();
        this.$tip.finish()
      });
  },
  computed:{
    ...mapGetters(['user']),
    userName() {
      return this.user && this.user.name;
    }
  },
  methods:{
    ...mapMutations(['CHANGE_USER_STATUS']),
    getUserRoom() {

    },
    join(roomId) {
      this.$ws.sendMsg({roomId},'join');
    },
    getLeft() {
      var el = this.$refs.roomBox;
      var left = parseFloat(window.getComputedStyle(el).left);
      console.log(left)
      this.left = left;
      this.$refs.roomBox.style.left = 0 + 'px';
    },
    getPos(e) {
      var pos = e.touches[0]
      return {x: pos.clientX, y: pos.clientY}
    },
    getDistance(bp, ap){
      var x = ap.x - bp.x;
      var y = ap.y - bp.y;
      return Math.sqrt( x * x + y * y );
    },
    getDirection(bp,ap){
      var x = ap.x - bp.x;
      var y = ap.y - bp.y;
      var angel = Math.atan2(y,x) * 180 /Math.PI;
      if(angel >= -45 && angel <= 45){
        return 'right'
      }else if(angel >= 135 || angel <= -135){
        return 'left'
      }
    },
    translateRoom(type){
      var left = parseFloat(this.$refs.roomBox.style.left);
      switch(type){
        case 'left':
          this.$refs.roomBox.style.left = left + this.left +'px'
          break;
        case  'right':
          this.$refs.roomBox.style.left = left - this.left +'px'
          break;
      }
    },
    doAction(type, $event){
      switch(type){
        case 'start':
          this.startPos = this.getPos($event);
          this.startTime = Date.now();
          break;
        case 'move':
          this.endPos = this.getPos($event);
          break;
        case 'end':
          this.endTime = Date.now();
          if(this.endTime - this.startTime > this.maxTime || !this.endPos || this.getDistance(this.startPos, this.endPos) < this.minPos)return
          this.translateRoom(this.getDirection(this.startPos, this.endPos))
          this.startPos = null;
          this.endPos = null;
          break;
      }

    }
  }
}
</script>

<style lang="scss" scoped>
$width:640px;
$left: 27px;
$spacing:55px;
#entry{
  height: 100%;
  .room{
    height: calc(100% - 80px);
  }
}
.room{
position: relative;
overflow: hidden;
height: 640px;
  .container{
    position: relative;
    top:50%;
    transform: translateY(-50%);
    width:( $width + $left ) * 3 + $left;
    padding-left: $left;
    left: -($left * 2 + $width -$left);
    .circle{
      float:left;
      margin-left: $left;
    }
  }
}



</style>
