<script setup>
import { usePlayer } from "@/hooks/usePlayer";
import SliderBar from "./SliderBar.vue";
const { timeBar, progress } = usePlayer();
</script>

<template>
  <div class="progress">
    <p>{{ timeBar }}</p>
    <SliderBar v-model="progress" />
  </div>
</template>

<style>
.progress {
  width: 100%;
}
p{
  margin: 0;
}
</style>
