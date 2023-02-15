<script setup>
import { usePlayer } from "@/hooks/usePlayer";
const { playList, like,handleLike } = usePlayer();
</script>

<template>
  <div class="music-list">
    <table class="music-list-table">
      <thead>
        <tr>
          <td></td>
          <td>歌曲名</td>
          <td>歌手</td>
          <td>时长</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in playList">
          <td @click="handleLike(item.id)">
            {{ item.like }} || {{ like }}
            <svg-icon
              v-model="like"
              :name="item.like?'like':'unlike'"
              size="20px"
              class="player-button"
            ></svg-icon>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.music-list table {
  width: 360px;
  padding: 10px;
}

tr:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
