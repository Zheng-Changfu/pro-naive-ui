import type { CalcLayoutVarsOptions } from '../types'
import { cB, cE, cM } from 'naive-ui'
import { computed } from 'vue'

export function useTwoColumnLayoutVars({
  mergedNav,
  mergedLogo,
  mergedTabbar,
  mergedFooter,
  mergedSidebar,
  mergedCollapsed,
}: CalcLayoutVarsOptions) {
  const sidebarWidth = computed(() => {
    const sidebar = mergedSidebar.value
    const collapsed = mergedCollapsed.value
    if (!sidebar.show) {
      return '0px'
    }
    if (sidebar.showExtra && collapsed) {
      return `${sidebar.collapsedWidth * 2}px`
    }
    if (sidebar.showExtra && !collapsed) {
      return `${sidebar.collapsedWidth + sidebar.width}px`
    }
    return `${sidebar.collapsedWidth}px`
  })

  const sidebarMarginTop = computed(() => {
    const nav = mergedNav.value
    const logo = mergedLogo.value
    return logo.show
      ? `${nav.height}px`
      : '0px'
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

  return computed(() => {
    return {
      '--pro-layout-sidebar-width': sidebarWidth.value,
      '--pro-layout-sidebar-margin-top': sidebarMarginTop.value,
      '--pro-layout-content-margin-top': contentMarginTop.value,
      '--pro-layout-content-margin-bottom': contentMarginBottom.value,
    }
  })
}

export function setupTwoColumnLayoutStyle() {
  const style = [
    cB('pro-layout__aside', `
        position: relative;
        flex-shrink: 0;
        height: 100%;
        display: flex;
        width: var(--pro-layout-sidebar-width);
        background: var(--pro-layout-color);
        overflow: hidden;
        transition:
          width .3s var(--n-bezier),
          background .3s var(--n-bezier);
      `),
    cB('pro-layout__logo', `
        position: absolute;
        top: 0;
        left: 0;
        height: var(--pro-layout-nav-height);
        width: var(--pro-layout-sidebar-collapsed-width);
    `, [
      cM('hidden', `
          width: 0;
          overflow: hidden;
        `),
    ]),
    cB('pro-layout__sidebar', `
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        box-sizing: border-box;
        width: var(--pro-layout-sidebar-collapsed-width);
        margin-top: var(--pro-layout-sidebar-margin-top);
        border-right: 1px solid var(--pro-layout-border-color);
        transition:
          border-color .3s var(--n-bezier);
    `),
    cB('pro-layout__sidebar-extra', `
        width: calc(100% - var(--pro-layout-sidebar-collapsed-width));
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        border-right: 1px solid var(--pro-layout-border-color);
        transition:
          width .3s var(--n-bezier),
          border-color .3s var(--n-bezier);
    `, [
      cM('hidden', `
          width: 0;
          overflow: hidden;
          border-right: none;
          border-right-color: var(--pro-layout-border-color);
        `),
    ]),
    cB('pro-layout__scrollbar__inner', `
        display: flex;
        min-height: 100%;
        flex-direction: column;
    `),
    cB('pro-layout__header', `
        box-sizing: border-box;
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
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: var(--pro-layout-nav-height);
        border-bottom: 1px solid var(--pro-layout-border-color);
        transition:
          border-color .3s var(--n-bezier);
    `, [
      cB('pro-layout__logo', `
          display: none;
      `),
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
          border-bottom-color: var(--pro-layout-border-color);
      `),
    ]),
    cB('pro-layout__tabbar', `
        height: var(--pro-layout-tabbar-height);
        display: flex;
        box-sizing: border-box;
        background: var(--pro-layout-color);
        border-bottom: 1px solid var(--pro-layout-border-color);
        transition:
          background .3s var(--n-bezier),
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
        margin-bottom: var(--pro-layout-content-margin-bottom);
        transition:
          background .3s var(--n-bezier);
      `),
    cB('pro-layout__footer', `
        height: var(--pro-layout-footer-height);
        flex-shrink: 0;
        background: var(--pro-layout-color);
        transition: 
          background .3s var(--n-bezier);
      `, [
      cM('fixed', `
          width: 100%;
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
    cM('two-column', style),
    cM('mixed-two-column', style),
  ]
}
