<script setup>
import { computed, inject, ref } from "vue";
import play from "../assets/icon/play.png";
import pause from "../assets/icon/pause.png";
import PlayerProgress from "./PlayerProgress.vue";

const playerCore = inject("playerCore");
const state = computed(() => playerCore.playerState);
const isShow = ref(false);

function popUp() {
  isShow.value = true;
}
function popOut() {
  isShow.value = false;
}

const likeOrNot = computed(() => playerCore.likeOrNot);
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
        <div v-if="isShow" class="popUp">
          <PlayerProgress
            progressWidth="100px"
            processColor="#01AAFF"
            musicProgressColor="#ebebeb"
            musicProgressHeight="4px"
            proBtnColor="#01AAFF"
            BtnWidthHeight="10px"
          />
        </div>
      </button>
    </div>
    <button contenteditable="true" @click="playerCore.handleLike">
      <img
        v-if="!likeOrNot"
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
    <button @click="playerCore.play">
      <img :src="state.value == 'play' ? play : pause" alt="" />
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
.popUp {
  height: 4px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  bottom: -22px;
  left: -47px;
  padding: 10px;
  box-shadow: 0px 0px 2px #fff;
}
</style>
