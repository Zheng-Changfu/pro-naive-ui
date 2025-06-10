import type { RowKey } from 'naive-ui/es/data-table/src/interface'
import type { InternalEditDataTableProps } from '../../props'
import { computed } from 'vue'
import { call } from '../../../_utils/call'

/**
 * 本质上是控制 'readonly' 属性的变化
 */
export function useEditable(props: InternalEditDataTableProps) {
  const editableKeys = computed<Set<RowKey>>({
    get() {
      return new Set([...(props.editableKeys ?? [])])
    },
    set(keys) {
      const {
        onUpdateEditableKeys,
        'onUpdate:editableKeys': _onUpdateEditableKeys,
      } = props
      if (onUpdateEditableKeys) {
        call(onUpdateEditableKeys, Array.from(keys))
      }
      if (_onUpdateEditableKeys) {
        call(_onUpdateEditableKeys, Array.from(keys))
      }
    },
  })

  return {
    editableKeys,
  }
}
