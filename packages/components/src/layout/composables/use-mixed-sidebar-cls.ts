import type { CalcLayoutClsOptions } from '../types'
import { cB, cE, cM } from 'naive-ui'
import { computed } from 'vue'

export function useMixedSidebarLayoutCls({
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
        `${mergedClsPrefix.value}-pro-layout--mixed-sidebar`,
      ],
      logo: [
        { [`${mergedClsPrefix.value}-pro-layout__logo--hidden`]: !mergedLogo.value.show },
      ],
      aside: [
        { [`${mergedClsPrefix.value}-pro-layout__aside--collapsed`]: mergedCollasped.value },
        { [`${mergedClsPrefix.value}-pro-layout__aside--hidden`]: !mergedSidebar.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__aside--header-fixed-with-nav`]: mergedNav.value.fixed && mergedNav.value.show },
      ],
      header: [
        { [`${mergedClsPrefix.value}-pro-layout__header--fixed`]: mergedNav.value.fixed },
      ],
      nav: [
        { [`${mergedClsPrefix.value}-pro-layout__nav--hidden`]: !mergedNav.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__nav--header-unfixed-aside-hidden`]: !mergedNav.value.fixed && !mergedSidebar.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__nav--header-unfixed-aside-expanded`]: !mergedNav.value.fixed && mergedSidebar.value.show && !mergedCollasped.value },
        { [`${mergedClsPrefix.value}-pro-layout__nav--header-unfixed-aside-collapsed`]: !mergedNav.value.fixed && mergedSidebar.value.show && mergedCollasped.value },
      ],
      tabbar: [
        { [`${mergedClsPrefix.value}-pro-layout__tabbar--hidden`]: !mergedTabbar.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__tabbar--aside-hidden`]: !mergedSidebar.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__tabbar--aside-collapsed`]: mergedSidebar.value.show && mergedCollasped.value },
      ],
      main: [
        { [`${mergedClsPrefix.value}-pro-layout__main--header-fixed-nav-only`]: mergedNav.value.fixed && mergedNav.value.show && !mergedTabbar.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__main--header-fixed-tabbar-only`]: mergedNav.value.fixed && mergedTabbar.value.show && !mergedNav.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__main--header-fixed-nav-tabbar`]: mergedNav.value.fixed && mergedNav.value.show && mergedTabbar.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__main--footer-fixed`]: mergedFooter.value.fixed && mergedFooter.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__main--aside-hidden`]: !mergedSidebar.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__main--aside-collapsed`]: mergedSidebar.value.show && mergedCollasped.value },
      ],
      footer: [
        { [`${mergedClsPrefix.value}-pro-layout__footer--fixed`]: mergedFooter.value.fixed },
        { [`${mergedClsPrefix.value}-pro-layout__footer--hidden`]: !mergedFooter.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__footer--aside-hidden`]: !mergedSidebar.value.show },
        { [`${mergedClsPrefix.value}-pro-layout__footer--aside-collapsed`]: mergedSidebar.value.show && mergedCollasped.value },
      ],
    }
  })
}

export function setupMixedSidebarLayoutStyle() {
  return cM('mixed-sidebar', [
    cB('pro-layout__aside', `
        width: var(--pro-layout-sidebar-width);
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        background: var(--pro-layout-color);
        border-right: 1px solid var(--pro-layout-border-color);
        transition:
          width .3s var(--pro-bezier),
          background .3s var(--pro-bezier),
          border-color .3s var(--pro-bezier);
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
        `),
      cM('header-fixed-with-nav', `
          height: calc(100% - var(--pro-layout-nav-height));
          margin-top: var(--pro-layout-nav-height);
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
        flex-direction: column;
    `),
    cB('pro-layout__header', `
        background: var(--pro-layout-color);
        transition:
          background .3s var(--pro-bezier);
      `, [
      cM('fixed', `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
      `),
    ]),
    cB('pro-layout__nav', `
        height: var(--pro-layout-nav-height);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        background: var(--pro-layout-color);
        border-bottom: 1px solid var(--pro-layout-border-color);
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
      cM('header-unfixed-aside-hidden', `
          padding-left: 0;
      `),
      cM('header-unfixed-aside-expanded', `
          padding-left: var(--pro-layout-sidebar-width);
      `),
      cM('header-unfixed-aside-collapsed', `
          padding-left: var(--pro-layout-sidebar-collapsed-width);
      `),
    ]),
    cB('pro-layout__tabbar', `
        height: var(--pro-layout-tabbar-height);
        display: flex;
        box-sizing: border-box;
        background: var(--pro-layout-color);
        padding-left: var(--pro-layout-sidebar-width);
        border-bottom: 1px solid var(--pro-layout-border-color);
        transition:
          background .3s var(--pro-bezier),
          padding-left .3s var(--pro-bezier),
          border-color .3s var(--pro-bezier);
    `, [
      cM('hidden', `
          height: 0;
          overflow: hidden;
          border-bottom: none;
      `),
      cM('aside-hidden', `
          padding-left: 0;
      `),
      cM('aside-collapsed', `
          padding-left: var(--pro-layout-sidebar-collapsed-width);
      `),
    ]),
    cB('pro-layout__main', `
       padding-left: var(--pro-layout-sidebar-width);
       transition: 
        padding-left .3s var(--pro-bezier);
    `, [
      cM('header-fixed-nav-only', `
          padding-top: var(--pro-layout-nav-height);
        `),
      cM('header-fixed-tabbar-only', `
          padding-top: var(--pro-layout-tabbar-height);
        `),
      cM('header-fixed-nav-tabbar', `
          padding-top: calc(var(--pro-layout-nav-height) + var(--pro-layout-tabbar-height));
        `),
      cM('footer-fixed', `
          padding-bottom: var(--pro-layout-footer-height);
        `),
      cM('aside-hidden', `
          padding-left: 0;
        `),
      cM('aside-collapsed', `
          padding-left: var(--pro-layout-sidebar-collapsed-width);
        `),
    ]),
    cB('pro-layout__footer', `
        height: var(--pro-layout-footer-height);
        background: var(--pro-layout-color);
        padding-left: var(--pro-layout-sidebar-width);
        width: calc(100% - var(--pro-layout-sidebar-width));
        transition: 
          padding-left .3s var(--pro-bezier),
          background .3s var(--pro-bezier);
      `, [
      cM('fixed', `
          position: absolute;
          bottom: 0;
          left: 0;
        `),
      cM('hidden', `
          height: 0;
          overflow: hidden;
        `),
      cM('aside-hidden', `
          padding-left: 0;
          width: 100%;
        `),
      cM('aside-collapsed', `
          padding-left: var(--pro-layout-sidebar-collapsed-width);
          width: calc(100% - var(--pro-layout-sidebar-collapsed-width));
        `),
    ]),
  ])
}
