<script setup>
import { ref } from "vue";
import { usePlayer } from "@/hooks/usePlayer";
import PlayerProgress from "./PlayerProgress.vue";
import PlayList from "./PlayList.vue";
const { currentMode, toggleMode } = usePlayer();
const isShow = ref(false);
function toggleList() {
  isShow.value = !isShow.value;
}
</script>
<template>
  <div class="player-action">
    <button class="player-mode-btn" @click="toggleMode">
      <img style="width: 25px; height: 25px" :src="currentMode.icon" alt="" />
    </button>
    <PlayerProgress style="margin: 0 10px" />
    <button class="list" @click="toggleList">
      <img
        style="width: 25px; height: 25px"
        src="../assets/icon/music-list.png"
        alt="音乐列表"
      />
    </button>
  </div>

  <PlayList />
</template>
<style>
.player-action {
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  user-select: none;
}

button img {
  width: 30px;
  height: 30px;
}
</style>
