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

  const mergedIsMobile = computed(() => {
    return props.value.isMobile ?? false
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
      mixedWidth: sidebarMixedWidth ?? 80,
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

  const mergedLogo = computed(() => {
    return {
      show: props.value.showLogo ?? true,
    }
  })

  const mergedAsideClass = computed(() => {
    const asideClass = props.value.asideClass ?? []
    return isString(asideClass) ? [asideClass] : asideClass
  })

  const mergedLogoClass = computed(() => {
    const logoClass = props.value.logoClass ?? []
    return isString(logoClass) ? [logoClass] : logoClass
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
      // 支持主题切换
      '--n-color': themeVars.value.bodyColor,
      '--n-text-color': themeVars.value.textColor2,
      '--n-bezier': themeVars.value.cubicBezierEaseInOut,
      // 给当前组件使用的变量
      '--pro-layout-color': themeVars.value.bodyColor,
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
    mergedNav,
    mergedMode,
    mergedLogo,
    mergedFooter,
    mergedTabbar,
    mergedSidebar,
    mergedIsMobile,
    mergedCssVars,
    mergedNavClass,
    mergedLogoClass,
    mergedMainClass,
    mergedCollasped,
    mergedAsideClass,
    mergedHeaderClass,
    mergedTabbarClass,
    mergedFooterClass,
  }
}
