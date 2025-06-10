import type { ComputedRef } from 'vue'
import { createInjectionKey } from '../composables/create-injection-key'

export const proDrawerFormInjectionKey = createInjectionKey<{
  loading: ComputedRef<boolean>
}>('pro-drawer-form')
