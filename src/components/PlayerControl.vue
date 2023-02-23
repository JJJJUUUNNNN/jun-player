<script setup>
import SliderBar from './SliderBar.vue'
import { ref, computed } from 'vue'
import { usePlayer } from '@/hooks/usePlayer'
import { useDrag } from '@/hooks/useDrag'

const {
  playerState,
  muted,
  handleLike,
  toPerv,
  toggle,
  toNext,
  currentSong,
  toggleMute,
  volume
} = usePlayer()

const { isDrag, updateIsDrag } = useDrag()

const isHover = ref(false)
const voiceShow = computed(() => isHover.value || isDrag.value)

function voiceMouseEnter () {
  isHover.value = true
}
function voiceMouseLeave () {
  isHover.value = false
}

</script>

<template>
  <div class="player-control">
    <div class="voice" @mouseenter="voiceMouseEnter" @mouseleave="voiceMouseLeave">
      <button @mousedown="toggleMute">
        <svg-icon
          :name="muted ? 'mute' : 'volume'"
          size="20px"
          class="player-button"
        ></svg-icon>
      </button>
      <div class="pop-up" v-if="voiceShow">
        <SliderBar
          @drag="updateIsDrag"
          class="sliderBar"
          style="width: 120px"
          v-model="volume"
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
        :name="playerState === 'play' ? 'play' : 'pause'"
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
  padding-top: 10px;
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
