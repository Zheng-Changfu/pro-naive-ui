import { cB } from 'naive-ui'
import { setupSidebarLayoutStyle } from '../composables/useSidebarLayoutCls'
import { setupVerticalLayoutStyle } from '../composables/useVerticalLayoutCls'
import { setupFullContentLayoutStyle } from '../renderer/full-content'
import { setupHorizontalLayoutStyle } from '../renderer/horizontal'
import { setupMixedSidebarLayoutStyle } from '../renderer/mixed-sidebar'
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
  // setupHorizontalLayoutStyle(),
  // setupFullContentLayoutStyle(),
  // setupMixedSidebarLayoutStyle(),
  // setupMixedTwoColumnLayoutStyle(),
])
