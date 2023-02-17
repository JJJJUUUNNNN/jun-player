<script setup>
import { ref } from "vue";
import SliderBar from "./SliderBar.vue";
import { usePlayer } from "@/hooks/usePlayer";
import {setItem,getItem} from '@/utils/index'

const { state, volume, handleLike, toPerv, toggle, toNext, currentSong,emitter } =
  usePlayer();

const isShow = ref(false);

function popUp() {
  isShow.value = true;
}
function popOut() {
  isShow.value = false;
}

function handleMute(){
  if(volume.value!=0){
    setItem('volume_mute',volume.value)
    volume.value=Number(0)
  }else{
    volume.value = Number(getItem("volume_mute"));
  }
}
</script>

<template>
  <div class="player-control">
    <div class="voice">
      <button @mouseenter="popUp" @mousedown="handleMute" @mouseleave="popOut">
        <svg-icon :name="volume==0?'mute':'volume'" size="20px" class="player-button"></svg-icon>
        <div class="pop-up" v-if="isShow">
          <SliderBar class="sliderBar" style="width: 120px" v-model="volume" />
        </div>
      </button>
    </div>
    <button contenteditable="true" @click="handleLike()">
      <svg-icon
        :name="currentSong.like ? 'like' : 'unlike'"
        size="20px"
        class="player-button"
      ></svg-icon>
    </button>
    <button @click="toPerv">
      <svg-icon name="pre" size="2em" class="player-button"></svg-icon>
    </button>
    <button @click="toggle">
      <svg-icon
        :name="state == 'play' ? 'play' : 'pause'"
        size="2em"
        class="player-button"
      ></svg-icon>
    </button>
    <button @click="toNext">
      <svg-icon name="next" size="2em" class="player-button"></svg-icon>
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
  background-color: #e2dede;
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
