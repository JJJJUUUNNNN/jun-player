import { ref } from "vue";
import { EventEmitter } from "./EventEmitter";

export class PlayerCore {
  audio = document.createElement("audio");
  emitter = new EventEmitter();

  /**
   * @param { {playList:any,modeList:any} } options
   */
  constructor(options) {
    this.playList = options.playList || [];
    this.modeList = options.modeList || [];
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
      console.log(["timeupdate"]);
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
    console.log('33',value)
    if (value == this._songIndex) return;
    this._songIndex = value;
    this.audio.src = this.src;
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
      console.log("set currentTime");
      this._currentTime = value;
      this.emitter.emit("onCurrentTimeChange", value);
      if (this.audio.currentTime != value) {
        console.log("currentTime change this.audio.currentTime");
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
      console.log("set progress");
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

  _modeList = ref([]);

  get modeList() {
    return this._modeList.value;
  }

  set modeList(_modeList) {
    this._modeList.value = _modeList;
  }

  _modeListIndex = ref(0);

  get modeListIndex() {
    return this._modeListIndex.value;
  }

  set modeListIndex(_modeListIndex) {
    this._modeListIndex.value = _modeListIndex;
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

  toNext() {
    this.pause();
    if (this.modeListIndex == 0) {
      if (this.songIndex == this.playList.length - 1) {
        this.songIndex = 0;
      } else {
        this.songIndex++;
      }
    } else if (this.modeListIndex == 1) {
      this.songIndex = this.songIndex;
    } else if (this.modeListIndex == 2) {
      this.songIndex = this.getRandomInt(this.playList.length);
    }
    this.play();
    this.emitter.emit("play:next");
    this.emitter.emit("toggle:song");
  }

  toPerv() {
    this.pause();
    if (this.songIndex == 0) {
      this.songIndex = this.playList.length - 1;
    } else {
      this.songIndex--;
    }
    this.play();
    this.emitter.emit("play:perv");
    this.emitter.emit("toggle:song");
  }

  handleLike() {
    if (this.like == false) {
      this.like = true;
    } else {
      this.like = false;
    }
  }

  handleMode() {
    if (this.modeListIndex + 1 == this.modeList.length) {
      this.modeListIndex = 0;
    } else {
      this.modeListIndex++;
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
