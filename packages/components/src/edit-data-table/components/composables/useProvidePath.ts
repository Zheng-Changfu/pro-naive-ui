import type { ToRef } from 'vue'
import { providePath, providePathIndex, useInjectListField } from 'pro-composables'
import { computed } from 'vue'

export function useProvidePath(rowIndex: ToRef<number>) {
  const parent = useInjectListField()!

  const path = computed(() => {
    return [
      ...parent.path.value, // list path
      String(rowIndex.value),
    ]
  })

  providePath(path)
  providePathIndex(rowIndex)
  return {
    path,
  }
}
