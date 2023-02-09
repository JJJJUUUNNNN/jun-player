import { ref, computed } from "vue";
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
      if (this.duration == this.currentTime) {
        this.toNext();
      }
      this.emitter.emit("timeupdate");
    });
    this.audio.addEventListener("ended", () => {
      console.log("end");
      this.playerState.value = "pause";
      this.emitter.emit("ended");
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

  _playerState = "pause";

  get playerState() {
    return this._playerState;
  }

  set playerState(value) {
    this._playerState = value;
    this.emitter.emit("playerStateChange", value);
  }

  _playList = ref([]);

  _songIndex = ref(-1);

  _likeOrNot = ref(false);

  _modeList = ref([]);

  _modeListIndex = ref(0);

  _currentMode = ref("");

  _volume = ref(this.audio.volume);

  get volume() {
    return this._volume.value;
  }

  set volume(value) {
    if (value == this._volume.value) return;
    this._volume.value = value;
    this.audio.volume = value;
  }

  get songIndex() {
    return this._songIndex.value;
  }

  set songIndex(_songIndex) {
    if (_songIndex == this._songIndex.value) return;
    this._songIndex.value = _songIndex;
    this.audio.src = this.src;
  }

  get playList() {
    return this._playList.value;
  }

  set playList(_playList) {
    this._playList.value = _playList;
  }

  get currentSong() {
    return this.playList[this.songIndex];
  }

  get src() {
    return `/music/${this.currentSong.name}-${this.currentSong.author}.mp3`;
  }

  /**
   * @description 音频时长
   * @type { number }
   * @private
   */
  _currentTime = 0;

  get currentTime() {
    return this._currentTime;
  }

  set currentTime(value) {
    this._currentTime = value;
    if (this.audio.currentTime != value) {
      this.audio.currentTime = value;
    }
    this.emitter.emit("onCurrentTimeChange", value);
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

  get progress() {
    return this.duration === 0 ? 0 : this.currentTime / this.duration;
  }

  set progress(value) {
    if(value!=this.currentTime / this.duration)
      this.currentTime = value * this.duration;
  }

  get likeOrNot() {
    return this._likeOrNot.value;
  }

  set likeOrNot(_likeOrNot) {
    this._likeOrNot.value = _likeOrNot;
  }

  get modeList() {
    return this._modeList.value;
  }

  set modeList(_modeList) {
    this._modeList.value = _modeList;
  }

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
    if (this.likeOrNot == false) {
      this.likeOrNot = true;
    } else {
      this.likeOrNot = false;
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
