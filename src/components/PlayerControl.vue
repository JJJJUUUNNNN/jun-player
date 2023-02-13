<script setup>
import { ref } from "vue";
import SliderBar from "./SliderBar.vue";
import { usePlayer } from "@/hooks/usePlayer";
import { LightDarkenColor } from "@/utils";

const { state, like, volume, handleLike, toPerv, toggle, toNext,currentSong } = usePlayer();

const isShow = ref(false);

function popUp() {
  isShow.value = true;
}
function popOut() {
  isShow.value = false;
}
</script>

<template>
  <div class="player-control">
    <div class="voice">
      <button @mousedown="popUp" @mouseleave="popOut">
        <svg-icon name="volume" size="20px" :style="{color:LightDarkenColor(`#${currentSong.theme}`,-70)}"></svg-icon>
        <div class="pop-up" v-if="isShow">
          <SliderBar class="sliderBar" style="width: 120px" v-model="volume" />
        </div>
      </button>
    </div> 
    <button contenteditable="true" @click="handleLike">
      <svg-icon v-if="!like" name="unlike" size="20px" :style="{color:LightDarkenColor(`#${currentSong.theme}`,-70)}"></svg-icon>
      <svg-icon v-else name="like" size="20px" :style="{color:LightDarkenColor(`#${currentSong.theme}`,-70)}"></svg-icon>
    </button>
    <button @click="toPerv">
      <svg-icon name="pre" size="2em" :style="{color:LightDarkenColor(`#${currentSong.theme}`,-70)}"></svg-icon>
    </button>
    <button @click="toggle">
      <svg-icon :name="state == 'play' ? 'play' : 'pause'" size="2em" :style="{color:LightDarkenColor(`#${currentSong.theme}`,-70)}"></svg-icon>
    </button>
    <button @click="toNext">
      <svg-icon name="next" size="2em" :style="{color:LightDarkenColor(`#${currentSong.theme}`,-70)}"></svg-icon>
    </button>
  </div>
</template>

<style scoped>
.player-control {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-left: 167px;
  box-sizing: border-box;
  padding-right: 10px;
  user-select: none;
}
.voice {
  display: flex;
  position: relative;
}
.pop-up {
  padding: 0 15px;
  background-color: rgb(211, 2, 75);
  border-radius: 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
:deep(.sliderBar) {
  --pro-button-size: 10px;
  --music-slider-bar-height: 5px;
}
</style>
