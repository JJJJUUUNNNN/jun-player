import { nextTick, ref,computed } from "vue";

export class PlayerCore {
  audio = document.createElement('audio')
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
      this.duration=this.audio.duration
    })
    this.audio.addEventListener('timeupdate',()=>{
      this.currentTime = this.audio.currentTime
      if(this.duration==this.progressValue){
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

  _duration=ref(1.0)

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

  play(){
    var a = 0
    // const a= (this.currentTime/this.duration)*100 + '%' 
    if(this.playerState.value=='play'){
      this.playerState.value='pause'
      this.audio.play()
    }else{
      this.playerState.value='play'
      this.audio.pause()
    }
  }

  reset(){
    console.log(123)
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