import { nextTick, ref } from "vue";

export class PlayerCore {
  audio = document.createElement('audio')
  // player=document.getElementsByClassName('player-container')
  /**
   * @param { {playList:any} } options 
   */
  constructor(options){
    this.playList = options.playList||[]
    this.songIndex = 0
    this.audio.controls = true
    document.body.appendChild(this.audio)
    this.initAudioEvents()
  }

  initAudioEvents(){
    this.audio.addEventListener('canplay',()=>{
      console.log(this.audio.duration)
    })
    this.audio.addEventListener('timeupdate',()=>{
      console.log(this.audio.currentTime)
      this.currentTime = this.audio.currentTime
      this.progressMax=this.audio.duration
      if(this.progressMax==this.progressValue){
        this.toNext()
      }
    })
    this.audio.addEventListener('ended',()=>{
      console.log('end')
    })
  }


  // 改变index
  playNextSong(){
    //单曲循环
    
    //列表循环

    //随机播放


    // play
  }

  playerState = ref('play')

  _playList = ref([])

  _songIndex = ref(-1)

  _currentTime=ref(0)

  _progressMax=ref(1.0)

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
  }

  get progressMax(){
    return this._progressMax.value
  }

  set progressMax(_progressMax){
    this._progressMax.value=_progressMax
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

  reset(){
    this.playerState.value='play'
  }

  toNext(){
    this.reset()
    if(this.songIndex==this.playList.length-1){
      this.songIndex=0
    }else{
      this.songIndex++
    }
  }

  toPerv(){
    this.reset()
    if(this.songIndex==0){
      this.songIndex=this.playList.length-1
    }else{
      this.songIndex--
    }
  }

}