import type { ComputedRef } from 'vue'
import type { SharedLayoutProps } from '../../props'
import { useThemeVars } from 'naive-ui'
import { computed } from 'vue'

export function useMergeConfig(props: ComputedRef<SharedLayoutProps>) {
  const themeVars = useThemeVars()

  const mergedSidebar = computed(() => {
    if (props.value.sidebar === false)
      return false
    return {
      width: 224,
      ...(props.value.sidebar ?? {}),
    }
  })

  const mergedHeader = computed(() => {
    if (props.value.header === false)
      return false
    return {
      height: 50,
      fixed: true,
      ...(props.value.header ?? {}),
    }
  })

  const mergedFooter = computed(() => {
    if (props.value.footer === false)
      return false
    return {
      height: 32,
      fixed: false,
      ...(props.value.footer ?? {}),
    }
  })

  const mergedTabbar = computed(() => {
    if (props.value.tabbar === false)
      return false
    return {
      height: 38,
      ...(props.value.tabbar ?? {}),
    }
  })

  const mergedCssVars = computed(() => {
    const vars: Record<string, any> = {
      '--n-color': themeVars.value.bodyColor,
      '--n-text-color': themeVars.value.textColor2,
      '--pro-layout-color': themeVars.value.bodyColor,
      '--pro-bezier': themeVars.value.cubicBezierEaseInOut,
      '--pro-layout-border-color': themeVars.value.borderColor,
    }
    if (mergedHeader.value !== false) {
      vars['--pro-layout-header-height'] = `${mergedHeader.value.height}px`
    }
    if (mergedFooter.value !== false) {
      vars['--pro-layout-footer-height'] = `${mergedFooter.value.height}px`
    }
    if (mergedTabbar.value !== false) {
      vars['--pro-layout-tabbar-height'] = `${mergedTabbar.value.height}px`
    }
    if (mergedSidebar.value !== false) {
      vars['--pro-layout-sidebar-width'] = `${mergedSidebar.value.width}px`
    }
    return vars
  })

  return {
    mergedHeader,
    mergedFooter,
    mergedTabbar,
    mergedSidebar,
    mergedCssVars,
  }
}
