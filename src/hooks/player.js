import { PlayerCore } from '@/PlayerCore'

export const playerCore = new PlayerCore({
  playList: [
    {
      name: '勾指起誓言',
      author: '洛天依',
      duration: '3:03',
      cover: '/cover/faith.jpg',
      songUrl: '/music/勾指起誓言-洛天依.mp3',
      theme: 'f6b3d8',
      like: false
    },
    {
      name: '盛夏的果实',
      author: '莫文蔚',
      duration: '4:10',
      cover: '/cover/summer.jpg',
      songUrl: '/music/盛夏的果实-莫文蔚.mp3',
      theme: 'c1d3df',
      like: false
    },
    {
      name: '我的美丽',
      author: '小霞',
      duration: '5:08',
      cover: '/cover/myBeauty.jpg',
      songUrl: '/music/我的美丽-小霞.mp3',
      theme: 'b7b7b7',
      like: false
    }
  ]
})
