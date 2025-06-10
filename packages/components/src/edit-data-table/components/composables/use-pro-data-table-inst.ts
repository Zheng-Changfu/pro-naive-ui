import type { ProDataTableInst } from '../../../data-table'
import { ref } from 'vue'

export function useProDataTableInst() {
  const proDataTableInst = ref<ProDataTableInst>()

  return {
    proDataTableInst,
    clearSorter: () => proDataTableInst.value?.clearSorter(),
    clearFilter: () => proDataTableInst.value?.clearFilter(),
    clearFilters: () => proDataTableInst.value?.clearFilters(),
    page: (page: number) => proDataTableInst.value?.page(page),
    filter: (filters: any) => proDataTableInst.value?.filter(filters),
    filters: (filters: any) => proDataTableInst.value?.filters(filters),
    downloadCsv: (options?: any) => proDataTableInst.value?.downloadCsv(options),
    scrollTo: (...args: any[]) => (proDataTableInst.value?.scrollTo as any)(...args),
    sort: (columnKey: any, order: any) => proDataTableInst.value?.sort(columnKey, order),
  }
}
