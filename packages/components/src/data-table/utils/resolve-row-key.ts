import type { CreateRowKey } from 'naive-ui/es/data-table/src/interface'
import { get, isFunction } from 'lodash-es'

export function resolveRowKey(row: any, rowKey: string | undefined | CreateRowKey<any>) {
  if (!rowKey) {
    return rowKey
  }
  if (isFunction(rowKey)) {
    return rowKey(row)
  }
  return get(row, rowKey)
}
