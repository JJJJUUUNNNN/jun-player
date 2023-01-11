<script setup>
import { ref,computed ,provide} from 'vue'
import faith from '../assets/faith.jpg'
import summer from '../assets/summer.jpg'
import myBeauty from '../assets/myBeauty.jpg'

import loop from '../assets/icon/list-loop.png'
import single from '../assets/icon/single-play.png'
import random from '../assets/icon/random-play.png'

import { PlayerCore } from '../PlayerCore';
import PlayerControl from './PlayerControl.vue'
import MusicList from './PlayList.vue'

const playerCore = new PlayerCore({
  playList: [
    {name:'勾指起誓言',author:'洛天依',duration:'3:03',cover:faith},
    {name:'盛夏的果实',author:'莫文蔚',duration:'4:10',cover:summer},
    {name:'我的美丽',author:'小霞',duration:'5:08',cover:myBeauty}
  ]
})
const currentSong = computed(()=>playerCore.currentSong)
const state=computed(()=>playerCore.playerState)
const currentTime=computed(()=>playerCore.currentTime)
const progressMax=computed(()=>playerCore.progressMax)

const modeList=ref([loop,single,random])
const modeListIndex=ref(0)
const currentMode=computed(()=>{
  return modeList.value[modeListIndex.value]
})

const isShow=ref(false)
const coverRef=ref(null)

function addZero(val){
  return val>=10?''+val:'0'+val
}
const currentTimeFormat = computed(()=> {
  const min = Math.floor(currentTime.value/60)
  const sec = parseInt(currentTime.value % 60)

  return `${min}:${addZero(sec)}`
})

function toggleList(){
  isShow.value=!isShow.value
}
function handleMode(){
  if((modeListIndex.value+1)==(modeList.value.length)){
    modeListIndex.value=0
  }else{
    modeListIndex.value++
  }
}

provide('playerCore',playerCore)

</script>

<template>
  <div class="player">
      <img ref="coverRef" :class="{
        animation: state.value == 'pause'
      }" class="cover" :src="currentSong.cover">
      <h3 class="song-name">{{currentSong.name}}</h3>
        <PlayerControl />
      <div class="play-info">
        <button class="player-mode-btn" @click="handleMode">
          <img style="width: 25px; height: 25px;" :src="currentMode" alt="">
        </button>
        <div class="progress">
          <label class="duration" for="music-progress">{{currentTimeFormat}}/{{currentSong.duration}}</label>
          <progress id="music-progress" :max="progressMax" :value="currentTime"></progress>
          <div id="probnt" class="progress_btn"></div>
        </div>
        <button class="list" @click="toggleList">
          <img style="width: 25px; height: 25px;" src="../assets/icon/music-list.png" alt="音乐列表">
        </button>
      </div>
      
    </div>

    <MusicList v-if="isShow" />
</template>

<style >
@keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
  }
  .player{
    padding: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 3px solid #FF9433;
    margin-bottom: 10px;
  }
  
  .cover{
    width: 90px;
    height: 90px;
    position: absolute;
    border-radius: 50%;
    top: -50px;
    left: 15px;
    border: 3px solid #FF9433;
  }

  .song-name{
    position: absolute;
    top: -50px;
    left: 120px;
    font-size: 18px;
    font-weight: 400;
  }

  .animation{
    animation: rotation 20s linear infinite;
  }

  .player-control{
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-left: 167px;
    box-sizing: border-box;
    padding-right: 10px;
  }
  
  .play-info{
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }
  button{
    border: none;
    background: none;
    cursor: pointer;
  }
  button img{
    width: 30px;
    height: 30px;
  }
  .progress{
    width: 250px;
    position: relative;
  }
  .progress progress{
    width: 100%;
  }
  .duration{
    font-size: 10px;
    position: absolute;
    top: -18px;
    left: 0;
  }
  .progress_btn {
        width: 12px;
        height: 12px;
        background: #ffffff;
        border: 1px solid #ccc;
        box-shadow: 0 0 5px 0 #000 0.27;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        cursor: pointer;
      }
</style>
