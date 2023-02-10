import { ref } from "vue";
import { EventEmitter } from "./EventEmitter";
import loop from "@/assets/icon/list-loop.png";
import single from "@/assets/icon/single-play.png";
import random from "@/assets/icon/random-play.png";

export class PlayerCore {
  audio = document.createElement("audio");
  emitter = new EventEmitter();

  /**
   * @param { {playList:any} } options
   */
  constructor(options) {
    this.playList = options.playList || [];
    this.songIndex = 0;
    this.audio.controls = true;
    document.body.appendChild(this.audio);
    this.initAudioEvents();
  }

  initAudioEvents() {
    this.audio.addEventListener("canplay", () => {
      this.duration = this.audio.duration;
      this.emitter.emit("canplay");
    });
    this.audio.addEventListener("timeupdate", () => {
      this.currentTime = this.audio.currentTime;
      this.emitter.emit("timeupdate");
    });
    this.audio.addEventListener("ended", () => {
      this.playerState = "pause";
      this.emitter.emit("ended");
      if (this.duration == this.currentTime) {
        this.toNext();
      }
    });

    this.audio.addEventListener("pause", () => {
      this.emitter.emit("pause");
    });
    this.audio.addEventListener("play", () => {
      this.emitter.emit("play");
    });

    this.audio.addEventListener("volumechange", () => {
      this.volume = this.audio.volume;
      this.emitter.emit("volumechange");
    });
  }

  /**
   * @description 播放状态
   * @type { string }
   * @private
   */
  _playerState = "pause";

  get playerState() {
    return this._playerState;
  }

  set playerState(value) {
    this._playerState = value;
    this.emitter.emit("playerStateChange", value);
  }

  /**
   * @description 歌曲索引
   * @type { number }
   * @private
   */
  _songIndex = -1;

  get songIndex() {
    return this._songIndex;
  }

  set songIndex(value) {
    if (value != this._songIndex) {
      this._songIndex = value;
      this.audio.src = this.src;
    }
  }

  _playList = ref([]);

  get playList() {
    return this._playList.value;
  }

  set playList(_playList) {
    this._playList.value = _playList;
  }

  get currentSong() {
    return this.playList[this.songIndex];
  }

  /**
   * @description 歌曲路径
   * @type { string }
   */
  get src() {
    return `/music/${this.currentSong.name}-${this.currentSong.author}.mp3`;
  }

  /**
   * @description 当前时间
   * @type { number }
   * @private
   */
  _currentTime = 0;

  get currentTime() {
    return this._currentTime;
  }

  set currentTime(value) {
    if (this._currentTime != value) {
      this._currentTime = value;
      this.emitter.emit("onCurrentTimeChange", value);
      if (this.audio.currentTime != value) {
        this.audio.currentTime = value;
      }
    }
  }

  /**
   * @description 音频时长
   * @type { number }
   * @private
   */
  _duration = 0;

  get duration() {
    return this._duration;
  }

  set duration(value) {
    this._duration = value;
    this.emitter.emit("durationChange", value);
  }

  /**
   * @description 进度条比率
   *
   */
  get progress() {
    return this.duration === 0 ? 0 : this.currentTime / this.duration;
  }

  set progress(value) {
    if (value != this.currentTime / this.duration) {
      this.currentTime = value * this.duration;
    }
  }

  /**
   * @description 音量
   * @type { number }
   * @private
   */
  _volume = this.audio.volume;

  get volume() {
    return this._volume;
  }

  set volume(value) {
    if (value == this._volume) return;
    this._volume = value;
    this.audio.volume = value;
  }

  /**
   * @description 喜欢音乐
   * @type { boolean }
   * @private
   */
  _like = false;

  get like() {
    return this._like;
  }

  set like(value) {
    this._like = value;
    this.emitter.emit("likeChange", value);
  }

  get modeList() {
    return [
      {
        name: "列表循环",
        key: "loop",
        icon: loop,
      },
      {
        name: "1111",
        key: "single",
        icon: single,
      },
      {
        name: "111",
        key: "random",
        icon: random,
      },
    ];
  }

  _modeListIndex = 0;

  get modeListIndex() {
    return this._modeListIndex;
  }

  set modeListIndex(_modeListIndex) {
    this._modeListIndex = _modeListIndex;
    this.emitter.emit("modeChange", _modeListIndex);
  }

  get currentMode() {
    return this.modeList[this.modeListIndex];
  }

  play() {
    this.playerState = "play";
    this.audio.play();
  }

  pause() {
    this.playerState = "pause";
    this.audio.pause();
  }

  toggle() {
    this.playerState == "play" ? this.pause() : this.play();
  }

  reset() {
    this.currentTime = 0;
  }

  getNextSongIndex() {
    if (this.currentMode.key == "loop") {
      if (this.songIndex == this.playList.length - 1) {
        return 0;
      } else {
        return this.songIndex + 1;
      }
    } else if (this.currentMode.key == "single") {
      return undefined;
    } else if (this.currentMode.key == "random") {
      return this.getRandomIndex();
    }
  }

  toNext() {
    this.pause();
    const nextSongIndex = this.getNextSongIndex();
    if (nextSongIndex != undefined) {
      this.songIndex = this.getNextSongIndex();
    }
    this.play();
    this.emitter.emit("play:next");
    this.emitter.emit("toggle:song");
  }

  getPervSongIndex() {
    if (this.currentMode.key == "loop") {
      if (this.songIndex == 0) {
        return this.playList.length - 1;
      } else {
        return this.songIndex - 1;
      }
    } else if (this.currentMode.key == "single") {
      return undefined;
    } else if (this.currentMode.key == "random") {
      return this.getRandomIndex();
    }
  }

  toPerv() {
    this.pause();
    const prevSongIndex = this.getPervSongIndex();
    if (prevSongIndex != undefined) {
      this.songIndex = this.getPervSongIndex();
    }
    this.play();
    this.emitter.emit("play:perv");
    this.emitter.emit("toggle:song");
  }

  handleLike() {
    this.like = !this.like;
  }

  toggleMode() {
    if (this.modeListIndex + 1 == this.modeList.length) {
      this.modeListIndex = 0;
    } else {
      this.modeListIndex++;
    }
  }

  getRandomIndex() {
    return Math.floor(Math.random() * this.playList.length);
  }
}
