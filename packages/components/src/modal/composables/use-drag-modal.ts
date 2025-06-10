import type { ComputedRef } from 'vue'
import type { ProModalProps } from '../props'
import { useEventListener } from '@vueuse/core'
import { get } from 'lodash-es'
import { computed, onScopeDispose } from 'vue'

export const DRAGGABLE_CLASS = 'pro-modal--draggable'

interface UseDragModalOptions {
  onEnd?: (el: HTMLElement, event: MouseEvent) => void
}
export function useDragModal(props: ComputedRef<ProModalProps>, options: UseDragModalOptions = {}) {
  const cleanups: Array<() => void> = []

  const canDraggable = computed(() => {
    return props.value.draggable !== false
  })

  const draggableClass = computed(() => {
    return canDraggable.value
      ? DRAGGABLE_CLASS
      : ''
  })

  const boundsToWindow = computed(() => {
    const draggable = props.value.draggable
    return get(draggable, 'bounds') !== 'none'
  })

  function startDrag(modal: HTMLElement) {
    const header = modal.querySelector(`.${DRAGGABLE_CLASS}`) as HTMLElement
    if (!header || !canDraggable.value) {
      return
    }

    let maxMoveX = 0
    let minMoveX = 0
    let maxMoveY = 0
    let minMoveY = 0
    let prevMoveY = 0
    let prevMoveX = 0
    let mousedownEvent: MouseEvent | undefined

    cleanups.push(
      useEventListener(header, 'mousedown', (event) => {
        event.preventDefault()
        mousedownEvent = event
        const {
          x,
          y,
          right,
          bottom,
        } = modal.getBoundingClientRect()
        minMoveX = x
        minMoveY = y
        maxMoveX = window.innerWidth - right
        maxMoveY = window.innerHeight - bottom
        /**
         * naive modal 使用 transform 会导致关闭动画异常
         */
        const { left, top } = modal.style
        prevMoveY = +top.slice(0, -2)
        prevMoveX = +left.slice(0, -2)
      }),
    )

    cleanups.push(
      useEventListener(window, 'mousemove', (event) => {
        if (!mousedownEvent)
          return

        const {
          clientX: downX,
          clientY: downY,
        } = mousedownEvent

        let moveX = event.clientX - downX
        let moveY = event.clientY - downY
        if (boundsToWindow.value) {
          if (moveX > maxMoveX) {
            moveX = maxMoveX
          }
          else if (-moveX > minMoveX) {
            moveX = -minMoveX
          }

          if (moveY > maxMoveY) {
            moveY = maxMoveY
          }
          else if (-moveY > minMoveY) {
            moveY = -minMoveY
          }
        }
        const x = moveX + prevMoveX
        const y = moveY + prevMoveY
        modal.style.top = `${y}px`
        modal.style.left = `${x}px`
      }),
    )

    cleanups.push(
      useEventListener(window, 'mouseup', (event: MouseEvent) => {
        mousedownEvent = undefined
        options.onEnd && options.onEnd(modal, event)
      }),
    )
  }

  function stopDrag() {
    cleanups.forEach(cleanup => cleanup())
    cleanups.length = 0
  }

  onScopeDispose(stopDrag)

  return {
    stopDrag,
    startDrag,
    canDraggable,
    draggableClass,
  }
}
