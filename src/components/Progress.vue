<script setup>
import { computed,inject } from 'vue';

const playerCore = inject('playerCore')
const progressMax=computed(()=>playerCore.progressMax)
const currentSong = computed(()=>playerCore.currentSong)
const currentTime=computed(()=>playerCore.currentTime)

function addZero(val){
  return val>=10?''+val:'0'+val
}

const currentTimeFormat = computed(()=> {
  const min = Math.floor(currentTime.value/60)
  const sec = parseInt(currentTime.value % 60)
  return `${min}:${addZero(sec)}`
})
</script>
<template>
  <div class="progress">
    <label class="duration" for="music-progress">{{currentTimeFormat}}/{{currentSong.duration}}</label>
    <progress id="music-progress" :max="progressMax" :value="currentTime"></progress>
    <div id="probnt" class="progress_btn"></div>
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