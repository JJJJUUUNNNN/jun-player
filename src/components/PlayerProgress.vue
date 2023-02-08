<script setup>
import { inject } from "vue";
import SliderBar from "./SliderBar.vue";
const playerCore = inject("playerCore");
</script>

<template>
  <SliderBar v-model="playerCore.progress"/>
</template>
