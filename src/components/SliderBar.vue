<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 500,
  },
});
const emit = defineEmits(["update:modelValue", "changeClickValue"]);
const clickValue = ref(props.modelValue);

const sliderBarRef = ref();
let isDrag = ref(false);
let isTouch = false;
let barLeft = 0;

watch(isDrag, () => {
  emit("drag", isDrag);
});

function handleMouseDown(event) {
  isDrag = true;

  document.onmousemove = document.ontouchmove = handleMouseMove;
  handleMouseMove(event);

  document.onmouseup =
    document.ontouchend =
    document.onmouseleave =
    document.onvisibilitychange =
      handleMouseleaveOrUp;
}

function handleMouseMove(event) {
  if (!isDrag) return;
  if (event.type == "touchstart" || event.type == "touchmove") {
    isTouch = true;
  } else {
    isTouch = false;
  }
  barLeft = sliderBarRef.value.getBoundingClientRect().x;
  const x = isTouch ? event.changedTouches[0].clientX : event.clientX;
  const diff = x - barLeft;
  const per = diff / sliderBarRef.value.offsetWidth;
  const perValue = per >= 0 ? (per <= 1 ? per : 1) : 0;
  clickValue.value = perValue;
  emit("changeClickValue", clickValue.value);
}

function updateValue() {
  const value = clickValue.value;
  if (value >= 0 && value <= 1) {
    if (props.modelValue != value) {
      emit("update:modelValue", value);
    }
  } else {
    console.log("error value:", value);
  }
}

function handleMouseleaveOrUp(event) {
  isDrag = false;
  document.onmousemove = null;
  document.ontouchmove = null;
  document.onmouseup = null;
  document.ontouchend = null;
  document.onmouseleave = null;
  document.onvisibilitychange = null;
  updateValue();
}

watch(
  () => props.modelValue,
  () => {
    if (isDrag) return;
    if (clickValue.value == props.value) return;
    clickValue.value = props.modelValue;
  }
);
</script>

<template>
  <div
    class="slider-bar-container"
    @mousedown="handleMouseDown"
    @touchstart="handleMouseDown"
  >
    <div class="slider-bar">
      <div ref="sliderBarRef" class="music-slider-bar">
        <div
          ref="processRef"
          class="slider-bar-process "
          :style="{
            width: clickValue * 100 + '%',
          }"
        >
          <div
            class="pro_button"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slider-bar-container {
  padding: 10px 0;
  width: 100%;
}
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
  width: var(--pro-button-size);
  height: var(--pro-button-size);
}
</style>
