<script setup>
import Player from './components/Player.vue'
</script>

<template>
  <div class="player-container">
    <Player class="player" />
  </div>
</template>

<style scoped>
.player-container {
  padding: 100px 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin: 0 auto;
}
</style>
