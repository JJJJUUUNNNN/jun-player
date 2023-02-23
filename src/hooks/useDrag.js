import { ref } from 'vue'

export function useDrag () {
  const isDrag = ref(false)

  function updateIsDrag (val) {
    isDrag.value = val
  }

  return {
    isDrag,
    updateIsDrag
  }
}
