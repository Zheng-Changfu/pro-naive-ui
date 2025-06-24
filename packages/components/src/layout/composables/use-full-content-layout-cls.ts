import type { CalcLayoutClsOptions } from '../types'
import { cB, cM } from 'naive-ui'
import { computed } from 'vue'

export function useFullContentLayoutCls({
  mergedClsPrefix,
}: CalcLayoutClsOptions) {
  return computed(() => {
    return {
      layout: [
        `${mergedClsPrefix.value}-pro-layout--full-content`,
      ],
      logo: [],
      aside: [
        { [`${mergedClsPrefix.value}-pro-layout__aside--hidden`]: true },
      ],
      header: [],
      nav: [
        { [`${mergedClsPrefix.value}-pro-layout__nav--hidden`]: true },
      ],
      tabbar: [
        { [`${mergedClsPrefix.value}-pro-layout__tabbar--hidden`]: true },
      ],
      main: [],
      footer: [
        { [`${mergedClsPrefix.value}-pro-layout__footer--hidden`]: true },
      ],
    }
  })
}

export function setupFullContentLayoutStyle() {
  return cM('full-content', [
    cB('pro-layout__aside', [
      cM('hidden', `
          display: none;
        `),
    ]),
    cB('pro-layout__scrollbar__inner', `
        display: flex;
        min-height: 100%;
        flex-direction: column;
    `),
    cB('pro-layout__nav', [
      cM('hidden', `
          display: none;
      `),
    ]),
    cB('pro-layout__tabbar', [
      cM('hidden', `
          display: none;
      `),
    ]),
    cB('pro-layout__main', `
        flex-grow: 1;
        flex-basis: 0;
      `),
    cB('pro-layout__footer', [
      cM('hidden', `
          display: none;
        `),
    ]),
  ])
}
