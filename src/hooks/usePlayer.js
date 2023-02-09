import { computed, inject, ref, watch, unref } from "vue";
import { PlayerCore } from "../PlayerCore";
export function usePlayer() {
  /**
   * @type { PlayerCore }
   */
  const playerCore = inject("playerCore");
  const state = ref(playerCore.playerState);
  playerCore.emitter.on("playerStateChange", (value) => {
    state.value = value;
  });

  const duration = ref(playerCore.duration);
  playerCore.emitter.on("durationChange", (value) => {
    duration.value = value;
  });

  const currentTime = ref(playerCore.currentTime);
  playerCore.emitter.on("onCurrentTimeChange", (value) => {
    currentTime.value = value;
  });

  const progress = ref(playerCore.progress);
  playerCore.emitter.on("onCurrentTimeChange", () => {
    if (progress.value != playerCore.progress)
      progress.value = playerCore.progress;
  });
  playerCore.emitter.on("durationChange", () => {
    if (progress.value != playerCore.progress)
      progress.value = playerCore.progress;
  });

  watch(progress, (value) => {
    playerCore.progress = value;
  });

  function add0(value) {
    return value >= 10 ? value + "" : "0" + value;
  }
  function formatTime(value) {
    const min = Math.floor(value / 60);
    const sec = Math.floor(value % 60);
    return `${add0(min)}:${add0(sec)}`;
  }

  const durationText = computed(() => formatTime(duration.value));
  const currentText = computed(() => formatTime(currentTime.value));
  const timeBar = computed(() => `${currentText.value}/${durationText.value}`);

  return {
    state,
    duration,
    currentTime,
    progress,
    timeBar,
    durationText,
    currentText,
  };
}
