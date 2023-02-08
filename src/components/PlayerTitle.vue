<script setup>
import {computed ,inject} from 'vue'

const playerCore = inject('playerCore')
const currentSong = computed(()=>playerCore.currentSong)
const state=computed(()=>playerCore.playerState)
</script>

<template>
  <img :class="{
        animation: state.value == 'play'
      }" class="cover" :src="currentSong.cover">
  <h3 class="song-name">{{currentSong.name}}</h3>
</template>

<style>
@keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
  }
  .cover{
    width: 90px;
    height: 90px;
    position: absolute;
    border-radius: 50%;
    top: -50px;
    left: 15px;
    border: 3px solid #ccc;
  }

  .song-name{
    position: absolute;
    top: -50px;
    left: 120px;
    font-size: 18px;
    font-weight: 400;
  }

   .animation{
    animation: rotation 20s linear infinite;
  }
  h3{
    color: #000;
  }
</style>
