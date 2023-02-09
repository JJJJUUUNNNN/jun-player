<script setup>
import { computed, inject,ref,onBeforeUnmount,unref } from "vue";

const playerCore = inject("playerCore");
const currentSong = computed(() => playerCore.currentSong);
const state = computed(() => unref(playerCore.playerState));

const rotateValue = ref(0);
function roll() {
  if(state.value == 'play'){
    rotateValue.value++;
  }
  loop()
}

let timer = null
function loop() {
 timer = setTimeout(() => {
    clearTimeout(timer);
    roll();
  }, 10);
}

function reset(){
  rotateValue.value = 0
}
const rotate = computed(()=>`rotate(${rotateValue.value}deg)`)
loop()
onBeforeUnmount(()=>{
  clearTimeout(timer);
})
</script>

<template>
  <div class="player-info">
    <div style="color: red;">
      {{ r }}
    </div>
    
    <div class="cover-container" :style="{ transform: rotate }">
      <img class="cover" :src="currentSong.cover" />
    </div>
    <h3 class="song-name">{{ currentSong.name }}</h3>
  </div>
</template>

<style>
@keyframes roll {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.player-info {
  position: absolute;
  left: 10px;
  top: calc(-50% - 20px);
  display: flex;
  align-items: center;
}
.cover-container {
  width: 90px;
  height: 90px;
  border: 3px solid #ccc;
  overflow: hidden;
  border-radius: 50%;
  background: red;
}

.cover {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.cover-container.animation {
  animation: roll 20s linear infinite;
}

.song-name {
  font-size: 18px;
  font-weight: 400;
  color: red;
  margin: 0;
  margin-left: 10px;
}

/* 



h3 {
  color: #000;
} */
</style>
