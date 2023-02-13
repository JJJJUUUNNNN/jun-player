<script setup>
import { usePlayer } from '@/hooks/usePlayer';
import { LightDarkenColor } from '@/utils';
const {playList,currentSong} =usePlayer()
</script>

<template>
   <div class="music-list">
      <table :style="{color:LightDarkenColor(`#${currentSong.theme}`,-70)}">
        <thead>
          <tr>
            <td> </td>
            <td>歌曲名</td>
            <td>歌手</td>
            <td>时长</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in playList">
            <td>
              <svg-icon name="unlike" size="20px" :style="{color:LightDarkenColor(`#${currentSong.theme}`,-70)}"></svg-icon>
            </td>
            <td>{{item.name}}</td>
            <td>{{item.author}}</td>
            <td>{{item.duration}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<style scoped>
  .music-list table{
    width: 360px;
    padding: 10px;
  }
</style>
