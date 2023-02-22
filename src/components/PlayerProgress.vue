<script setup>
import { usePlayer } from '@/hooks/usePlayer'
import SliderBar from './SliderBar.vue'

const { progress, updatemusicDrag, timeBar } =
  usePlayer()
</script>

<template>
  <div class="progress">
    <p class="player-info-time">{{ timeBar }}</p>
    <SliderBar
      v-model="progress"
      @drag="updatemusicDrag"
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
