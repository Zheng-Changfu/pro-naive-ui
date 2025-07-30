import type { CalcLayoutVarsOptions } from '../types'
import { cB, cM } from 'naive-ui'
import { computed } from 'vue'

export function useFullContentLayoutVars(_: CalcLayoutVarsOptions) {
  return computed(() => {
    return {}
  })
}

export function setupFullContentLayoutStyle() {
  return cM('full-content', [
    cB('pro-layout__aside', `
      display: none;
    `),
    cB('pro-layout__scrollbar__inner', `
        display: flex;
        min-height: 100%;
        flex-direction: column;
    `),
    cB('pro-layout__nav', `
      display: none;
    `),
    cB('pro-layout__tabbar', `
      display: none;
    `),
    cB('pro-layout__content', `
        flex-grow: 1;
        flex-basis: 0;
        background: var(--pro-layout-content-color);
        transition:
          background .3s var(--n-bezier);
      `),
    cB('pro-layout__footer', `
      display: none;
    `),
  ])
}
