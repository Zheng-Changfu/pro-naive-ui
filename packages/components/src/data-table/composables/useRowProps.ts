import type { DataTableRowKey } from 'naive-ui'
import type { ComputedRef, Ref } from 'vue'
import type { ProDataTableProps } from '../props'
import { computed } from 'vue'

interface UseRowPropsOptions {
  clearCheckedRowKeys: () => void
  checkedRowKeys: Ref<DataTableRowKey[]>
  setCheckedRowKeys: (keys: DataTableRowKey[], rows?: any, meta?: any) => void
}

const trKey = '_row-key'
export function useRowProps(props: ComputedRef<ProDataTableProps>, options: UseRowPropsOptions) {
  const {
    checkedRowKeys,
    setCheckedRowKeys,
    clearCheckedRowKeys,
  } = options

  const hasSelectionColumn = computed(() => {
    const { columns = [] } = props.value
    return columns.length > 0 && columns.some(column => column.type === 'selection')
  })

  const isRadioSelectionColumn = computed(() => {
    const { columns = [] } = props.value
    return columns.length > 0 && columns.some(column => column.type === 'selection' && column.multiple === false)
  })

  function rowProps(row: any, index: number) {
    const {
      rowKey,
      rowProps,
      clickRowToSelect,
    } = props.value

    const resolvedRowKey = rowKey ? rowKey(row) : undefined
    const resolvedRowProps = rowProps ? rowProps(row, index) : {}
    if (
      resolvedRowKey === undefined
      || clickRowToSelect === false
      || !hasSelectionColumn.value
    ) {
      return resolvedRowProps
    }
    return {
      ...resolvedRowProps,
      [trKey]: resolvedRowKey,
      onClick: (e: MouseEvent) => {
        resolvedRowProps.onClick?.(e)
        const tr = e.composedPath().find(dom => (dom as HTMLElement).tagName === 'TR') as HTMLElement
        if (!tr) {
          return
        }
        e.stopPropagation()

        if (isRadioSelectionColumn.value) {
          const radioBox = tr.querySelector('input[type=radio]')
          if (radioBox && !radioBox.hasAttribute('disabled')) {
            clearCheckedRowKeys()
            setCheckedRowKeys([resolvedRowKey])
          }
        }
        else {
          const checkBox = tr.querySelector('div[role=checkbox]')
          if (checkBox && [...checkBox.classList].every(className => !className.endsWith('disabled'))) {
            if (!checkedRowKeys.value.includes(resolvedRowKey)) {
              setCheckedRowKeys([...checkedRowKeys.value, resolvedRowKey])
              return
            }
            setCheckedRowKeys(checkedRowKeys.value.filter(key => key !== resolvedRowKey))
          }
        }
      },
    }
  }

  return {
    rowProps,
  }
}
