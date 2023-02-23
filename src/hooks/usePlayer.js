import { THEME_DARK_COLOR, THEME_LIGHT_COLOR } from '@/utils/const'
import { formatTime, lightDarkenColor } from '@/utils/index'
import { computed, ref, watch, inject } from 'vue'
import { useCssVar } from '@vueuse/core'

/**
 * @typedef {import('../PlayerCore').PlayerCore } PlayerCore
 * @param {keyof PlayerCore} key
 * @param {string[]|string} emits
 * @param {boolean} isWatch
 */
export function useState (key, emits = [], isWatch = false) {
  const playerCore = inject('playerCore')
  const state = ref(playerCore[key])
  function update () {
    if (playerCore[key] instanceof Array) {
      state.value = [...playerCore[key]]
      return
    }
    if (state.value != playerCore[key]) {
      state.value = playerCore[key]
    }
  }
  if (typeof emits === 'string') {
    emits = [emits]
  }
  emits.forEach(emit => {
    playerCore.emitter.on(emit, update)
  })
  watch(state, (value) => {
    if (isWatch) {
      playerCore[key] = value
    }
  })
  return state
}

export function usePlayer () {
  const playerCore = inject('playerCore')
  /**
   * @description 播放状态
   */
  const playerState = useState('playerState', ['playerStateChange'], true)
  /**
   * @description 音乐时长
   */
  const duration = useState('duration', ['durationChange'])
  /**
   * @description 当前播放时长
   */
  const currentTime = useState('currentTime', ['currentTimeChange'])

  const durationText = computed(() => formatTime(duration.value))
  const currentText = computed(() => formatTime(currentTime.value))
  const timeBar = computed(() => `${currentText.value}/${durationText.value}`)
  /**
   * @description 当前歌曲播放模式
   */
  const currentMode = useState('currentMode', ['modeChange'])
  /**
   * @description 当前播放歌曲
   */
  const currentSong = useState('currentSong', ['toggle:song'])

  playerCore.emitter.on('like:song', (like) => {
    currentSong.value.like = like
  })

  // 颜色处理
  const darkColor = useCssVar(THEME_DARK_COLOR)
  const lightColor = useCssVar(THEME_LIGHT_COLOR)

  function updateColor (_currentSong, lastSong) {
    if (lastSong && lastSong.theme === _currentSong.theme) return
    darkColor.value = lightDarkenColor(`#${_currentSong.theme}`, -70)
    lightColor.value = '#' + _currentSong.theme
  }
  watch(currentSong, updateColor, { immediate: true })

  /**
   * @description 歌曲列表
   */
  const playList = useState('playList', ['playListChange'])

  /**
   * @description 音量
   */
  const _volume = useState('volume', ['volumechange'], true)

  /**
   * @description 静音
   */
  const muted = useState('muted', ['mutedChange'], true)

  watch(muted, (_muted) => {
    if (_muted == false && _volume.value == 0) {
      _volume.value = playerCore.lastVolume
    }
  })

  const volume = computed({
    get () {
      return muted.value === true ? 0 : _volume.value
    },
    set (value) {
      _volume.value = value
      if (value == 0) {
        if (muted.value == false) {
          muted.value = true
        }
      } else {
        if (muted.value == true) {
          muted.value = false
        }
      }
    }
  })

  /**
     * @description 播放进度
     */
  const progress = useState('progress', ['timeupdate', 'durationChange'], true)

  return {
    // attrs
    playerState,
    duration,
    currentTime,
    durationText,
    currentText,
    timeBar,
    currentMode,
    currentSong,
    darkColor,
    lightColor,
    playList,
    muted,
    volume,
    progress,

    // methods
    toggle: playerCore.toggle.bind(playerCore),
    toNext: playerCore.toNext.bind(playerCore),
    toPerv: playerCore.toPerv.bind(playerCore),
    handleLike: playerCore.handleLike.bind(playerCore),
    handleListPlay: playerCore.handleListPlay.bind(playerCore),
    toggleMode: playerCore.toggleMode.bind(playerCore),
    toggleMute: playerCore.toggleMute.bind(playerCore)
  }
}
