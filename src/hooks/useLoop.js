import { computed, ref, inject } from 'vue'

export function useLoop () {
  const playerCore = inject('playerCore')
  const rotateValue = ref(0)

  playerCore.emitter.on('toggle:song', () => {
    rotateValue.value = 0
  })

  function roll () {
    if (playerCore.playerState === 'play') {
      rotateValue.value++
    }
    loop()
  }

  let timer = null

  function loop () {
    timer = setTimeout(() => {
      clearTimeout(timer)
      roll()
    }, 40)
  }

  loop()

  const rotate = computed(() => `rotate(${rotateValue.value}deg)`)

  return {
    rotate
  }
}
