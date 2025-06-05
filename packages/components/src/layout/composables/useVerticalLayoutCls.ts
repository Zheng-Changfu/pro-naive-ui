import type { CalcLayoutClsOptions } from '../types'
import { cB, cE, cM } from 'naive-ui'
import { computed } from 'vue'

export function useVerticalLayoutCls({
  mergedNav,
  mergedTabbar,
  mergedFooter,
  mergedSidebar,
  mergedClsPrefix,
  mergedCollasped,
}: CalcLayoutClsOptions) {
  const headerFixed = computed(() => {
    return mergedNav.value === false || mergedNav.value.fixed
  })

  return computed(() => {
    return {
      layout: [
        `${mergedClsPrefix.value}-pro-layout--vertical`,
      ],
      aside: [
        { [`${mergedClsPrefix.value}-pro-layout__aside--collapsed`]: mergedCollasped.value },
        { [`${mergedClsPrefix.value}-pro-layout__aside--hidden`]: mergedSidebar.value === false },
      ],
      header: [
        { [`${mergedClsPrefix.value}-pro-layout__header--fixed`]: headerFixed.value },
      ],
      nav: [
        { [`${mergedClsPrefix.value}-pro-layout__nav--hidden`]: mergedNav.value === false },
      ],
      tabbar: [
        { [`${mergedClsPrefix.value}-pro-layout__tabbar--hidden`]: mergedTabbar.value === false },
      ],
      main: [
        { [`${mergedClsPrefix.value}-pro-layout__main--fixed-no-nav`]: mergedNav.value === false },
        { [`${mergedClsPrefix.value}-pro-layout__main--fixed-no-tabbar`]: mergedTabbar.value === false },
        { [`${mergedClsPrefix.value}-pro-layout__main--fixed-no-header`]: mergedTabbar.value === false },
        { [`${mergedClsPrefix.value}-pro-layout__main--fixed-no-footer`]: mergedTabbar.value === false },
      ],
      footer: [
        { [`${mergedClsPrefix.value}-pro-layout__footer--hidden`]: mergedFooter.value === false },
        { [`${mergedClsPrefix.value}-pro-layout__footer--fixed`]: mergedFooter.value !== false && mergedFooter.value.fixed },
      ],
    }
  })
}

export function setupVerticalLayoutStyle() {
  return cM('vertical', [
    // cB('pro-layout__scrollbar', `
    //     position:relative;
    //     flex: 1;
    //   `, [
    //   cE('inner', `
    //       display: flex;
    //       min-height: 100%;
    //       height: auto;
    //     `),
    // ]),
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
          width .3s var(--pro-bezier),
          background .3s var(--pro-bezier),
          border-color .3s var(--pro-bezier);
      `, [
      cM('collapsed', `
          width: var(--pro-layout-sidebar-collapsed-width);
        `),
      cM('hidden', `
          width: 0;
          overflow: hidden;
        `),
    ]),
    cB('pro-layout__logo', `
        height: var(--pro-layout-header-height);
        flex-shrink: 0;
    `),
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
        box-sizing: border-box;
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
        display: flex;
        align-items: center;
        height: var(--pro-layout-header-height);
        border-bottom: 1px solid var(--pro-layout-border-color);
        transition:
          height .3s var(--pro-bezier),
          border-color .3s var(--pro-bezier);
    `, [
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
      `),
    ]),
    cB('pro-layout__tabbar', `
        height: var(--pro-layout-tabbar-height);
        display: flex;
        box-sizing: border-box;
        background: var(--pro-layout-color);
        border-bottom: 1px solid var(--pro-layout-border-color);
        transition:
          height .3s var(--pro-bezier),
          background .3s var(--pro-bezier),
          border-color .3s var(--pro-bezier);
    `, [
      cM('hidden', `
          height: 0;
          overflow: hidden;
      `),
    ]),
    cB('pro-layout__main', `
        flex-grow: 1;
        flex-basis: 0;
      `, [
      cM('no-nav', `
          padding-top: var(--pro-layout-tabbar-height);
        `),
      cM('no-tabbar', `
          padding-top: var(--pro-layout-header-height);
        `),
    ]),
    cB('pro-layout__footer', `
        height: var(--pro-layout-footer-height);
        flex-shrink: 0;
        background: var(--pro-layout-color);
        transition: 
          height .3s var(--pro-bezier),
          background .3s var(--pro-bezier);
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
