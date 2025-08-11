import { get } from 'lodash-es'
import { computed, inject } from 'vue'
import { enUS } from '../en-us'

export function useLocale(ns?: string) {
  const { mergedLocaleRef } = inject('n-config-provider', null) || {} as any

  const localeRef = computed(() => {
    if (!ns) {
      return mergedLocaleRef?.value ?? enUS
    }
    return mergedLocaleRef?.value?.[ns as any] ?? (enUS as any)[ns as any]
  })

  function translate(key: string, fallback?: string) {
    const locale = localeRef.value
    return get(locale, key, fallback)
  }

  return {
    localeRef,
    t: translate,
  }
}
