<script setup>
import { computed, inject, ref } from "vue";

const props = defineProps({
  type: String,
  progressWidth: String,
  musicProgressHeight: String,
  processColor: String,
  musicProgressColor: String,
  proBtnColor: String,
  BtnWidthHeight: String,
});

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
let barLeft = 0;
function handleMouseDown(event) {
  isDrag = true;
  handleMouseMove(event);
}

function handleMouseMove(event) {
  if (!isDrag) return;
  barLeft = musicProRef.value.getBoundingClientRect().x;
  const diff = event.clientX - barLeft;
  const per = diff / musicProRef.value.offsetWidth;
  playerCore.progress = per;
}

function handleMouseleaveOrUp() {
  isDrag = false;
}
</script>

<template>
  <div class="progress" :style="{ width: progressWidth }">
    <label v-if="type == 'duration'" class="duration" for="music-progress"
      >{{ currentTimeFormat }}/{{ currentSong.duration }}</label
    >

    <div
      ref="musicProRef"
      class="music-progress"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseleaveOrUp"
      @mouseup="handleMouseleaveOrUp"
      :style="{
        background: musicProgressColor,
        height: musicProgressHeight,
      }"
    >
      <div
        ref="processRef"
        class="progress-process"
        :style="{
          width: width,
          backgroundColor: processColor,
        }"
      >
        <div
          class="pro_button"
          :style="{
            backgroundColor: proBtnColor,
            width: BtnWidthHeight,
            height: BtnWidthHeight,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style>
.progress {
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
  border-radius: 5px;
  box-sizing: border-box;
}

.progress-process {
  height: 100%;
  border-radius: 5px;
  position: relative;
}
.pro_button {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(50%, -25%);
  box-shadow: 0px 0px 5px #333;
}
</style>
