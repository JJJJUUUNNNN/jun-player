import { ThemeDarkColor, ThemeLightColor } from "@/utils/const";
import { lightDarkenColor } from "@/utils/index";
import { computed, inject, ref, watch } from "vue";
import { PlayerCore } from "../PlayerCore";
import { useCssVar } from "@vueuse/core";

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

  const currentMode = ref(playerCore.currentMode);
  playerCore.emitter.on("modeChange", (value) => {
    currentMode.value = value;
  });

  const currentSong = ref(playerCore.currentSong);
  playerCore.emitter.on("toggle:song", (value) => {
    currentSong.value = value;
  });

  playerCore.emitter.on("like:song", (like) => {
    currentSong.value.like = like;
  });

  const playList = ref(playerCore.playList);

  playerCore.emitter.on("playListChange", (value) => {
    playList.value = [...value];
  });

  const volume = ref(playerCore.volume);

  function volumeRefUpdatePlayerCore() {
    if (volume.value != playerCore.volume) {
      volume.value = playerCore.volume;
    }
  }

  playerCore.emitter.on("volumechange", volumeRefUpdatePlayerCore);

  watch(volume, (value) => {
    playerCore.volume = value;
  });

  const muted = ref(playerCore.muted);

  function mutedRefUpdatePlayerCore() {
    if (muted.value != playerCore.muted) {
      muted.value = playerCore.muted;
    }
  }

  playerCore.emitter.on("mutedchange", mutedRefUpdatePlayerCore);

  watch(muted, (value) => {
    playerCore.muted = value;
  });

  const progress = ref(playerCore.progress);

  function progressRefUpdatePlayerCore() {
    if (progress.value != playerCore.progress) {
      progress.value = playerCore.progress;
    }
  }

  playerCore.emitter.on("timeupdate", progressRefUpdatePlayerCore);
  playerCore.emitter.on("durationChange", progressRefUpdatePlayerCore);

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

  const darkColor = useCssVar(ThemeDarkColor);
  const lightColor = useCssVar(ThemeLightColor);

  function updateColor(_currentSong, lastSong) {
    if (lastSong && lastSong.theme == _currentSong.theme) return;
    darkColor.value = lightDarkenColor(`#${_currentSong.theme}`, -70);
    lightColor.value = "#" + _currentSong.theme;
  }

  watch(currentSong, updateColor, { immediate: true });

  return {
    // attrs
    state,
    duration,
    currentTime,
    currentMode,
    currentSong,
    progress,
    timeBar,
    durationText,
    currentText,
    volume,
    muted,
    playList,
    emitter: playerCore.emitter,

    // methods
    toggleMute: playerCore.toggleMute.bind(playerCore),
    handleLike: playerCore.handleLike.bind(playerCore),
    toggleMode: playerCore.toggleMode.bind(playerCore),
    toPerv: playerCore.toPerv.bind(playerCore),
    toggle: playerCore.toggle.bind(playerCore),
    toNext: playerCore.toNext.bind(playerCore),
    handleListPlay: playerCore.handleListPlay.bind(playerCore),
    formatTime,
  };
}
