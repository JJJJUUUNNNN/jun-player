<script setup>
import { ref, computed } from 'vue'
import SliderBar from './SliderBar.vue'
import { usePlayer } from '@/hooks/usePlayer'

const {
  state,
  volume,
  muted,
  handleLike,
  toPerv,
  toggle,
  toNext,
  currentSong,
  toggleMute
} = usePlayer()

const isHover = ref(false)
const isDrag = ref(false)
function updateIsDrag (val) {
  isDrag.value = val
}
function popUp () {
  isHover.value = true
}
function popOut () {
  isHover.value = false
}

const isShow = computed(() => isHover.value || isDrag.value)

const volumeValue = computed({
  get () {
    return muted.value === true ? 0 : volume.value
  },
  set (value) {
    if (muted.value === false) volume.value = value
  }
})
</script>

<template>
  <div class="player-control">
    <div class="voice" @mouseenter="popUp" @mouseleave="popOut">
      <button @mousedown="toggleMute">
        <svg-icon
          :name="muted ? 'mute' : 'volume'"
          size="20px"
          class="player-button"
        ></svg-icon>
      </button>
      <div class="pop-up" v-if="isShow">
        <SliderBar
          @drag="updateIsDrag"
          class="sliderBar"
          style="width: 120px"
          v-model="volumeValue"
        />
      </div>
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
        :name="state === 'play' ? 'play' : 'pause'"
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
  top: 25px;
  left: 50%;
  transform: translate(-50%);
}
:deep(.sliderBar) {
  --pro-button-size: 10px;
  --music-slider-bar-height: 5px;
}
</style>
