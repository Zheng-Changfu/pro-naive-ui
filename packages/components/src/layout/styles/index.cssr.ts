import { cB } from 'naive-ui'
import { setupFullContentLayoutStyle } from '../composables/use-full-content-layout-cls'
import { setupHorizontalLayoutStyle } from '../composables/use-horizontal-layout-cls'
import { setupMixedSidebarLayoutStyle } from '../composables/use-mixed-sidebar-cls'
import { setupSidebarLayoutStyle } from '../composables/use-sidebar-layout-cls'
import { setupVerticalLayoutStyle } from '../composables/use-vertical-layout-cls'
import { setupMixedTwoColumnLayoutStyle } from '../renderer/mixed-two-column'
import { setupTwoColumnLayoutStyle } from '../renderer/two-column'

export default cB('pro-layout', `
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  `, [
  setupSidebarLayoutStyle(),
  setupVerticalLayoutStyle(),
  // setupTwoColumnLayoutStyle(),
  setupHorizontalLayoutStyle(),
  setupFullContentLayoutStyle(),
  setupMixedSidebarLayoutStyle(),
  // setupMixedTwoColumnLayoutStyle(),
])
