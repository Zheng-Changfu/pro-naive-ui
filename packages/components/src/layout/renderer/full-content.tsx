import type { LayoutRenderOptions } from '../types'
import { cB, cE, cM, NScrollbar } from 'naive-ui'

export function renderFullContentLayout({
  slots,
  mergedCssVars,
  mergedClsPrefix,
}: LayoutRenderOptions) {
  return (
    <div
      class={[
        `${mergedClsPrefix}-pro-layout`,
        `${mergedClsPrefix}-pro-layout--full-content`,
      ]}
      style={mergedCssVars}
    >
      <NScrollbar
        class={`${mergedClsPrefix}-pro-layout__scrollbar`}
        contentClass={`${mergedClsPrefix}-pro-layout__scrollbar__inner`}
      >
        <main class={[`${mergedClsPrefix}-pro-layout__main`]}>
          {slots.default?.()}
        </main>
      </NScrollbar>
    </div>
  )
}

export function setupFullContentLayoutStyle() {
  return cM('full-content', [
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
    cB('pro-layout__main', `
      flex-grow: 1;
      flex-basis: 0;
    `),
  ])
}
