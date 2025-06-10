import type { Ref } from 'vue'
import { inject, shallowRef } from 'vue'

const defaultNaiveClsPrefix = 'n'
export function useNaiveClsPrefix(): Ref<string> {
  const NConfigProvider = inject('n-config-provider', null) as any

  return NConfigProvider
    ? NConfigProvider.mergedClsPrefixRef
    : shallowRef(defaultNaiveClsPrefix)
}
