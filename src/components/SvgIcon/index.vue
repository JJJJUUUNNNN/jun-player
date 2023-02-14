<script setup>
import { computed } from "vue";

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#333",
  },
  size: {
    type: String,
    default: "1em",
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :style="{ color: color }"
    :width="props.size"
    :height="props.size"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style>
.svg-icon {
  fill: currentColor;
}
</style>
