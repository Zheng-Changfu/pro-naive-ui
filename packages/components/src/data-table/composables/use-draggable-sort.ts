import type { SortableOptions } from 'sortablejs'
import type { ComputedRef } from 'vue'
import type { ProDataTableProps } from '../props'
import { isNil } from 'lodash-es'
import { uid } from 'pro-composables'
import Sortable from 'sortablejs'
import { computed, getCurrentInstance, onBeforeUnmount, ref, watchPostEffect } from 'vue'
import { useNaiveClsPrefix } from '../../_internal/use-cls-prefix'
import { warn } from '../../_utils/warn'

export function useDraggableSort(props: ComputedRef<ProDataTableProps>) {
  const isDragging = ref(false)
  const clsPrefix = useNaiveClsPrefix()
  const dragHandleId = `drag-handle-${uid()}`
  const currentInstance = getCurrentInstance()

  const nDataTableTBody = computed(() => {
    const { data = [], columns = [] } = props.value
    if (data.length === 0 || columns.length === 0) {
      return null
    }
    const root = currentInstance?.vnode.el
    return root?.querySelector(`.${clsPrefix.value}-data-table-tbody`) as HTMLElement
  })

  const canDraggable = computed(() => {
    return !!props.value.dragSortOptions
  })

  const mergedSortableOptions = computed<SortableOptions>(() => {
    const {
      onEnd,
      handle,
      columnPath,
      ...sortableOptions
    } = props.value.dragSortOptions ?? {}

    return {
      animation: 200,
      forceFallback: true,
      handle: handle === false ? undefined : `.${dragHandleId}`,
      ...sortableOptions,
    }
  })

  let sortable: Sortable
  watchPostEffect(() => {
    if (!canDraggable.value) {
      return
    }
    const dom = nDataTableTBody.value
    if (dom) {
      sortable && sortable.destroy()
      sortable = Sortable.create(dom, {
        ...mergedSortableOptions.value,
        onStart: (event) => {
          isDragging.value = true
          const { dragSortOptions } = props.value
          const { onStart } = dragSortOptions ?? {}
          onStart && onStart(event)
        },
        onEnd: (event) => {
          isDragging.value = false
          const { oldIndex, newIndex } = event
          const { dragSortOptions } = props.value
          const { onEnd } = dragSortOptions ?? {}
          if (!onEnd) {
            if (__DEV__) {
              warn(
                'data-table',
                'You should synchronize your data source in the onEnd callback',
              )
            }
          }
          else {
            if (isNil(oldIndex) || isNil(newIndex) || oldIndex === newIndex) {
              return
            }
            onEnd(event as any)
          }
        },
      })
    }
  })

  onBeforeUnmount(() => {
    const dom = nDataTableTBody.value
    if (dom && sortable) {
      sortable.destroy()
    }
    sortable = null as any
  })

  return {
    isDragging,
    dragHandleId,
  }
}
