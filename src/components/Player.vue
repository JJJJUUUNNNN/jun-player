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
import PlayList from './PlayList.vue'
import PlayerProgress from './PlayerProgress.vue'
import PlayerTitle from './PlayerTitle.vue'

const playerCore = new PlayerCore({
  playList: [
    {name:'勾指起誓言',author:'洛天依',duration:'3:03',cover:faith},
    {name:'盛夏的果实',author:'莫文蔚',duration:'4:10',cover:summer},
    {name:'我的美丽',author:'小霞',duration:'5:08',cover:myBeauty}
  ]
})


const modeList=ref([loop,single,random])
const modeListIndex=ref(0)
const currentMode=computed(()=>{
  return modeList.value[modeListIndex.value]
})
const isShow=ref(false)

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
      <PlayerTitle />
      <PlayerControl />
      <div class="play-info">
        <button class="player-mode-btn" @click="handleMode">
          <img style="width: 25px; height: 25px;" :src="currentMode" alt="">
        </button>
        
        <PlayerProgress />

        <button class="list" @click="toggleList">
          <img style="width: 25px; height: 25px;" src="../assets/icon/music-list.png" alt="音乐列表">
        </button>
      </div>
    </div>
    <PlayList v-if="isShow" />
</template>

<style >
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
    user-select: none;
  }
  
  button img{
    width: 30px;
    height: 30px;
  }
</style>
