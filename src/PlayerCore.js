import { nextTick, ref, computed } from "vue";

export class PlayerCore {
  audio = document.createElement("audio");
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
    });
    this.audio.addEventListener("timeupdate", () => {
      this.currentTime = this.audio.currentTime;
      if (this.duration == this.currentTime) {
        this.toNext();
      }
    });
    this.audio.addEventListener("ended", () => {
      console.log("end");
      this.playerState.value = "pause";
    });

    this.audio.addEventListener("pause", () => {
      console.log("pause");
    });
    this.audio.addEventListener("play", () => {
      console.log("play");
    });

    this.audio.addEventListener('volumechange',()=>{
      this.volume = this.audio.volume
    })
  }

  playerState = ref("pause");

  _playList = ref([]);

  _songIndex = ref(-1);

  _currentTime = ref(0);

  _duration = ref(1.0);

  _likeOrNot = ref(false);

  _modeList = ref([]);

  _modeListIndex = ref(0);

  _currentMode = ref("");

  _volume = ref(this.audio.volume)

  get volume (){
    return this._volume.value
  }

  set volume(value){
    if(value == this._volume.value) return
    this._volume.value = value;
    this.audio.volume = value
  }



  get songIndex() {
    return this._songIndex.value;
  }

  set songIndex(_songIndex) {
    if(_songIndex == this._songIndex.value) return
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

  get currentTime() {
    return this._currentTime.value;
  }

  set currentTime(_currentTime) {
    this._currentTime.value = _currentTime;
    if (this.audio.currentTime != _currentTime) {
      this.audio.currentTime = _currentTime;
    }
  }

  get duration() {
    return this._duration.value;
  }

  set duration(_duration) {
    this._duration.value = _duration;
    if (this.audio.duration != _duration) {
      this.audio.duration = _duration;
    }
  }

  get progress() {
    const progress = computed(() => (this.currentTime / this.duration));
    return progress.value;
  }

  set progress(_progress) {
    this.currentTime = _progress * this.duration;
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
    this.playerState.value = "play";
    this.audio.play();
  }

  pause() {
    this.playerState.value = "pause";
    this.audio.pause();
  }

  toggle() {
    this.playerState.value == "play" ? this.pause() : this.play();
  }

  reset() {
    this.currentTime = 0;
  }

  toNext() {
    this.pause();
    if(this.modeListIndex==0){
      if (this.songIndex == this.playList.length - 1) {
        this.songIndex = 0;
      } else {
        this.songIndex++;
      }  
    }else if(this.modeListIndex==1){
      this.songIndex=this.songIndex
    }else if(this.modeListIndex==2){
      this.songIndex=this.getRandomInt(this.playList.length)
    }

    nextTick(() => {
      setTimeout(() => {
        this.play();
      }, 1000);
    });
  }

  toPerv() {
    this.pause();
    if (this.songIndex == 0) {
      this.songIndex = this.playList.length - 1;
    } else {
      this.songIndex--;
    }
    nextTick(() => {
      setTimeout(() => {
        this.play();
      }, 1000);
    });
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
