import { ThemeDarkColor, ThemeLightColor } from '@/utils/const'
import { lightDarkenColor } from '@/utils/index'
import { computed, ref, watch } from 'vue'
import { useCssVar } from '@vueuse/core'
import { PlayerCore } from '@/PlayerCore'

const playerCore = new PlayerCore({
  playList: [
    {
      name: '勾指起誓言',
      author: '洛天依',
      duration: '3:03',
      cover: '/cover/faith.jpg',
      songUrl: '/music/勾指起誓言-洛天依.mp3',
      theme: 'f6b3d8',
      like: false
    },
    {
      name: '盛夏的果实',
      author: '莫文蔚',
      duration: '4:10',
      cover: '/cover/summer.jpg',
      songUrl: '/music/盛夏的果实-莫文蔚.mp3',
      theme: 'c1d3df',
      like: false
    },
    {
      name: '我的美丽',
      author: '小霞',
      duration: '5:08',
      cover: '/cover/myBeauty.jpg',
      songUrl: '/music/我的美丽-小霞.mp3',
      theme: 'b7b7b7',
      like: false
    }
  ]
})

export function usePlayer () {
  /**
   * @type { playerCore }
   */

  /**
   * @description 播放状态
   */
  const playerState = ref(playerCore.playerState)

  function playerStateUpdatePlayerCore () {
    if (playerState.value !== playerCore.playerState) {
      playerState.value = playerCore.playerState
    }
  }

  playerCore.emitter.on('playerStateChange', playerStateUpdatePlayerCore)

  watch(playerState, (value) => {
    playerCore.playerState = value
  })

  /**
   * @description 音乐时长
   */
  const duration = ref(playerCore.duration)
  playerCore.emitter.on('durationChange', (value) => {
    duration.value = value
  })

  /**
   * @description 当前播放时长
   */
  const currentTime = ref(playerCore.currentTime)
  playerCore.emitter.on('onCurrentTimeChange', (value) => {
    currentTime.value = value
  })

  /**
   * @description 当前歌曲播放模式
   */
  const currentMode = ref(playerCore.currentMode)
  playerCore.emitter.on('modeChange', (value) => {
    currentMode.value = value
  })

  /**
   * @description 当前播放歌曲
   */
  const currentSong = ref(playerCore.currentSong)
  playerCore.emitter.on('toggle:song', (value) => {
    currentSong.value = value
  })

  playerCore.emitter.on('like:song', (like) => {
    currentSong.value.like = like
  })

  /**
   * @description 歌曲列表
   */
  const playList = ref(playerCore.playList)

  playerCore.emitter.on('playListChange', (value) => {
    playList.value = [...value]
  })

  /**
   * @description 显示播放列表
   */
  const showList = ref(playerCore.showList)

  function showListUpdatePlayerCore () {
    if (showList.value !== playerCore.showList) {
      showList.value = playerCore.showList
    }
  }

  playerCore.emitter.on('showListChange', showListUpdatePlayerCore)

  watch(showList, (value) => {
    playerCore.showList = value
  })

  /**
   * @description 音量
   */
  const volume = ref(playerCore.volume)

  function volumeRefUpdatePlayerCore () {
    if (volume.value !== playerCore.volume) {
      volume.value = playerCore.volume
    }
  }

  playerCore.emitter.on('volumechange', volumeRefUpdatePlayerCore)

  watch(volume, (value) => {
    playerCore.volume = value
  })

  /**
   * @description 声音进度条是否显示
   */
  const isHover = ref(playerCore.isHover)

  function isHoverUpdatePlayerCore () {
    if (isHover.value !== playerCore.isHover) {
      isHover.value = playerCore.isHover
    }
  }

  playerCore.emitter.on('isHoverchange', isHoverUpdatePlayerCore)

  watch(isHover, (value) => {
    playerCore.isHover = value
  })

  /**
   * @description 声音进度条是否还在被拖拽
   */
  const voiceDrag = ref(playerCore.voiceDrag)

  function voiceDragUpdatePlayerCore () {
    if (voiceDrag.value !== playerCore.voiceDrag) {
      voiceDrag.value = playerCore.voiceDrag
    }
  }

  playerCore.emitter.on('voiceDragchange', voiceDragUpdatePlayerCore)

  watch(voiceDrag, (value) => {
    playerCore.voiceDrag = value
  })

  /**
   * @description 音乐进度条是否还在被拖拽
   */
  const musicDrag = ref(playerCore.musicDrag)

  function musicDragUpdatePlayerCore () {
    if (musicDrag.value !== playerCore.musicDrag) {
      musicDrag.value = playerCore.musicDrag
    }
  }

  playerCore.emitter.on('musicDragchange', musicDragUpdatePlayerCore)

  watch(musicDrag, (value) => {
    playerCore.musicDrag = value
  })

  /**
   * @description 静音
   */
  const muted = ref(playerCore.muted)

  function mutedRefUpdatePlayerCore () {
    if (muted.value !== playerCore.muted) {
      muted.value = playerCore.muted
    }
  }

  playerCore.emitter.on('mutedchange', mutedRefUpdatePlayerCore)

  watch(muted, (value) => {
    playerCore.muted = value
  })

  /**
   * @description 播放进度
   */
  const progress = ref(playerCore.progress)

  function progressRefUpdatePlayerCore () {
    if (progress.value !== playerCore.progress) {
      progress.value = playerCore.progress
    }
  }

  playerCore.emitter.on('timeupdate', progressRefUpdatePlayerCore)
  playerCore.emitter.on('durationChange', progressRefUpdatePlayerCore)

  watch(progress, (value) => {
    playerCore.progress = value
  })

  /**
   * @description 旋转度数
   */
  const rotateValue = ref(playerCore.rotateValue)

  function rotateValueUpdatePlayerCore () {
    if (rotateValue.value !== playerCore.rotateValue) {
      rotateValue.value = playerCore.rotateValue
    }
  }

  playerCore.emitter.on('rotateValueChange', rotateValueUpdatePlayerCore)
  playerCore.emitter.on('toggle:song', () => {
    rotateValue.value = 0
  })

  watch(rotateValue, (value) => {
    playerCore.rotateValue = value
  })

  // function
  function add0 (value) {
    return value >= 10 ? value + '' : '0' + value
  }

  function formatTime (value) {
    const min = Math.floor(value / 60)
    const sec = Math.floor(value % 60)
    return `${add0(min)}:${add0(sec)}`
  }

  // computed
  const durationText = computed(() => formatTime(duration.value))
  const currentText = computed(() => formatTime(currentTime.value))
  const timeBar = computed(() => `${currentText.value}/${durationText.value}`)
  const rotate = computed(() => `rotate(${rotateValue.value}deg)`)
  const voiceShow = computed(() => isHover.value || voiceDrag.value)
  const volumeValue = computed({
    get () {
      return muted.value === true ? 0 : volume.value
    },
    set (value) {
      if (muted.value === false) volume.value = value
    }
  })

  // 颜色处理
  const darkColor = useCssVar(ThemeDarkColor)
  const lightColor = useCssVar(ThemeLightColor)

  function updateColor (_currentSong, lastSong) {
    if (lastSong && lastSong.theme === _currentSong.theme) return
    darkColor.value = lightDarkenColor(`#${_currentSong.theme}`, -70)
    lightColor.value = '#' + _currentSong.theme
  }

  watch(currentSong, updateColor, { immediate: true })

  return {
    // attrs
    playerState,
    rotate,
    currentMode,
    currentSong,
    progress,
    timeBar,
    volumeValue,
    voiceShow,
    muted,
    playList,
    showList,

    // methods
    toggleMute: playerCore.toggleMute.bind(playerCore),
    handleLike: playerCore.handleLike.bind(playerCore),
    toggleMode: playerCore.toggleMode.bind(playerCore),
    toPerv: playerCore.toPerv.bind(playerCore),
    toggle: playerCore.toggle.bind(playerCore),
    toNext: playerCore.toNext.bind(playerCore),
    handleListPlay: playerCore.handleListPlay.bind(playerCore),
    loop: playerCore.loop.bind(playerCore),
    toggleList: playerCore.toggleList.bind(playerCore),
    voiceMouseEnter: playerCore.voiceMouseEnter.bind(playerCore),
    voiceMouseLeave: playerCore.voiceMouseLeave.bind(playerCore),
    updatevoiceDrag: playerCore.updatevoiceDrag.bind(playerCore),
    updatemusicDrag: playerCore.updatemusicDrag.bind(playerCore)
  }
}
