import { EventEmitter } from './EventEmitter'
import loop from '@/assets/icon/list-loop.png'
import single from '@/assets/icon/single-play.png'
import random from '@/assets/icon/random-play.png'
import { getItem, setItem } from './utils'
export const VOLUME_MUTED = 'volume_muted'
export const PLAYER_VOLUME = 'player_volume'
export const PLAYER_LAST_VOLUME = 'PLAYER_LAST_VOLUME'
/**
 *
 * @param {boolean} value
 */
function setCacheMuted (value) {
  setItem(VOLUME_MUTED, value === true ? '1' : '0')
}

function getCacheMuted () {
  return !!Number(getItem(VOLUME_MUTED))
}

// on{aaaa}Change
/**
 * @typedef {{name:string;key:string;icon:string}} ModeType
 */
export class PlayerCore {
  audio = document.createElement('audio')
  emitter = new EventEmitter()
  /**
   * @param { {playList:any} } options
   */
  constructor (options) {
    this.playList = options.playList || []
    this.songIndex = 0
    this.audio.controls = true
    document.body.appendChild(this.audio)
    this.initPlayer()
    this.initAudioEvents()
  }

  initPlayer () {
    const volumeCache = getItem(PLAYER_VOLUME)
    const mutedCache = getCacheMuted()
    if (volumeCache != null) {
      this.audio.volume = Number(volumeCache)
    }
    if (this.audio.muted !== mutedCache) {
      this.audio.muted = mutedCache
    }
  }

  initAudioEvents () {
    this.audio.addEventListener('canplay', () => {
      this.duration = this.audio.duration
      this.emitter.emit('canplay')
    })
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime
      this.emitter.emit('timeupdate')
    })
    this.audio.addEventListener('ended', () => {
      this.playerState = 'pause'
      this.emitter.emit('ended')
      if (this.duration == this.currentTime) {
        this.toNext()
      }
    })

    this.audio.addEventListener('pause', () => {
      this.playerState = 'pause'
    })

    this.audio.addEventListener('play', () => {
      this.playerState = 'play'
    })

    this.audio.addEventListener('volumechange', () => {
      if (this.volume != this.audio.volume) {
        this.volume = this.audio.volume
        this.emitter.emit('volumechange')
      }
      if (this.muted != this.audio.muted) {
        this.muted = this.audio.muted
        this.emitter.emit('mutedChange')
      }
    })
  }

  /**
   * @description 播放状态
   * @type { string }
   * @private
   */
  _playerState = 'pause'

  get playerState () {
    return this._playerState
  }

  set playerState (value) {
    this._playerState = value
    this.emitter.emit('playerStateChange', value)
  }

  /**
   * @description 歌曲索引
   * @type { number }
   * @private
   */
  _songIndex = -1

  get songIndex () {
    return this._songIndex
  }

  set songIndex (value) {
    if (value != this._songIndex) {
      this._songIndex = value
      this.audio.src = this.src
    }
  }

  /**
   * @description 歌曲列表
   * @type { Array }
   * @private
   */
  _playList = []

  get playList () {
    return this._playList
  }

  set playList (value) {
    if (this._playList != value) {
      this._playList = value
      this.emitter.emit('playListChange', value)
    }
  }

  /**
   * @description 当前歌曲
   * @type { object }
   */
  get currentSong () {
    return { ...this.playList[this.songIndex] }
  }

  /**
   * @description 歌曲路径
   * @type { string }
   */
  get src () {
    return this.currentSong.songUrl
  }

  /**
   * @description 当前时间
   * @type { number }
   * @private
   */
  _currentTime = 0

  get currentTime () {
    return this._currentTime
  }

  set currentTime (value) {
    if (this._currentTime != value) {
      this._currentTime = value
      this.emitter.emit('currentTimeChange', value)
      if (this.audio.currentTime != value) {
        this.audio.currentTime = value
      }
    }
  }

  /**
   * @description 音频时长
   * @type { number }
   * @private
   */
  _duration = 0

  get duration () {
    return this._duration
  }

  set duration (value) {
    this._duration = value
    this.emitter.emit('durationChange', value)
  }

  /**
   * @description 进度条比率
   *
   */
  get progress () {
    return this.duration === 0 ? 0 : this.currentTime / this.duration
  }

  set progress (value) {
    if (value != this.currentTime / this.duration) {
      this.currentTime = value * this.duration
    }
  }

  /**
   * @description 音量
   * @type { number }
   * @private
   */
  _volume = Number(getItem(PLAYER_VOLUME)) || this.audio.volume

  get volume () {
    return this._volume
  }

  set volume (value) {
    if (value == this._volume) return
    this._volume = value
    this.lastVolume = value
    this.audio.volume = value
    setItem(PLAYER_VOLUME, value)
  }

  _lastVolume = Number(getItem(PLAYER_LAST_VOLUME || 1))

  get lastVolume () {
    return this._lastVolume
  }

  set lastVolume (value) {
    if (value == 0) return
    setItem(PLAYER_LAST_VOLUME, value)
  }

  /**
   * @description 静音
   * @type { boolean }
   * @private
   */
  _muted = getCacheMuted()

  get muted () {
    return this._muted
  }

  set muted (value) {
    if (value == this._muted) return
    this._muted = value
    this.audio.muted = value
    setCacheMuted(value)
  }

  /**
   * @description 播放模式列表
   * @type { ModeType[] }
   */
  get modeList () {
    return [
      {
        name: '列表循环',
        key: 'loop',
        icon: loop
      },
      {
        name: '单曲循环',
        key: 'single',
        icon: single
      },
      {
        name: '随机播放',
        key: 'random',
        icon: random
      }
    ]
  }

  /**
   * @description 播放模式索引
   * @type { number }
   * @private
   */
  _modeListIndex = 0

  get modeListIndex () {
    return this._modeListIndex
  }

  set modeListIndex (value) {
    this._modeListIndex = value
  }

  /**
   * @description 当前播放模式
   * @type { ModeType }
   */
  get currentMode () {
    return this.modeList[this.modeListIndex]
  }

  // methods
  /**
   *@description 播放
   * @param {number} index
   */
  play (index = this.songIndex) {
    if (index != this.songIndex) this.songIndex = index
    this.playerState = 'play'
    this.audio.play()
  }

  /**
   *@description 暂停
   */
  pause () {
    this.playerState = 'pause'
    this.audio.pause()
  }

  /**
   *@description 切换播放暂停
   */
  toggle () {
    this.playerState == 'play' ? this.pause() : this.play()
  }

  /**
   *@description 重置当前时间
   */
  reset () {
    this.currentTime = 0
  }

  /**
   *@description 获取下一首歌的索引
   */
  getNextSongIndex () {
    if (this.currentMode.key == 'loop') {
      if (this.songIndex == this.playList.length - 1) {
        return 0
      } else {
        return this.songIndex + 1
      }
    } else if (this.currentMode.key == 'single') {
      return undefined
    } else if (this.currentMode.key == 'random') {
      return this.getRandomIndex()
    }
  }

  /**
   *@description 切到下一首
   */
  toNext () {
    this.reset()
    this.pause()
    const nextSongIndex = this.getNextSongIndex()
    if (nextSongIndex != undefined) {
      this.songIndex = this.getNextSongIndex()
    }
    setTimeout(() => {
      this.play()
    }, 500)
    this.emitter.emit('play:next')
    this.emitter.emit('toggle:song', this.currentSong)
  }

  /**
   *@description 获取上一首歌的索引
   */
  getPervSongIndex () {
    if (this.currentMode.key == 'loop') {
      if (this.songIndex == 0) {
        return this.playList.length - 1
      } else {
        return this.songIndex - 1
      }
    } else if (this.currentMode.key == 'single') {
      return undefined
    } else if (this.currentMode.key == 'random') {
      return this.getRandomIndex()
    }
  }

  /**
   *@description 切到上一首
   */
  toPerv () {
    this.reset()
    this.pause()
    const prevSongIndex = this.getPervSongIndex()
    if (prevSongIndex != undefined) {
      this.songIndex = this.getPervSongIndex()
    }
    setTimeout(() => {
      this.play()
    }, 500)
    this.emitter.emit('play:perv')
    this.emitter.emit('toggle:song', this.currentSong)
  }

  /**
   *@description 喜欢音乐
   */
  handleLike (index = this.songIndex) {
    this.playList[index].like = !this.playList[index].like
    this.emitter.emit('playListChange', this.playList)
    this.emitter.emit('like:song', this.currentSong.like)
  }

  /**
   *@description 列表中播放音乐
   */
  handleListPlay (index = this.songIndex) {
    this.play(index)
    this.emitter.emit('playerStateChange', this.playerState)
    this.emitter.emit('toggle:song', this.currentSong)
  }

  /**
   *@description 切换播放模式
   */
  toggleMode () {
    if (this.modeListIndex + 1 == this.modeList.length) {
      this.modeListIndex = 0
    } else {
      this.modeListIndex++
    }
    this.emitter.emit('modeChange', this.currentMode)
  }

  /**
   *@description 获得随机索引 用于随机模式
   */
  getRandomIndex () {
    return Math.floor(Math.random() * this.playList.length)
  }

  /**
   *@description 切换静音状态
   */
  toggleMute () {
    this.muted = !this.muted
    this.emitter.emit('mutedChange', this.muted)
  }

  destroy () {
    this.audio.remove()
    this.playList = []
  }
}
