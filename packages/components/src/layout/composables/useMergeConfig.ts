import type { ComputedRef } from 'vue'
import type { ProLayoutProps } from '../props'
import { isString } from 'lodash-es'
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

  const mergedAsideClass = computed(() => {
    const asideClass = props.value.asideClass ?? []
    return isString(asideClass) ? [asideClass] : asideClass
  })

  const mergedHeaderClass = computed(() => {
    const headerClass = props.value.headerClass ?? []
    return isString(headerClass) ? [headerClass] : headerClass
  })

  const mergedNavClass = computed(() => {
    const navClass = props.value.navClass ?? []
    return isString(navClass) ? [navClass] : navClass
  })

  const mergedTabbarClass = computed(() => {
    const tabbarClass = props.value.tabbarClass ?? []
    return isString(tabbarClass) ? [tabbarClass] : tabbarClass
  })

  const mergedMainClass = computed(() => {
    const mainClass = props.value.mainClass ?? []
    return isString(mainClass) ? [mainClass] : mainClass
  })

  const mergedFooterClass = computed(() => {
    const footerClass = props.value.footerClass ?? []
    return isString(footerClass) ? [footerClass] : footerClass
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
    mergedNavClass,
    mergedMainClass,
    mergedCollasped,
    mergedAsideClass,
    mergedHeaderClass,
    mergedTabbarClass,
    mergedFooterClass,
  }
}
