import type { RowKey } from 'naive-ui/es/data-table/src/interface'
import type { WritableComputedRef } from 'vue'
import type { ProEditDataTableInst } from './inst'
import { inject, provide } from 'vue'
import { createInjectionKey } from '../composables/create-injection-key'

export const editDataTableInjectionKey = createInjectionKey<{
  editableKeys: WritableComputedRef<Set<RowKey>>
}>('edit-data-table')

export const proEditDataTableInstInjectionKey = createInjectionKey<ProEditDataTableInst>('pro-edit-data-table')

export function provideProEditDataTableInst(inst: ProEditDataTableInst) {
  provide(proEditDataTableInstInjectionKey, inst)
}

export function useInjectProEditDataTableInst() {
  return inject(proEditDataTableInstInjectionKey)
}
