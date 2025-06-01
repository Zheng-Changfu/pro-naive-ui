import { cB } from 'naive-ui'
import { setupFullContentLayoutStyle } from '../renderer/full-content'
import { setupHorizontalLayoutStyle } from '../renderer/horizontal'
import { setupMixedSidebarLayoutStyle } from '../renderer/mixed-sidebar'
import { setupMixedTwoColumnLayoutStyle } from '../renderer/mixed-two-column'
import { setupSidebarLayoutStyle } from '../renderer/sidebar'
import { setupTwoColumnLayoutStyle } from '../renderer/two-column'
import { setupVerticalLayoutStyle } from '../renderer/vertical'

export default cB('pro-layout', `
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
  `, [
  setupSidebarLayoutStyle(),
  setupVerticalLayoutStyle(),
  setupTwoColumnLayoutStyle(),
  setupHorizontalLayoutStyle(),
  setupFullContentLayoutStyle(),
  setupMixedSidebarLayoutStyle(),
  setupMixedTwoColumnLayoutStyle(),
])
