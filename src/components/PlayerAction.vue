<script setup>
import { usePlayer } from '@/hooks/usePlayer'
import PlayerProgress from './PlayerProgress.vue'
import PlayList from './PlayList.vue'
import { ref } from 'vue'

const { currentMode, toggleMode } = usePlayer()

const isShow = ref(true)
function toggleList () {
  isShow.value = !isShow.value
}

</script>

<template>
  <div class="player-action">
    <button class="player-mode-btn" @click="toggleMode">
      <svg-icon
        :name="currentMode.key"
        size="2em"
        class="player-button"
      ></svg-icon>
    </button>
    <PlayerProgress style="margin: 0 10px" />
    <button class="list" @click="toggleList">
      <svg-icon name="music-list" size="2em" class="player-button"></svg-icon>
    </button>
  </div>
  <PlayList v-if="isShow" />
</template>

<style>
.player-action {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  user-select: none;
}
</style>
