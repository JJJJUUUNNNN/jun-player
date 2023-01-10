<script setup>
import { ref } from 'vue';
import loop from './assets/icon/list-loop.png'
import single from './assets/icon/single-play.png'
import random from './assets/icon/random-play.png'
const songList=ref([
  {name:'勾指起誓言',author:'洛天依',duration:'3:03'},
  {name:'盛夏的果实',author:'莫文蔚',duration:'4:10'},
  {name:'我的美丽',author:'小霞',duration:'5:08'}
])

const modeList=[loop,single,random]

const isShow=ref(false)

const mode=ref(loop)

function toggleList(){
  isShow.value=!isShow.value
}
function handleMode(i){
  console.log('mode',i)
}
</script>

<template>
  <div class="player-container">
    <div class="player">
      <img class="cover" src="./assets/faith.jpg">
      <div class="player-control">
        <button>
          <img src="./assets/icon/pre.png" alt="">
        </button>
        <button>
          <img src="./assets/icon/play.png" alt="">
        </button>
        <button>
          <img src="./assets/icon/next.png" alt="">
        </button>
      </div>
      <div class="play-info">
        <button class="player-mode-btn" @click="handleMode">
          <img style="width: 25px; height: 25px;" :src="mode" alt="">
        </button>
        <div class="progress">
          <label class="duration" for="music-progress">00:00/03:45</label>
          <progress id="music-progress" max="100" value="70"> 70% </progress>
        </div>
        <button class="list" @click="toggleList">
          <img style="width: 25px; height: 25px;" src="./assets/icon/music-list.png" alt="音乐列表">
        </button>
      </div>
    </div>

    <div class="music-list" v-if="isShow">
      <table>
        <thead>
          <tr>
            <td>歌曲名</td>
            <td>歌手</td>
            <td>时长</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in songList">
            <td>{{item.name}}</td>
            <td>{{item.author}}</td>
            <td>{{item.duration}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
 li {
    list-style: none;
  }
  .player-container {
    padding: 100px 0 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    margin: 0 auto;
    background-color: #F8F9FA;
  }
  .player{
    padding: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: red; */
    border-radius: 10px;
    border: 3px solid #FF9433;
    margin-bottom: 10px;
  }
  .cover{
    width: 90px;
    height: 90px;
    position: absolute;
    border-radius: 50%;
    top: -50px;
    left: 15px;
    border: 3px solid #FF9433;
  }
  .player-control{
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-left: 167px;
    box-sizing: border-box;
    padding-right: 10px;
  }
  .play-info{
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }
  button{
    border: none;
    background: none;
    cursor: pointer;
  }
  button img{
    width: 30px;
    height: 30px;
  }
  .progress{
    width: 250px;
    position: relative;
  }
  .progress progress{
    width: 100%;
  }
  .duration{
    font-size: 10px;
    position: absolute;
    top: -18px;
    left: 0;
  }
  .music-list{
    border-radius: 10px;
    border: 3px solid #4263EB;
  }
  .music-list table{
    border: 1px solid;
    width: 300px;
    color: #4263EB;
    padding: 10px;
  }
  
</style>
