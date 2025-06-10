import type { CollapseTransitionProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProCardProps } from '../props'
import { computed, ref, watch } from 'vue'

export function useCollapseTransition(props: ComputedRef<ProCardProps>) {
  const show = ref(true)

  function doUpdateShow(val: boolean) {
    show.value = val
  }

  const nCollapseTransitionProps = computed<CollapseTransitionProps>(() => {
    return {
      show: show.value,
      appear: props.value.appear,
    }
  })

  watch(
    () => props.value.show,
    (value) => {
      show.value = value ?? true
    },
    { immediate: true },
  )

  return {
    show,
    doUpdateShow,
    nCollapseTransitionProps,
  }
}
