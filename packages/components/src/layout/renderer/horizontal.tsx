import type { LayoutRenderOptions } from '../types'
import { cB, cE, cM, NScrollbar } from 'naive-ui'
import { resolveWrappedSlot } from '../../_utils/resolveSlot'

export function renderHorizontalLayout({
  slots,
  mergedNav,
  mergedTabbar,
  mergedFooter,
  mergedCssVars,
  mergedClsPrefix,
}: LayoutRenderOptions) {
  const renderHeader = () => {
    if (mergedNav === false) {
      return null
    }

    const logoDom = resolveWrappedSlot(slots.logo, (children) => {
      if (!children) {
        return null
      }
      return <div class={`${mergedClsPrefix}-pro-layout__header__logo`}>{children}</div>
    })

    const headerLeftDom = resolveWrappedSlot(slots['header-left'], (children) => {
      if (!children) {
        return null
      }
      return <div class={`${mergedClsPrefix}-pro-layout__header__left`}>{children}</div>
    })

    const headerCenterDom = resolveWrappedSlot(slots['header-center'], (children) => {
      if (!children) {
        return null
      }
      return <div class={`${mergedClsPrefix}-pro-layout__header__center`}>{children}</div>
    })

    const headerRightDom = resolveWrappedSlot(slots['header-right'], (children) => {
      if (!children) {
        return null
      }
      return <div class={`${mergedClsPrefix}-pro-layout__header__right`}>{children}</div>
    })

    if (
      !logoDom
      && !headerLeftDom
      && !headerCenterDom
      && !headerRightDom
    ) {
      return null
    }
    return (
      <header class={`${mergedClsPrefix}-pro-layout__header`}>
        {logoDom}
        {headerLeftDom}
        {headerCenterDom}
        {headerRightDom}
      </header>
    )
  }

  const renderTabbar = () => {
    if (mergedTabbar === false) {
      return null
    }
    return resolveWrappedSlot(slots.tabbar, (children) => {
      if (!children) {
        return null
      }
      return (
        <section class={`${mergedClsPrefix}-pro-layout__tabbar`}>
          {children}
        </section>
      )
    })
  }

  const resolveScrollHeader = () => {
    if (mergedNav === false && mergedTabbar === false) {
      return null
    }
    const headerDom = renderHeader()
    const tabbarDom = renderTabbar()
    if (!headerDom && !tabbarDom) {
      return null
    }
    const fixed = mergedNav === false || mergedNav.fixed || !headerDom
    return [
      <div class={[
        `${mergedClsPrefix}-pro-layout__scroll-behavior`,
        { [`${mergedClsPrefix}-pro-layout__scroll-behavior--fixed`]: fixed },
      ]}
      >
        {headerDom}
        {tabbarDom}
      </div>,
      fixed && [
        headerDom && (
          <div class={[
            `${mergedClsPrefix}-pro-layout__header`,
            `${mergedClsPrefix}-pro-layout__header--placeholder`,
          ]}
          >
          </div>
        ),
        tabbarDom && (
          <div class={[
            `${mergedClsPrefix}-pro-layout__tabbar`,
            `${mergedClsPrefix}-pro-layout__tabbar--placeholder`,
          ]}
          >
          </div>
        ),
      ],
    ]
  }

  const renderFooter = () => {
    if (mergedFooter === false) {
      return null
    }
    const { fixed } = mergedFooter
    return resolveWrappedSlot(slots.footer, (children) => {
      if (!children) {
        return null
      }
      return [
        <footer
          class={[
            `${mergedClsPrefix}-pro-layout__footer`,
            { [`${mergedClsPrefix}-pro-layout__footer--fixed`]: fixed },
          ]}
        >
          {children}
        </footer>,
        fixed && (
          <footer
            class={[
              `${mergedClsPrefix}-pro-layout__footer`,
              `${mergedClsPrefix}-pro-layout__footer--placeholder`,
            ]}
          />
        ),
      ]
    })
  }

  return (
    <div
      class={[
        `${mergedClsPrefix}-pro-layout`,
        `${mergedClsPrefix}-pro-layout--horizontal`,
      ]}
      style={mergedCssVars}
    >
      <NScrollbar
        class={`${mergedClsPrefix}-pro-layout__scrollbar`}
        contentClass={`${mergedClsPrefix}-pro-layout__scrollbar__inner`}
      >
        {resolveScrollHeader()}
        <main class={`${mergedClsPrefix}-pro-layout__main`}>{slots.default?.()}</main>
        {renderFooter()}
      </NScrollbar>
    </div>
  )
}

export function setupHorizontalLayoutStyle() {
  return cM('horizontal', [
    cB('pro-layout__scrollbar', `
      position:relative;
      flex: 1;
    `, [
      cE('inner', `
        display: flex;
        flex-direction: column;
        min-height: 100%;
        height: auto;
      `),
    ]),
    cB('pro-layout__scroll-behavior', [
      cM('fixed', `
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      `),
    ]),
    cB('pro-layout__header', `
      height: var(--pro-layout-header-height);
      display: flex;
      align-items: center;
      flex-shrink: 0;
      box-sizing: border-box;
      background: var(--pro-layout-color);
      border-bottom: 1px solid var(--pro-layout-border-color);
      transition:
        background .3s var(--pro-bezier),
        border-color .3s var(--pro-bezier);
    `, [
      cM('placeholder', `
        height: var(--pro-layout-header-height);
      `),
      cE('logo', `
        height: 100%;
        width: var(--pro-layout-sidebar-width);
        flex-shrink: 0;
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
    ]),
    cB('pro-layout__tabbar', `
      height: var(--pro-layout-tabbar-height);
      display: flex;
      flex-shrink: 0;
      box-sizing: border-box;
      background: var(--pro-layout-color);
      border-bottom: 1px solid var(--pro-layout-border-color);
      transition:
        background .3s var(--pro-bezier),
        border-color .3s var(--pro-bezier);
    `, [
      cM('placeholder', `
        height: var(--pro-layout-tabbar-height);
      `),
    ]),
    cB('pro-layout__main', `
      flex-grow: 1;
      flex-basis: 0;
    `),
    cB('pro-layout__footer', `
      height: var(--pro-layout-footer-height);
      flex-shrink: 0;
      background: var(--pro-layout-color);
      transition: background .3s var(--pro-bezier);
    `, [
      cM('fixed', `
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
      `),
    ]),
  ])
}
