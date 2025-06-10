import type { ComputedRef } from 'vue'
import type { ProModalProps } from '../props'
import { useClickPosition } from 'vooks'
import { ref, watch } from 'vue'

export function useCaptureOpenModalElementPosition(props: ComputedRef<ProModalProps>) {
  const clickPosition = useClickPosition()
  const elementPosition = ref<{ x: number, y: number } | null>(null)

  watch(
    () => props.value.show,
    (value) => {
      if (value && clickPosition.value) {
        const { x, y } = clickPosition.value
        elementPosition.value = {
          x,
          y,
        }
      }
    },
    { immediate: true },
  )

  return {
    position: elementPosition,
  }
}
