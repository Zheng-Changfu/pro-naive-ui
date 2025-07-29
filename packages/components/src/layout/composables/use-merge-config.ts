import type { ComputedRef } from 'vue'
import type { ProLayoutProps } from '../props'
import { isString } from 'lodash-es'
import { computed } from 'vue'

export function useMergeConfig(props: ComputedRef<ProLayoutProps>) {
  const mergedMode = computed(() => {
    return props.value.mode ?? 'vertical'
  })

  const mergedIsMobile = computed(() => {
    return props.value.isMobile ?? false
  })

  const mergedCollapsed = computed(() => {
    return props.value.collapsed ?? false
  })

  const mergedSidebar = computed(() => {
    const {
      showSidebar,
      sidebarWidth,
      showSidebarExtra,
      sidebarCollapsedWidth,
    } = props.value
    return {
      width: sidebarWidth ?? 224,
      show: showSidebar !== false,
      showExtra: showSidebarExtra !== false,
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

  const mergedContentClass = computed(() => {
    const contentClass = props.value.contentClass ?? []
    return isString(contentClass) ? [contentClass] : contentClass
  })

  const mergedFooterClass = computed(() => {
    const footerClass = props.value.footerClass ?? []
    return isString(footerClass) ? [footerClass] : footerClass
  })

  return {
    mergedNav,
    mergedMode,
    mergedLogo,
    mergedFooter,
    mergedTabbar,
    mergedSidebar,
    mergedIsMobile,
    mergedNavClass,
    mergedLogoClass,
    mergedCollapsed,
    mergedAsideClass,
    mergedHeaderClass,
    mergedTabbarClass,
    mergedFooterClass,
    mergedContentClass,
  }
}
