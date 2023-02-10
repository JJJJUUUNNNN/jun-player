<script setup>
import { usePlayer } from "@/hooks/usePlayer";
import { ref, watch } from "vue";
import SliderBar from "./SliderBar.vue";
const { progress, formatTime, currentTime, duration, durationText } =  usePlayer();

const ctime = ref(currentTime.value);
watch(currentTime, (value) => {
  ctime.value = value;
});
function changeClickValue(pre) {
  ctime.value = duration.value * pre;
}
</script>

<template>
  <div class="progress">
    <p>{{ formatTime(ctime) }}/{{ durationText }}</p>
    <SliderBar @changeClickValue="changeClickValue" v-model="progress" />
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
