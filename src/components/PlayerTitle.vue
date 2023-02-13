<script setup>
import { usePlayer } from "@/hooks/usePlayer";
import { LightDarkenColor } from "@/utils";
import { computed, ref, onBeforeUnmount } from "vue";
const { emitter,state,currentSong } = usePlayer()
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

emitter.on("toggle:song",()=>{
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
    <h3 class="song-name" :style="{color:LightDarkenColor(`#${currentSong.theme}`,-70)}">{{ currentSong.name }}</h3>
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
