<script setup>
import { computed, inject, ref, onBeforeUnmount, unref } from "vue";
import { PlayerCore } from "../PlayerCore";
/**
 * @type { PlayerCore }
 */
const playerCore = inject("playerCore");
const currentSong = computed(() => playerCore.currentSong);
const state = computed(() => unref(playerCore.playerState));

const rotateValue = ref(0);
function roll() {
  if (state.value == "play") {
    rotateValue.value++;
  }
  loop();
}

let timer = null;
function loop() {
  timer = setTimeout(() => {
    clearTimeout(timer);
    roll();
  }, 40);
}

function reset() {
  rotateValue.value = 0;
}
const rotate = computed(() => `rotate(${rotateValue.value}deg)`);
loop();

onBeforeUnmount(() => {
  clearTimeout(timer);
});

playerCore.emitter.on("toggle:song",()=>{
  console.log(123)
  reset()
});

</script>

<template>
  <div class="player-info">
    <div
      class="cover-container"
      :style="{ transform: rotate, backgroundColor: `#${currentSong.theme}` }"
    >
      <img class="cover" :src="currentSong.cover" />
    </div>
    <h3 class="song-name">{{ currentSong.name }}</h3>
  </div>
</template>

<style>
.player-info {
  position: absolute;
  left: 10px;
  top: calc(-50% - 15px);
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
  color: red;
  margin: 0;
  margin-left: 10px;
}
</style>
