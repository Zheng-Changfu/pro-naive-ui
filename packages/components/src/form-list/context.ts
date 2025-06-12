import type { ProFormListInst } from './inst'
import { inject, provide } from 'vue'
import { createInjectionKey } from '../composables/create-injection-key'

const proFormListInstInjectionKey = createInjectionKey<ProFormListInst>('pro-form-list')

export function provideProFormListInst(inst: ProFormListInst) {
  provide(proFormListInstInjectionKey, inst)
}

export function useInjectProFormListInst() {
  return inject(proFormListInstInjectionKey)
}
