import { c, cB, cM } from 'naive-ui'
import { setupFullContentLayoutStyle } from '../composables/use-full-content-layout-vars'
import { setupHorizontalLayoutStyle } from '../composables/use-horizontal-layout-vars'
import { setupMobileLayoutStyle } from '../composables/use-mobile-layout-vars'
import { setupSidebarLayoutStyle } from '../composables/use-sidebar-layout-vars'
import { setupTwoColumnLayoutStyle } from '../composables/use-two-column-layout-vars'
import { setupVerticalLayoutStyle } from '../composables/use-vertical-layout-vars'

export default cB('pro-layout', `
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    color: var(--n-text-color);
    background-color: var(--n-color);
    transition: 
      color .3s var(--n-bezier),
      background-color .3s var(--n-bezier);
  `, [
  cM('disabled-transition', [
    c('*', `
      transition: none !important;
    `),
  ]),
  setupMobileLayoutStyle(),
  setupSidebarLayoutStyle(),
  setupVerticalLayoutStyle(),
  setupTwoColumnLayoutStyle(),
  setupHorizontalLayoutStyle(),
  setupFullContentLayoutStyle(),
])
