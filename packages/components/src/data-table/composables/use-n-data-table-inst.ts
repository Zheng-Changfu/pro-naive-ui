import type { DataTableInst } from 'naive-ui'
import { ref } from 'vue'

export function useNDataTableInst() {
  const nDataTableInst = ref<DataTableInst>()

  return {
    nDataTableInst,
    clearSorter: () => nDataTableInst.value?.clearSorter(),
    clearFilter: () => nDataTableInst.value?.clearFilter(),
    clearFilters: () => nDataTableInst.value?.clearFilters(),
    page: (page: number) => nDataTableInst.value?.page(page),
    filter: (filters: any) => nDataTableInst.value?.filter(filters),
    filters: (filters: any) => nDataTableInst.value?.filters(filters),
    downloadCsv: (options?: any) => nDataTableInst.value?.downloadCsv(options),
    scrollTo: (...args: any[]) => (nDataTableInst.value?.scrollTo as any)(...args),
    sort: (columnKey: any, order: any) => nDataTableInst.value?.sort(columnKey, order),
  }
}
