<script setup>
import { computed, inject, ref } from "vue";

const playerCore = inject("playerCore");
const progress = computed(() => playerCore.progress);

const currentSong = computed(() => playerCore.currentSong);
const currentTime = computed(() => playerCore.currentTime);

function addZero(val) {
  return val >= 10 ? "" + val : "0" + val;
}

const currentTimeFormat = computed(() => {
  const min = Math.floor(currentTime.value / 60);
  const sec = parseInt(currentTime.value % 60);
  return `${min}:${addZero(sec)}`;
});

const musicProRef = ref();
const processRef = ref();
const width = computed(() => progress.value + "%");

//  是否按下去
let isDrag = false;
let barLeft = 0
function handleMouseDown(event) {
  isDrag = true;
  handleMouseMove(event)
}

function handleMouseMove(event) {
  if (!isDrag) return;
  barLeft =  musicProRef.value.getBoundingClientRect().x
  const diff  = event.clientX - barLeft
  const per = diff / musicProRef.value.offsetWidth 
  playerCore.progress = per;
}

function handleMouseleaveOrUp(event){
    isDrag = false;
}
</script>

<template>
  <div class="progress">
    <label class="duration" for="music-progress"
      >{{ currentTimeFormat }}/{{ currentSong.duration }}</label
    >

    <div
      ref="musicProRef"
      class="music-progress"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseleaveOrUp"
      @mouseup="handleMouseleaveOrUp"
    >
      <div
        ref="processRef"
        class="progress-process"
        :style="{
          width: width,
        }"
      >
        <div class="pro_button"></div>
      </div>
    </div>
  </div>
</template>

<style>
.progress {
  width: 250px;
  position: relative;
}
.progress progress {
  width: 100%;
}
.duration {
  font-size: 10px;
  position: absolute;
  top: -18px;
  left: 0;
  user-select: none;
}
.music-progress {
  width: 100%;
  height: 10px;
  border: 1px solid #111;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: rgba(51, 51, 51, 0.476);
}

.progress-process {
  height: 100%;
  background-color: red;
  border-radius: 5px;
  position: relative;
}
.pro_button {
  position: absolute;
  top: 0;
  right: 0;
  width: 14px;
  height: 14px;
  background: rgb(0, 255, 13);
  border-radius: 50%;
  opacity: 0.5;
  cursor: pointer;
  transform: translate(50%, -20%);
}
</style>
