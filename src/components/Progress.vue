<script setup>
import { computed,inject,ref  } from 'vue';

const playerCore = inject('playerCore')
const progressMax=computed(()=>playerCore.progressMax)
const currentSong = computed(()=>playerCore.currentSong)
const currentTime=computed(()=>playerCore.currentTime)
const state=computed(()=>playerCore.playerState)

function addZero(val){
  return val>=10?''+val:'0'+val
}

const currentTimeFormat = computed(()=> {
  const min = Math.floor(currentTime.value/60)
  const sec = parseInt(currentTime.value % 60)
  return `${min}:${addZero(sec)}`
})

const musicProRef=ref()
const processRef=ref()
const progressBtnRef=ref()
const progressLeft=ref(0)
const progressX=ref(0)

function mouseDown(event){
  progressLeft.value=event.clientX-progressBtnRef.value.offsetLeft
}

function mouseMove(event){
  progressX.value = event.clientX - progressLeft.value;
  processRef.value.style.width = `${(currentTime.value/progressMax.value)*100}%`;
  progressBtnRef.value.style.right=0;
}
</script>
<template>
  <div class="progress">
    <label class="duration" for="music-progress">{{currentTimeFormat}}/{{currentSong.duration}}</label>
    <div ref="musicProRef" class="music-progress" @mousedown="mouseDown">
      <div ref="processRef" class="progress-process">
       <i ref="progressBtnRef" class="progress_btn" @mousedown="mouseDown" @mousemove="mouseMove"></i>
      </div>
      {{ (currentTime/progressMax)*100 + '%' }}
    </div>
    <!-- <progress id="music-progress" :max="progressMax" :value="currentTime"></progress> -->
  </div>
</template>
<style>
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
  .music-progress{
    width: 100%;
    height: 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: yellow;
  }
  .progress-process{
    width: 0;
    height: 6px;
    background-color: red;
    border-radius: 5px;
    position: relative;
  }
  .progress_btn {
        width: 10px;
        height: 10px;
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 0 5px 0 #000 0.27;
        border-radius: 50%;
        position: absolute;
        top: -3px;
        right: 0;
        cursor: pointer;
      }
</style>