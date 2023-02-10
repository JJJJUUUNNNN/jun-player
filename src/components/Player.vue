<script setup>
import { provide } from "vue";
import { PlayerCore } from "../PlayerCore";
import PlayerControl from "./PlayerControl.vue";
import PlayerTitle from "./PlayerTitle.vue";
import PlayerAction from "./PlayerAction.vue";
/**
 * @type {PlayerCore}
 */
const playerCore = new PlayerCore({
  playList: [
    {
      name: "勾指起誓言",
      author: "洛天依",
      duration: "3:03",
      cover: "/cover/faith.jpg",
      songUrl:'/public/music/勾指起誓言-洛天依.mp3',
      theme: "fffaf5",
    },
    {
      name: "盛夏的果实",
      author: "莫文蔚",
      duration: "4:10",
      cover: "/cover/summer.jpg",
      songUrl:'/public/music/盛夏的果实-莫文蔚.mp3',
      theme: "c1d3df",
    },
    {
      name: "我的美丽",
      author: "小霞",
      duration: "5:08",
      cover: "/cover/myBeauty.jpg",
      songUrl:'/public/music/我的美丽-小霞.mp3',
      theme: "b7b7b7",
    },
  ],
});

provide("playerCore", playerCore);
</script>

<template>
  <div class="player">
    <PlayerTitle />
    <PlayerControl />
    <PlayerAction />
  </div>
</template>

<style>
.player {
  width: 360px;
  background-color: #333;
  color: #fff;
  opacity: 0.9;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>
