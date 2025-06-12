import type { MaybeRef } from 'vue'
import { createInjectionKey } from '../../../composables/create-injection-key'

export const proFieldConfigInjectionKey = createInjectionKey<{
  readonly?: MaybeRef<boolean | undefined>
  showLabel?: MaybeRef<boolean | undefined>
}>('pro-field-config')
