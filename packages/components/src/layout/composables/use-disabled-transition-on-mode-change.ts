import type { ComputedRef } from 'vue'
import type { ProLayoutMode } from '../types'
import { nextTick, ref, watch } from 'vue'

export function useDisabledTransitionWhenModeChange(mode: ComputedRef<ProLayoutMode>) {
  const disabled = ref(false)

  watch(mode, () => {
    disabled.value = true
    nextTick(() => {
      disabled.value = false
    })
  })

  return {
    disabled,
  }
}
