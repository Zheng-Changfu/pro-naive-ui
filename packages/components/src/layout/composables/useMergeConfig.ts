import type { ComputedRef } from 'vue'
import type { ProLayoutProps } from '../props'
import { useThemeVars } from 'naive-ui'
import { computed } from 'vue'

export function useMergeConfig(props: ComputedRef<ProLayoutProps>) {
  const themeVars = useThemeVars()

  const mergedMode = computed(() => {
    return props.value.mode ?? 'vertical'
  })

  const mergedCollasped = computed(() => {
    return props.value.collapsed ?? false
  })

  const mergedSidebar = computed(() => {
    const {
      showSidebar,
      sidebarWidth,
      sidebarMixedWidth,
      sidebarCollapsedWidth,
    } = props.value
    return {
      show: showSidebar !== false,
      width: sidebarWidth ?? 224,
      mixedWidth: sidebarMixedWidth ?? 58,
      collapsedWidth: sidebarCollapsedWidth ?? 58,
    }
  })

  const mergedNav = computed(() => {
    const {
      showNav,
      navFixed,
      navHeight,
    } = props.value
    return {
      show: showNav !== false,
      fixed: navFixed ?? true,
      height: navHeight ?? 50,
    }
  })

  const mergedFooter = computed(() => {
    const {
      showFooter,
      footerFixed,
      footerHeight,
    } = props.value
    return {
      show: showFooter !== false,
      height: footerHeight ?? 32,
      fixed: footerFixed ?? false,
    }
  })

  const mergedTabbar = computed(() => {
    const {
      showTabbar,
      tabbarHeight,
    } = props.value
    return {
      show: showTabbar !== false,
      height: tabbarHeight ?? 38,
    }
  })

  const mergedCssVars = computed(() => {
    return {
      '--n-color': themeVars.value.bodyColor,
      '--n-text-color': themeVars.value.textColor2,
      '--pro-layout-color': themeVars.value.bodyColor,
      '--pro-bezier': themeVars.value.cubicBezierEaseInOut,
      '--pro-layout-nav-height': `${mergedNav.value.height}px`,
      '--pro-layout-border-color': themeVars.value.borderColor,
      '--pro-layout-footer-height': `${mergedFooter.value.height}px`,
      '--pro-layout-tabbar-height': `${mergedTabbar.value.height}px`,
      '--pro-layout-sidebar-width': `${mergedSidebar.value.width}px`,
      '--pro-layout-sidebar-mixed-width': `${mergedSidebar.value.mixedWidth}px`,
      '--pro-layout-sidebar-collapsed-width': `${mergedSidebar.value.collapsedWidth}px`,
    }
  })

  return {
    mergedMode,
    mergedNav,
    mergedFooter,
    mergedTabbar,
    mergedSidebar,
    mergedCssVars,
    mergedCollasped,
  }
}
