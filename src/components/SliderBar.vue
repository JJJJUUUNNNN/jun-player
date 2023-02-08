<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (value >= 0 && value <= 1) emit("update:modelValue", value);
    else console.log("error value:", value);
  },
});

const sliderBarRef = ref();

//  是否按下去
let isDrag = false;
let barLeft = 0;

function handleMouseDown(event) {
  isDrag = true;

  document.onmousemove = document.ontouchmove = handleMouseMove;
  handleMouseMove(event);
  
  document.onmouseup =
  document.ontouchend =
  document.onmouseleave =
  document.onvisibilitychange = handleMouseleaveOrUp;
}

function handleMouseMove(event) {
  if (!isDrag) return;
  barLeft = sliderBarRef.value.getBoundingClientRect().x;
  const diff = event.clientX - barLeft;
  const per = diff / sliderBarRef.value.offsetWidth;
  value.value = per;
}

function handleMouseleaveOrUp(event) {
  isDrag = false;
  document.onmousemove = null;
  document.ontouchmove = null;
  document.onmouseup = null;
  document.ontouchend = null;
  document.onmouseleave = null;
  document.onvisibilitychange = null;
}
</script>

<template>
  <div class="slider-bar">
    <div
      ref="sliderBarRef"
      class="music-slider-bar"
      @mousedown="handleMouseDown"
      @ontouchstart="handleMouseDown"
    >
      <div
        ref="processRef"
        class="slider-bar-process"
        :style="{
          width: value * 100 + '%',
          backgroundColor: 'red',
        }"
      >
        <div class="pro_button"></div>
      </div>
    </div>
  </div>
</template>

<style>
.slider-bar {
  position: relative;
  width: 100%;
  --pro-button-size: 16px;
  --music-slider-bar-height: 8px;
}

.music-slider-bar {
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  background: hsla(0, 0%, 100%, 0.2);
  height: var(--music-slider-bar-height);
}

.slider-bar-process {
  height: 100%;
  border-radius: 5px;
  position: relative;
}
.pro_button {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(50%, -25%);
  box-shadow: 0px 0px 5px #333;
  background-color: red;
  width: var(--pro-button-size);
  height: var(--pro-button-size);
}
</style>
