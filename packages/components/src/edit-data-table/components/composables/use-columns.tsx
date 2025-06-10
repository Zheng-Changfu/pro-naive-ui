import type { RowKey } from 'naive-ui/es/data-table/src/interface'
import type { ProDataTableColumn } from '../../../data-table'
import type { InternalEditDataTableProps } from '../../props'
import type { ProEditDataTableColumns } from '../../types'
import { isNil } from 'lodash-es'
import { eachTree, mapTree, useInjectField } from 'pro-composables'
import { computed } from 'vue'
import { resolveRowKey } from '../../../data-table/utils/resolve-row-key'
import { INDEX, PARENT } from '../const'
import EditDataTableCell from '../edit-data-table-cell'
import { isProEditDataTableBaseColumn } from '../utils/column'

export function useColumns(props: InternalEditDataTableProps) {
  const {
    value: list,
  } = useInjectField(true)!

  const childrenKey = computed(() => {
    return props.childrenKey ?? 'children'
  })

  const rowKeyToRowMap = computed(() => {
    const map = new Map<RowKey, {
      [INDEX]: number
      [PARENT]: Record<string, any>
      row: Record<string, any>
    }>()

    eachTree(list.value, (row, index, info) => {
      const rowKey = resolveRowKey(row, props.rowKey)
      map.set(rowKey, {
        row,
        [INDEX]: index,
        [PARENT]: info.parent,
      })
    }, childrenKey.value)
    return map
  })

  const finalColumns = computed(() => {
    return convertProEditColumnsToProColumns(props.columns ?? [])
  })

  function getColumnFinalPathByRow(row: Record<string, any>, columnKey: string | number | undefined) {
    if (isNil(columnKey)) {
      return undefined
    }
    let rowKey = resolveRowKey(row, props.rowKey)
    let data = rowKeyToRowMap.value.get(rowKey)
    if (!data) {
      return undefined
    }
    const path: string[] = []
    while (data && data[PARENT]) {
      // 树形表格
      path.unshift(childrenKey.value, `${data[INDEX]}`)
      rowKey = resolveRowKey(data[PARENT], props.rowKey)
      data = rowKeyToRowMap.value.get(rowKey)
    }
    path.push(`${columnKey}`)
    return path.join('.')
  }

  function convertProEditColumnsToProColumns(columns: ProEditDataTableColumns): ProDataTableColumn[] {
    const dragSortColumnPath = props.dragSortOptions?.columnPath
    return mapTree(columns, (column) => {
      if (!isProEditDataTableBaseColumn(column, childrenKey.value, dragSortColumnPath)) {
        return column
      }
      const columnKey = column.path ?? column.key
      return {
        ...column,
        render: (row: any, rowIndex) => {
          const rowKey = resolveRowKey(row, props.rowKey)
          const path = getColumnFinalPathByRow(row, columnKey)
          return (
            <EditDataTableCell
              row={row}
              path={path}
              rowKey={rowKey}
              column={column}
              rowIndex={rowIndex}
            />
          )
        },
      }
    }, childrenKey.value as any)
  }

  return {
    columns: finalColumns,
  }
}
