import type { MaybeRef } from 'vue'
import type { EmptyConfig } from './props'
import { inject, provide } from 'vue'
import { createInjectionKey } from '../composables/create-injection-key'

interface GlobalConfig {
  mergedEmpty: MaybeRef<Required<EmptyConfig>>
  mergedPropOverrides: MaybeRef<Record<string, object>>
}

const globalConfigInjectionKey = createInjectionKey<GlobalConfig>('global-config')

export function provideGlobalConfig(config: GlobalConfig) {
  provide(globalConfigInjectionKey, config)
}

export function useInjectGlobalConfig() {
  return inject(globalConfigInjectionKey, {
    mergedEmpty: {
      form: '-',
      tags: '-',
      table: '-',
      images: '-',
      dateText: '-',
      copyableText: '-',
    },
    mergedPropOverrides: {},
  })
}
