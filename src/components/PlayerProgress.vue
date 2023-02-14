<script setup>
import { usePlayer } from "@/hooks/usePlayer";
import { ref, watch } from "vue";
import SliderBar from "./SliderBar.vue";
const {
  formatTime,
  progress,
  currentTime,
  duration,
  durationText,
} = usePlayer();

let isDrag = false;

const ctime = ref(currentTime.value);

watch(currentTime, (value) => {
  if (isDrag) return;
  ctime.value = value;
});

function changeClickValue(pre) {
  ctime.value = duration.value * pre;
}

function updateIsDrag(val){
  isDrag = val
}

</script>

<template>
  <div class="progress">
    <p class="player-info-time">
      {{ formatTime(ctime) }}/{{ durationText }}
    </p>
    <SliderBar @changeClickValue="changeClickValue" v-model="progress" @drag="updateIsDrag" />
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
