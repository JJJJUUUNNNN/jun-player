<script setup>
import { usePlayer, useLoop } from '@/hooks/usePlayer'

const { currentSong } = usePlayer()
const { rotate } = useLoop()

</script>

<template>

  <div class="player-info">
    <div class="cover-container" :style="{ transform: rotate }">
      <img class="cover" :src="currentSong.cover" />
    </div>
    <h3 class="song-name player-info-name">{{ currentSong.name }}</h3>
  </div>
</template>

<style>
.player-info {
  position: absolute;
  left: 10px;
  top: calc(-45px - 15px);
  display: flex;
  align-items: center;
}

.cover-container {
  width: 90px;
  height: 90px;
  border: 3px solid #ccc;
  overflow: hidden;
  border-radius: 50%;
}

.cover {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.song-name {
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  margin-left: 10px;
}
</style>
