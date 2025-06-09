import { cB } from 'naive-ui'
import { setupFullContentLayoutStyle } from '../composables/useFullContentLayoutCls'
import { setupVerticalLayoutStyle } from '../composables/useVerticalLayoutCls'
import { setupHorizontalLayoutStyle } from '../renderer/horizontal'
import { setupMixedSidebarLayoutStyle } from '../renderer/mixed-sidebar'
import { setupMixedTwoColumnLayoutStyle } from '../renderer/mixed-two-column'
import { setupSidebarLayoutStyle } from '../renderer/sidebar'
import { setupTwoColumnLayoutStyle } from '../renderer/two-column'

export default cB('pro-layout', `
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  `, [
  // setupSidebarLayoutStyle(),
  setupVerticalLayoutStyle(),
  // setupTwoColumnLayoutStyle(),
  // setupHorizontalLayoutStyle(),
  setupFullContentLayoutStyle(),
  // setupMixedSidebarLayoutStyle(),
  // setupMixedTwoColumnLayoutStyle(),
])
