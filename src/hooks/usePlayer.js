import { computed, inject, ref, watch, unref, nextTick } from "vue";
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

  const like = ref(playerCore.like);
  playerCore.emitter.on("likeChange", (value) => {
    like.value = value;
  });

const volume = ref(playerCore.volume)
const audioVolume=ref(playerCore.audio.volume)

 watch(volume,(value)=>{
  console.log('666',volume.value,audioVolume.value)
  playerCore.volume=value
 })

 watch(audioVolume,(value)=>{
  console.log('888')
  playerCore.volume=value
 })

  const progress = ref(playerCore.progress);

  function progressRefUpdatePlayerCore() {
    if (progress.value != playerCore.progress) {
      progress.value = playerCore.progress;
    }
  }
  playerCore.emitter.on("timeupdate", progressRefUpdatePlayerCore);
  playerCore.emitter.on("durationChange", progressRefUpdatePlayerCore);

  watch(progress, (value) => {
    console.log("watch(progress)");
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
    // attrs
    state,
    duration,
    currentTime,
    progress,
    timeBar,
    durationText,
    currentText,
    like,
    volume,

    // methods
    handleLike: playerCore.handleLike,
  };
}
