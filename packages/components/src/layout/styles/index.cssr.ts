import { cB } from 'naive-ui'
import { setupFullContentLayoutStyle } from '../composables/useFullContentLayoutCls'
import { setupHorizontalLayoutStyle } from '../composables/useHorizontalLayoutCls'
import { setupMixedSidebarLayoutStyle } from '../composables/useMixedSidebarCls'
import { setupSidebarLayoutStyle } from '../composables/useSidebarLayoutCls'
import { setupVerticalLayoutStyle } from '../composables/useVerticalLayoutCls'
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
