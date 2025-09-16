import type { DataTableColumn } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import type { ProDataTableColumn } from '../types'
import { mapTree } from 'pro-composables'
import { computed } from 'vue'
import { isDragSortColumn, isExpandColumn, isGroupColumn, isIndexColumn, isSelectionColumn } from '../utils/column'
import { useColumnRenderer } from './use-column-renderer'

interface UseColumnsOptions {
  dragHandleId: string
}
export function useColumns(props: ComputedRef<ProDataTableProps>, options: UseColumnsOptions) {
  const {
    dragHandleId,
  } = options

  const {
    createBaseColumn,
    createIndexColumn,
    renderTooltipTitle,
    createDragSortColumn,
  } = useColumnRenderer({
    props,
    dragHandleId,
  })

  function convertProColumnsToColumns(columns: ProDataTableColumn[]): DataTableColumn[] {
    const childrenKey = props.value.childrenKey ?? 'children'
    const dragSortColumnPath = props.value.dragSortOptions?.columnPath
    return mapTree(columns, (column) => {
      if (isIndexColumn(column)) {
        return createIndexColumn(column)
      }
      if (isSelectionColumn(column)) {
        return column
      }
      if (isExpandColumn(column)) {
        const { title, tooltip, ...rest } = column
        return {
          ...rest,
          title: renderTooltipTitle(title, tooltip),
        }
      }
      if (isGroupColumn(column, childrenKey)) {
        const { title, tooltip, path, key, ...rest } = column
        return {
          ...rest,
          key: path ?? key,
          title: renderTooltipTitle(title, tooltip),
        }
      }
      if (isDragSortColumn(column, dragSortColumnPath)) {
        return createDragSortColumn(column)
      }
      return createBaseColumn(column) as any
    }, childrenKey as any)
  }

  const finalColumns = computed(() => {
    return convertProColumnsToColumns(props.value.columns ?? [])
  })

  return {
    columns: finalColumns,
  }
}
