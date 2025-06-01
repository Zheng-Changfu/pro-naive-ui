import type { ComputedRef } from 'vue'
import type { ProLayoutProps } from '../props'
import { useThemeVars } from 'naive-ui'
import { computed } from 'vue'

export function useMergeConfig(props: ComputedRef<ProLayoutProps>) {
  const themeVars = useThemeVars()

  const mergedMode = computed(() => {
    return props.value.mode ?? 'vertical'
  })

  const mergedSidebar = computed(() => {
    const {
      showSidebar,
      sidebarWidth,
      sidebarMixedWidth,
      sidebarCollapsedWidth,
    } = props.value
    return showSidebar === false
      ? false
      : {
          width: sidebarWidth ?? 224,
          mixedWidth: sidebarMixedWidth ?? 80,
          collapsedWidth: sidebarCollapsedWidth ?? 58,
        }
  })

  const mergedHeader = computed(() => {
    const {
      showHeader,
      headerFixed,
      headerHeight,
    } = props.value
    return showHeader === false
      ? false
      : {
          fixed: headerFixed ?? true,
          height: headerHeight ?? 50,
        }
  })

  const mergedFooter = computed(() => {
    const {
      showFooter,
      footerFixed,
      footerHeight,
    } = props.value
    return showFooter === false
      ? false
      : {
          height: footerHeight ?? 32,
          fixed: footerFixed ?? false,
        }
  })

  const mergedTabbar = computed(() => {
    const {
      showTabbar,
      tabbarHeight,
    } = props.value
    return showTabbar === false
      ? false
      : {
          height: tabbarHeight ?? 38,
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
      vars['--pro-layout-sidebar-mixed-width'] = `${mergedSidebar.value.mixedWidth}px`
    }
    return vars
  })

  return {
    mergedMode,
    mergedHeader,
    mergedFooter,
    mergedTabbar,
    mergedSidebar,
    mergedCssVars,
  }
}
