import type { CSSProperties } from 'vue'
import { useCssVar, useDebounceFn } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT, CSS_VARIABLE_LAYOUT_CONTENT_WIDTH } from '../constan'

interface VisibleDomRect {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
}

/**
 * 获取元素可见信息
 * @param element
 */
function getElementVisibleRect(
  element?: HTMLElement | null | undefined,
): VisibleDomRect {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    }
  }
  const rect = element.getBoundingClientRect()
  const viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight,
  )

  const top = Math.max(rect.top, 0)
  const bottom = Math.min(rect.bottom, viewHeight)

  const viewWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth,
  )

  const left = Math.max(rect.left, 0)
  const right = Math.min(rect.right, viewWidth)

  return {
    bottom,
    height: Math.max(0, bottom - top),
    left,
    right,
    top,
    width: Math.max(0, right - left),
  }
}
/**
 * @zh_CN content style
 */
export function useLayoutContentStyle() {
  let resizeObserver: null | ResizeObserver = null
  const contentElement = ref<HTMLDivElement | null>(null)
  const visibleDomRect = ref<null | VisibleDomRect>(null)
  const contentHeight = useCssVar(CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT)
  const contentWidth = useCssVar(CSS_VARIABLE_LAYOUT_CONTENT_WIDTH)

  const overlayStyle = computed((): CSSProperties => {
    const { height, left, top, width } = visibleDomRect.value ?? {}
    return {
      height: `${height}px`,
      left: `${left}px`,
      position: 'absolute',
      top: `${top}px`,
      width: `${width}px`,
      zIndex: 150,
    }
  })

  const debouncedCalcHeight = useDebounceFn(
    (_entries: ResizeObserverEntry[]) => {
      visibleDomRect.value = getElementVisibleRect(contentElement.value)
      contentHeight.value = `${visibleDomRect.value.height}px`
      contentWidth.value = `${visibleDomRect.value.width}px`
    },
    16,
  )

  onMounted(() => {
    if (contentElement.value && !resizeObserver) {
      resizeObserver = new ResizeObserver(debouncedCalcHeight)
      resizeObserver.observe(contentElement.value)
    }
  })

  onUnmounted(() => {
    resizeObserver?.disconnect()
    resizeObserver = null
  })

  return { contentElement, overlayStyle, visibleDomRect }
}
