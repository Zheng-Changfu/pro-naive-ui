import type { CalcLayoutVarsOptions } from '../types'
import { cB, cE, cM } from 'naive-ui'
import { computed } from 'vue'

export function useVerticalLayoutVars({
  mergedNav,
  mergedTabbar,
  mergedFooter,
}: CalcLayoutVarsOptions) {
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
      '--pro-layout-content-margin-top': contentMarginTop.value,
      '--pro-layout-content-margin-bottom': contentMarginBottom.value,
    }
  })
}

export function setupVerticalLayoutStyle() {
  return cM('vertical', [
    cB('pro-layout__aside', `
        width: var(--pro-layout-sidebar-width);
        height: 100%;
        flex-shrink: 0;
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
    cB('pro-layout__logo', `
        height: var(--pro-layout-nav-height);
        flex-shrink: 0;
    `, [
      cM('hidden', `
          height: 0;
          overflow: hidden;
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
        height: var(--pro-layout-nav-height);
        box-sizing: border-box;
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
  ])
}
