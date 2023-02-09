import { computed, inject, ref, onBeforeUnmount, unref } from "vue";
import { PlayerCore } from "../PlayerCore";
export function usePlayer() {
  /**
   * @type { PlayerCore }
   */
  const playerCore = inject("playerCore");
  const state = ref(playerCore.playerState);
  playerCore.emitter.on("playerStateChange", (value) => {
    state.value = value;
  });

  return {
    state
  }
}
