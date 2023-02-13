<script setup>
import { usePlayer } from "@/hooks/usePlayer";
import { LightDarkenColor } from "@/utils";
import { ref, watch } from "vue";
import SliderBar from "./SliderBar.vue";
const {
  progress,
  formatTime,
  currentTime,
  duration,
  durationText,
  currentSong,
} = usePlayer();

const isDrag = false;

const ctime = ref(currentTime.value);
watch(currentTime, (value) => {
  if (isDrag) return;
  ctime.value = value;
});
function changeClickValue(pre) {
  ctime.value = duration.value * pre;
}
</script>

<template>
  <div class="progress">
    <p :style="{ color: LightDarkenColor(`#${currentSong.theme}`, -70) }">
      {{ formatTime(ctime) }}/{{ durationText }}
    </p>
    <SliderBar @changeClickValue="changeClickValue" v-model="progress" @drag="isDrag" />
  </div>
</template>

<style>
.progress {
  width: 100%;
}

p {
  margin: 0;
  user-select: none;
}
</style>
