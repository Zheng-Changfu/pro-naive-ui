import type { CalcLayoutVarsOptions } from '../types'
import { cB, cE, cM } from 'naive-ui'
import { computed } from 'vue'

export function useSidebarLayoutVars({
  mergedNav,
  mergedTabbar,
  mergedFooter,
  mergedSidebar,
  mergedCollapsed,
}: CalcLayoutVarsOptions) {
  const sidebarHeight = computed(() => {
    const nav = mergedNav.value
    if (nav.show && nav.fixed) {
      return `calc(100% - ${nav.height}px)`
    }
    return '100%'
  })

  const sidebarMarginTop = computed(() => {
    const nav = mergedNav.value
    if (nav.show && nav.fixed) {
      return `${nav.height}px`
    }
    return '0px'
  })

  const navMarginLeft = computed(() => {
    const nav = mergedNav.value
    const sidebar = mergedSidebar.value
    const collapsed = mergedCollapsed.value
    if (!nav.fixed && sidebar.show && !collapsed) {
      return `${sidebar.width}px`
    }
    if (!nav.fixed && sidebar.show && collapsed) {
      return `${sidebar.collapsedWidth}px`
    }
    return '0px'
  })

  const tabbarMarginLeft = computed(() => {
    const sidebar = mergedSidebar.value
    const collapsed = mergedCollapsed.value
    if (!sidebar.show) {
      return '0px'
    }
    if (collapsed) {
      return `${sidebar.collapsedWidth}px`
    }
    return `${sidebar.width}px`
  })

  const contentMarginLeft = computed(() => {
    const sidebar = mergedSidebar.value
    const collapsed = mergedCollapsed.value
    if (!sidebar.show) {
      return '0px'
    }
    if (collapsed) {
      return `${sidebar.collapsedWidth}px`
    }
    return `${sidebar.width}px`
  })

  const contentMarginTop = computed(() => {
    const nav = mergedNav.value
    const tabbar = mergedTabbar.value
    if (nav.fixed && nav.show && !tabbar.show) {
      return `${nav.height}px`
    }
    if (nav.fixed && tabbar.show && !nav.show) {
      return `${tabbar.height}px`
    }
    if (nav.fixed && nav.show && tabbar.show) {
      return `${nav.height + tabbar.height}px`
    }
    return '0px'
  })

  const contentMarginBottom = computed(() => {
    const footer = mergedFooter.value
    if (footer.fixed && footer.show) {
      return `${footer.height}px`
    }
    return '0px'
  })

  const footerMarginLeft = computed(() => {
    const sidebar = mergedSidebar.value
    const collapsed = mergedCollapsed.value
    if (!sidebar.show) {
      return '0px'
    }
    if (collapsed) {
      return `${sidebar.collapsedWidth}px`
    }
    return `${sidebar.width}px`
  })

  const footerWidth = computed(() => {
    const sidebar = mergedSidebar.value
    const collapsed = mergedCollapsed.value
    if (!sidebar.show) {
      return '100%'
    }
    if (collapsed) {
      return `calc(100% - ${sidebar.collapsedWidth}px)`
    }
    return `calc(100% - ${sidebar.width}px)`
  })

  return computed(() => {
    return {
      '--pro-layout-sidebar-height': sidebarHeight.value,
      '--pro-layout-sidebar-margin-top': sidebarMarginTop.value,
      '--pro-layout-nav-margin-left': navMarginLeft.value,
      '--pro-layout-tabbar-margin-left': tabbarMarginLeft.value,
      '--pro-layout-content-margin-top': contentMarginTop.value,
      '--pro-layout-content-margin-left': contentMarginLeft.value,
      '--pro-layout-content-margin-bottom': contentMarginBottom.value,
      '--pro-layout-footer-width': footerWidth.value,
      '--pro-layout-footer-margin-left': footerMarginLeft.value,
    }
  })
}

export function setupSidebarLayoutStyle() {
  const style = [
    cB('pro-layout__aside', `
        width: var(--pro-layout-sidebar-width);
        height: var(--pro-layout-sidebar-height);
        margin-top: var(--pro-layout-sidebar-margin-top);
        position: absolute;
        left: 0;
        top: 0;
        z-index: calc(var(--pro-layout-z-index) + 1);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        background: var(--pro-layout-color);
        border-right: 1px solid var(--pro-layout-border-color);
        transition:
          width .3s var(--n-bezier),
          background .3s var(--n-bezier),
          border-color .3s var(--n-bezier);
      `, [
      cB('pro-layout__logo', `
          display: none;
      `),
      cM('collapsed', `
          width: var(--pro-layout-sidebar-collapsed-width);
        `),
      cM('hidden', `
          width: 0;
          overflow: hidden;
          border-right: none;
          border-right-color: var(--pro-layout-border-color);
        `),
    ]),
    cB('pro-layout__sidebar', `
        flex-grow: 1;
        flex-basis: 0;
        display: flex;
        flex-direction: column;
    `),
    cB('pro-layout__sidebar-extra', `
        display: none;
    `),
    cB('pro-layout__scrollbar__inner', `
        display: flex;
        min-height: 100%;
        flex-direction: column;
    `),
    cB('pro-layout__header', `
        background: var(--pro-layout-color);
        transition:
          background .3s var(--n-bezier);
      `, [
      cM('fixed', `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: var(--pro-layout-z-index);
      `),
    ]),
    cB('pro-layout__nav', `
        height: var(--pro-layout-nav-height);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        background: var(--pro-layout-color);
        margin-left: var(--pro-layout-nav-margin-left);
        border-bottom: 1px solid var(--pro-layout-border-color);
        transition:
          background .3s var(--n-bezier),
          border-color .3s var(--n-bezier);
    `, [
      cB('pro-layout__logo', `
          height: 100%;
          width: var(--pro-layout-sidebar-width);
          flex-shrink: 0;
        `, [
        cM('hidden', `
            width: 0;
            overflow: hidden;
          `),
      ]),
      cE('left', `
          height: 100%;
        `),
      cE('center', `
          height: 100%;
          flex-grow: 1;
          flex-basis: 0;
          overflow: hidden;
        `),
      cE('right', `
          height: 100%;
        `),
      cM('hidden', `
          height: 0;
          overflow: hidden;
          border-bottom: none;
      `),
    ]),
    cB('pro-layout__tabbar', `
        height: var(--pro-layout-tabbar-height);
        display: flex;
        box-sizing: border-box;
        background: var(--pro-layout-color);
        margin-left: var(--pro-layout-tabbar-margin-left);
        border-bottom: 1px solid var(--pro-layout-border-color);
        transition:
          background .3s var(--n-bezier),
          margin-left .3s var(--n-bezier),
          border-color .3s var(--n-bezier);
    `, [
      cM('hidden', `
          height: 0;
          overflow: hidden;
          border-bottom: none;
          border-bottom-color: var(--pro-layout-border-color);
      `),
    ]),
    cB('pro-layout__content', `
       flex-grow: 1;
       flex-basis: 0;
       background: var(--pro-layout-content-color);
       margin-top: var(--pro-layout-content-margin-top);
       margin-left: var(--pro-layout-content-margin-left);
       margin-bottom: var(--pro-layout-content-margin-bottom);
       transition: 
        background .3s var(--n-bezier),
        margin-left .3s var(--n-bezier);
    `),
    cB('pro-layout__footer', `
        width: var(--pro-layout-footer-width);
        height: var(--pro-layout-footer-height);
        background: var(--pro-layout-color);
        margin-left: var(--pro-layout-footer-margin-left);
        transition: 
          margin-left .3s var(--n-bezier),
          background .3s var(--n-bezier);
      `, [
      cM('fixed', `
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: var(--pro-layout-z-index);
        `),
      cM('hidden', `
          height: 0;
          overflow: hidden;
        `),
    ]),
  ]
  return [
    cM('sidebar', style),
    cM('mixed-sidebar', style),
  ]
}
