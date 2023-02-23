<script setup>
import { useDrag } from '@/hooks/useDrag'
import { usePlayer } from '@/hooks/usePlayer'
import { formatTime } from '@/utils'
import { ref, watch } from 'vue'
import SliderBar from './SliderBar.vue'
const { progress, currentTime, duration, durationText } = usePlayer()
const { isDrag, updateIsDrag } = useDrag()

const ctime = ref(currentTime.value)

watch(currentTime, (value) => {
  if (isDrag.value) return
  ctime.value = value
})

function changeClickValue (pre) {
  ctime.value = duration.value * pre
}

</script>

<template>
  <div class="progress">
    <p class="player-info-time">{{ formatTime(ctime) }}/{{ durationText }}</p>
    <SliderBar
      @changeClickValue="changeClickValue"
      v-model="progress"
      @drag="updateIsDrag"
    />
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
