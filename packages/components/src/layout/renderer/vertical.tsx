import type { LayoutRenderOptions } from '../types'
import { cB, cE, cM, NScrollbar } from 'naive-ui'
import { resolveWrappedSlot } from '../../_utils/resolveSlot'

export function renderVerticalLayout({
  slots,
  mergedHeader,
  mergedTabbar,
  mergedFooter,
  mergedCssVars,
  mergedClsPrefix,
}: LayoutRenderOptions) {
  const renderHeader = () => {
    if (mergedHeader === false) {
      return null
    }

    const headerLeftDom = resolveWrappedSlot(slots['header-left'], (children) => {
      if (!children) {
        return null
      }
      return <div class={`${mergedClsPrefix}-pro-layout__header__left`}>{children}</div>
    })

    const headerMenuDom = resolveWrappedSlot(slots['header-menu'], (children) => {
      if (!children) {
        return null
      }
      return <div class={`${mergedClsPrefix}-pro-layout__header__menu`}>{children}</div>
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
      !headerLeftDom
      && !headerMenuDom
      && !headerCenterDom
      && !headerRightDom
    ) {
      return null
    }
    return (
      <header class={`${mergedClsPrefix}-pro-layout__header`}>
        {headerLeftDom}
        {headerMenuDom}
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

  const resolveScrollHeader = () => {
    if (mergedHeader === false && mergedTabbar === false) {
      return null
    }
    const headerDom = renderHeader()
    const tabbarDom = renderTabbar()
    if (!headerDom && !tabbarDom) {
      return null
    }
    const fixed = mergedHeader === false || mergedHeader.fixed || !headerDom
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

  const renderAside = () => {
    const logoDom = resolveWrappedSlot(slots.logo, (children) => {
      if (!children) {
        return null
      }
      return <div class={`${mergedClsPrefix}-pro-layout__aside__logo`}>{children}</div>
    })

    const sidebarDom = resolveWrappedSlot(slots.sidebar, (children) => {
      if (!children) {
        return null
      }
      return <div class={`${mergedClsPrefix}-pro-layout__aside__main`}>{children}</div>
    })

    if (!logoDom && !sidebarDom) {
      return null
    }
    return (
      <aside class={`${mergedClsPrefix}-pro-layout__aside`}>
        {logoDom}
        {sidebarDom}
      </aside>
    )
  }

  return (
    <div
      class={[
        `${mergedClsPrefix}-pro-layout`,
        `${mergedClsPrefix}-pro-layout--vertical`,
      ]}
      style={mergedCssVars}
    >
      {renderAside()}
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
          background .3s var(--pro-bezier),
          border-color .3s var(--pro-bezier);
      `, [
      cE('logo', `
          height: var(--pro-layout-header-height);
          width: 100%;
          flex-shrink: 0;
        `),
      cE('main', `
          flex-grow: 1;
          flex-basis: 0;
        `),
    ]),
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
      cE('menu', `
            height: 100%;
            // TODO
        `),
      cE('center', `
          height: 100%;
          flex: 1;
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
