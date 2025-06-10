import type { Simplify } from 'type-fest'
import type { UnwrapRef } from 'vue'
import { computed, unref } from 'vue'
import { keysOf } from '../_utils/keys-of'
import { simplyOmit } from '../_utils/simply-omit'

export function useOmitProps<T extends object, K extends keyof UnwrapRef<T>>(
  props: T,
  excludeProps: Record<K, any>,
) {
  const excludePropKeys = keysOf(excludeProps)
  return computed(() => {
    return simplyOmit(
      unref(props),
      excludePropKeys as any,
    ) as unknown as Simplify<Partial<Omit<UnwrapRef<T>, K>>>
  })
}
