<script setup>
import { computed, inject, ref } from "vue";

const playerCore = inject("playerCore");
const duration = computed(() => playerCore.duration.value);
const progress = computed(() => playerCore.progress);

const currentSong = computed(() => playerCore.currentSong);
const currentTime = computed(() => playerCore.currentTime);
const state = computed(() => playerCore.playerState);

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
const progressBtnRef = ref();
const width = computed(() => progress.value + "%");
// function mouseDown(event) {
//   // progressLeft.value=event.clientX-progressBtnRef.value.offsetLeft
// }

// function mouseMove(event) {
//   // progressX.value = event.clientX - progressLeft.value;
//   processRef.value.style.width = `${
//     (currentTime.value / duration.value) * 100
//   }%`;
//   progressBtnRef.value.style.right = 0;
// }

//  是否按下去
const isDrag = ref(false);
var diffX = 0
function handleMouseDown(event) {
  isDrag.value = true;
   diffX = event.clientX - musicProRef.value.offsetLeft;
}

function handleMouseMove(event) {
  if (!isDrag.value) return;

  var moveX = event.clientX - diffX;
  if (moveX < 0) {
    moveX = 0;
  } else if (moveX > window.innerWidth - musicProRef.value.offsetWidth) {
    moveX = window.innerWidth - musicProRef.value.offsetWidth;
  }

  const newProsess = moveX / 250
  playerCore.progress  = newProsess
}

function handleMouseleaveOrUp() {
  // isDrag.value = false
}

const s = computed({
  get(){
    return  playerCore._currentTime.value
  },
  set(v){

    console.log(v)
    playerCore._currentTime.value = v
  }
})
</script>
<template>

  <h1 style="position: fixed; top: 0; left: 0">
    {{ width }}
  </h1>
  <div class="progress">
    <label class="duration" for="music-progress"
      >{{ currentTimeFormat }}/{{ currentSong.duration }}</label
    >

    <div ref="musicProRef" class="music-progress">
      <div
        ref="processRef"
        class="progress-process"
        :style="{
          width: width,
        }"
      >
        <i
          ref="progressBtnRef"
          class="progress_btn"
          @mousedown="handleMouseDown"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseleaveOrUp"
          @mouseup="handleMouseleaveOrUp"
          :style="{
            right: 0,
          }"
        ></i>
      </div>

      {{ progress }}
    </div>
    <!-- <progress id="music-progress" :max="duration" :value="currentTime"></progress> -->
  </div>
  <input type="text" v-model="s">

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
.progress_btn {
  width: 10px;
  height: 10px;
  background: rgb(0, 255, 13);
  /* box-shadow: 0 0 5px 0 #000 0.27; */
  border-radius: 50%;
  position: absolute;
  opacity: 0.5;
  cursor: pointer;
  top: 50%;
  transform: translate(calc(50% - 0px), -50%);
}
</style>
