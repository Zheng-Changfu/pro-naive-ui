import type { CalcLayoutClsOptions } from '../types'
import { cB, cE, cM } from 'naive-ui'
import { computed } from 'vue'

export function useMixedTwoColumnLayoutCls({
  mergedNav,
  mergedLogo,
  mergedTabbar,
  mergedFooter,
  mergedSidebar,
  mergedClsPrefix,
  mergedCollasped,
}: CalcLayoutClsOptions) {
  return computed(() => {
    return {
      layout: [
        `${mergedClsPrefix.value}-pro-layout--mixed-two-column`,
      ],
      logo: [
        { [`${mergedClsPrefix.value}-pro-layout__logo--hidden`]: !mergedLogo.value.show },
      ],
      aside: [
        { [`${mergedClsPrefix.value}-pro-layout__aside--collapsed`]: mergedCollasped.value },
        { [`${mergedClsPrefix.value}-pro-layout__aside--hidden`]: !mergedSidebar.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__aside--logo-hidden`]: !mergedLogo.value.show },
      ],
      header: [
        { [`${mergedClsPrefix.value}-pro-layout__header--fixed`]: mergedNav.value.fixed },
      ],
      nav: [
        { [`${mergedClsPrefix.value}-pro-layout__nav--hidden`]: !mergedNav.value.show },
      ],
      tabbar: [
        { [`${mergedClsPrefix.value}-pro-layout__tabbar--hidden`]: !mergedTabbar.value.show },
      ],
      main: [
        { [`${mergedClsPrefix.value}-pro-layout__main--header-fixed-with-only-has-nav`]: mergedNav.value.fixed && mergedNav.value.show && !mergedTabbar.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__main--header-fixed-with-only-has-tabbar`]: mergedNav.value.fixed && mergedTabbar.value.show && !mergedNav.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__main--header-fixed-with-has-header`]: mergedNav.value.fixed && mergedNav.value.show && mergedTabbar.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__main--footer-fixed-with-has-footer`]: mergedFooter.value.fixed && mergedFooter.value.show },
      ],
      footer: [
        { [`${mergedClsPrefix.value}-pro-layout__footer--fixed`]: mergedFooter.value.fixed },
        { [`${mergedClsPrefix.value}-pro-layout__footer--hidden`]: !mergedFooter.value.show },
      ],
    }
  })
}

export function setupMixedTwoColumnLayoutStyle() {
  return cM('mixed-two-column', [
    cB('pro-layout__aside', `
        position: relative;
        flex-shrink: 0;
        height: 100%;
        display: flex;
        width: calc(var(--pro-layout-sidebar-mixed-width) + var(--pro-layout-sidebar-width));
        background: var(--pro-layout-color);
        transition:
          width .3s var(--n-bezier),
          background .3s var(--n-bezier);
      `, [
      cM('collapsed', `
          width: calc(var(--pro-layout-sidebar-mixed-width) + var(--pro-layout-sidebar-collapsed-width));
        `),
      cM('hidden', `
          width: 0;
          overflow: hidden;
        `),
      cM('logo-hidden', [
        cB('pro-layout__sidebar', `
            padding-top: 0;
        `),
      ]),
    ]),
    cB('pro-layout__logo', `
        position: absolute;
        top: 0;
        left: 0;
        height: var(--pro-layout-nav-height);
        width: var(--pro-layout-sidebar-mixed-width);
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
        padding-top: var(--pro-layout-nav-height);
        width: var(--pro-layout-sidebar-mixed-width);
        border-right: 1px solid var(--pro-layout-border-color);
        transition:
          border-color .3s var(--n-bezier);
    `),
    cB('pro-layout__sidebar-extra', `
        width: calc(100% - var(--pro-layout-sidebar-mixed-width));
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        border-right: 1px solid var(--pro-layout-border-color);
        transition:
          border-color .3s var(--n-bezier);
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
          border-bottom: none;
          overflow: hidden;
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
      `),
    ]),
    cB('pro-layout__main', `
        flex-grow: 1;
        flex-basis: 0;
      `, [
      cM('header-fixed-with-only-has-nav', `
          padding-top: var(--pro-layout-nav-height);
        `),
      cM('header-fixed-with-only-has-tabbar', `
          padding-top: var(--pro-layout-tabbar-height);
        `),
      cM('header-fixed-with-has-header', `
          padding-top: calc(var(--pro-layout-nav-height) + var(--pro-layout-tabbar-height));
        `),
      cM('footer-fixed-with-has-footer', `
          padding-bottom: var(--pro-layout-footer-height);
        `),
    ]),
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
        `),
      cM('hidden', `
          height: 0;
          overflow: hidden;
        `),
    ]),
  ])
}
