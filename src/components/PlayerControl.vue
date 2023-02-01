<script setup>
import { computed, inject } from 'vue'
import play from '../assets/icon/play.png'
import pause from '../assets/icon/pause.png'

const playerCore = inject('playerCore')

const state=computed(()=>playerCore.playerState)

</script>

<template>
  <div class="player-control">
    <button @click="playerCore.toPerv">
      <img src="../assets/icon/pre.png" alt="">
    </button>
    <button @click="playerCore.play">
      <img :src="state.value =='play'? play : pause" alt="" >
    </button>
    <button @click="playerCore.toNext">
      <img src="../assets/icon/next.png" alt="">
    </button>
  </div>
</template>

<style scoped>
.player-control{
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-left: 167px;
    box-sizing: border-box;
    padding-right: 10px;
    user-select: none;
  }
</style>
