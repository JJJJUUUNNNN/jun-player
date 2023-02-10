<script setup>
import { computed, inject, ref } from "vue";
import pause from "../assets/icon/pause.png";
import play from "../assets/icon/play.png";
import SliderBar from "./SliderBar.vue";
import { PlayerCore } from "../PlayerCore";
import { usePlayer } from "@/hooks/usePlayer";
/**
 * @type { PlayerCore }
 */
const playerCore = inject("playerCore");
const { state, like,volume, handleLike } = usePlayer();

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
        <img
          style="width: 20px; height: 20px"
          src="../assets/icon/voice.png"
          alt=""
        />
        <div class="pop-up">
          <SliderBar
            class="sliderBar"
            style="width: 120px"
            v-model="volume"
          />
        </div>
      </button>
    </div>
    <button contenteditable="true" @click="handleLike">
      <img
        v-if="!like"
        style="width: 20px; height: 20px"
        src="../assets/icon/unlike.png"
        alt=""
      />
      <img
        v-else
        style="width: 20px; height: 20px"
        src="../assets/icon/liked.png"
        alt=""
      />
    </button>
    <button @click="playerCore.toPerv">
      <img src="../assets/icon/pre.png" alt="" />
    </button>
    <button @click="playerCore.toggle">
      <img :src="state == 'play' ? play : pause" alt="" />
    </button>
    <button @click="playerCore.toNext">
      <img src="../assets/icon/next.png" alt="" />
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
