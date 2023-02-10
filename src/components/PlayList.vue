<script setup>
import { usePlayer } from '@/hooks/usePlayer';
const {playList,currentSong} =usePlayer()
</script>

<template>
   <div class="music-list" >
      <table :style="{color:`#${currentSong.theme}`}">
        <thead>
          <tr>
            <td>歌曲名</td>
            <td>歌手</td>
            <td>时长</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in playList">
            <td>{{item.name}}</td>
            <td>{{item.author}}</td>
            <td>{{item.duration}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<style scoped>
  .music-list{
    background-color: #333;
  }
  .music-list table{
    width: 360px;
    padding: 10px;
  }
</style>
