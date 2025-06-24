import { c, cB, cM } from 'naive-ui'
import { setupFullContentLayoutStyle } from '../composables/use-full-content-layout-cls'
import { setupHorizontalLayoutStyle } from '../composables/use-horizontal-layout-cls'
import { setupMixedSidebarLayoutStyle } from '../composables/use-mixed-sidebar-cls'
import { setupMixedTwoColumnLayoutStyle } from '../composables/use-mixed-two-column-layout-cls'
import { setupMobileLayoutStyle } from '../composables/use-mobile-layout-cls'
import { setupSidebarLayoutStyle } from '../composables/use-sidebar-layout-cls'
import { setupTwoColumnLayoutStyle } from '../composables/use-two-column-layout-cls'
import { setupVerticalLayoutStyle } from '../composables/use-vertical-layout-cls'

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
  setupMixedSidebarLayoutStyle(),
  setupMixedTwoColumnLayoutStyle(),
])
