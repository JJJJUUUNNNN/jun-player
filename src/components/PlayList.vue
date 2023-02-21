<script setup>
import { ref } from 'vue'
import { usePlayer } from '@/hooks/usePlayer'
const { playList, handleLike, handleListPlay, currentSong } = usePlayer()

const event = ref(undefined)

document.addEventListener('click', (e) => {
  event.value = e
})
</script>

<template>
  <div class="music-list">
    <ul class="music-list-ul">
      <li class="music-list-title">
        <span></span>
        <span>歌曲名</span>
        <span>歌手</span>
        <span>时长</span>
      </li>
      <li v-for="(item, index) in playList"
          :key="index"
          @click="handleListPlay(index)" :class="{'playing':currentSong.name==item.name}">
          <span @click="handleLike(index,event)">
            <svg-icon
              :name="item.like ? 'like' : 'unlike'"
              size="20px"
              class="player-button"
            ></svg-icon>
          </span>
          <span>{{ item.name }}</span>
          <span>{{ item.author }}</span>
          <span>{{ item.duration }}</span>
        </li>
    </ul>
  </div>
</template>

<style scoped>
.music-list{
  width: 100%;
}
.music-list-ul {
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
}
.music-list-ul li{
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 15px;
}

.music-list-ul li span:nth-child(1){
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.music-list-ul li span:nth-child(2){
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.music-list-ul li span:nth-child(3){
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.music-list-ul li span:nth-child(4){
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.playing{
  background-color: rgba(255, 255, 255, 0.2);
}

li:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
