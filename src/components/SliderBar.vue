<script setup>
import { debounce } from "@/utils";
import { computed, ref, watch,inject } from "vue";
const playerCore = inject("playerCore");
const currentSong = computed(() => playerCore.currentSong);

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  duration:{
    type: Number,
    default: 500,
  }
});
const emit = defineEmits(["update:modelValue","update"]);
const clickValue = ref(props.modelValue);


// const value = computed({
//   get() {
//     return props.modelValue;
//   },
//   set(value) {
//     if (value >= 0 && value <= 1) emit("update:modelValue", value);
//     else console.log("error value:", value);
//   },
// });

const sliderBarRef = ref();
//  是否按下去
let isDrag = false;
let isTouch = false;

let barLeft = 0;

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
  clickValue.value = per;
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

const update = debounce(updateValue, props.duration);
function updateValue(clickValue) {
  // value.value = clickValue
  if (clickValue >= 0 && clickValue <= 1)
    emit("update:modelValue", clickValue);
  else 
    console.log("error value:", clickValue);
}

watch(()=>props.modelValue,()=>{
  if (!isDrag) return;
  clickValue.value = props.modelValue
})
watch(clickValue, update);
</script>

<template>
  <div class="slider-bar">
    <div
      ref="sliderBarRef"
      class="music-slider-bar"
      @mousedown="handleMouseDown"
      @touchstart="handleMouseDown"
    >
      <div
        ref="processRef"
        class="slider-bar-process"
        :style="{
          width: clickValue * 100 + '%',
          backgroundColor: `#${currentSong.theme}`,
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
