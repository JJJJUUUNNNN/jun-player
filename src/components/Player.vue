<script setup>
import PlayerControl from './PlayerControl.vue'
import PlayerTitle from './PlayerTitle.vue'
import PlayerAction from './PlayerAction.vue'
</script>

<template>
  <div class="player">
    <PlayerTitle />
    <PlayerControl />
    <PlayerAction />
  </div>
</template>

<style>
.player,
.cover-container {
  background-color: var(--theme-light-color) !important;
}
.player-button,
.player-info-time,
.player-info-name,
.music-list-ul {
  color: var(--theme-dark-color) !important;
}

.slider-bar-process,
.slider-bar-process .pro_button {
  background-color: var(--theme-dark-color) !important;
}

.player {
  width: 100%;
  opacity: 0.9;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
