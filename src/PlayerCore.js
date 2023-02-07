import { nextTick, ref,computed } from "vue";

export class PlayerCore {
  audio = document.createElement('audio')
  /**
   * @param { {playList:any,modeList:any} } options 
   */
  constructor(options){
    this.playList = options.playList||[]
    this.modeList=options.modeList||[]
    this.songIndex = 0
    this.audio.controls = false
    document.body.appendChild(this.audio)
    this.initAudioEvents()
  }

  initAudioEvents(){
    this.audio.addEventListener('canplay',()=>{
      this.duration=this.audio.duration
    })
    this.audio.addEventListener('timeupdate',()=>{
      this.currentTime = this.audio.currentTime
      if(this.duration==this.currentTime){
        this.toNext()
      }
    })
    this.audio.addEventListener('ended',()=>{
      console.log('end')
      this.playerState.value="pause"
    })

    this.audio.addEventListener('pause',()=>{
      console.log('pause')
    })
    this.audio.addEventListener('play',()=>{
      console.log('play')
    })
  }

  playerState = ref('play')

  _playList = ref([])

  _songIndex = ref(-1)

  _currentTime=ref(0)

  _duration=ref(1.0)

  _likeOrNot=ref(false)

  _modeList=ref([])

  _modeListIndex=ref(0)

  _currentMode=ref('')


  get songIndex(){
    return this._songIndex.value
  }

  set songIndex(_songIndex){
    this._songIndex.value = _songIndex
    nextTick(()=>{
      this.audio.src = this.src
    })
  }

  get playList(){
    return this._playList.value
  }

  set playList(_playList){
    this._playList.value = _playList
  }

  get currentSong(){
    return this.playList[this.songIndex]
  }

  get src(){
    return `/music/${this.currentSong.name}-${this.currentSong.author}.mp3`
  }

  get currentTime(){
    return this._currentTime.value
  }

  set currentTime(_currentTime){
    this._currentTime.value=_currentTime
    if(this.audio.currentTime  != _currentTime){
      this.audio.currentTime=_currentTime
    }
  }

  get duration(){
    return this._duration.value
  }

  set duration(_duration){
    this._duration.value=_duration
    if(this.audio.duration != _duration){
      this.audio.duration=_duration
    }
  }

  get progress(){
    const progress=computed(()=>this.currentTime / this.duration * 100)
    return  progress.value
  }

  set progress(_progress){
    this.currentTime = _progress *  this.duration
    
    console.log('progress:', this.progress)
  }

  get likeOrNot(){
    return this._likeOrNot.value
  }

  set likeOrNot(_likeOrNot){
    this._likeOrNot.value=_likeOrNot
  }

  get modeList(){
    return this._modeList.value
  }

  set modeList(_modeList){
    this._modeList.value=_modeList
  }

  get modeListIndex(){
    return this._modeListIndex.value
  }
  
  set modeListIndex(_modeListIndex){
    this._modeListIndex.value=_modeListIndex
  }

  get currentMode(){
    return this.modeList[this.modeListIndex]
  }

  play(){
    if(this.playerState.value=='play'){
      this.playerState.value='pause'
      this.audio.play()
    }else{
      this.playerState.value='play'
      this.audio.pause()
    }
  }

  autoPlay(){
    if(this.currentTime==0){
      this.playerState.value='play'
      this.audio.play()
    }
  }

  reset(){
    this.currentTime=0
  }

  toNext(){
    // this.reset()
    console.log('99',this.currentTime)
    if(this.songIndex==this.playList.length-1){
      this.songIndex=0
      this.autoPlay()
    }else{
      this.songIndex++
      this.autoPlay()
    }
  }

  toPerv(){
    if(this.songIndex==0){
      this.songIndex=this.playList.length-1
    }else{
      this.songIndex--
    }
  }

  handleLike(){
    if(this.likeOrNot==false){
      this.likeOrNot=true
    }else{
      this.likeOrNot=false
    }
  }

  handleMode(){
    if (this.modeListIndex + 1 == this.modeList.length) {
      this.modeListIndex = 0;
      console.log('列表循环')
    } else {
      this.modeListIndex++;
      if(this.modeListIndex==1){
      console.log('单曲循环')
    }else if(this.modeListIndex==2){
      console.log('随机播放')
    }
    }
  }

}