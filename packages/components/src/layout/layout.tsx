import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { warnOnce } from '../_utils/warn'
import { useOverrideProps } from '../composables'
import { useMergeConfig } from './components/composables/useMergeConfig'
import { proLayoutProps } from './props'
import { renderFullContentLayout } from './renderer/full-content'
import { renderHorizontalLayout } from './renderer/horizontal'
import { renderMixedSidebarLayout } from './renderer/mixed-sidebar'
import { renderMixedTwoColumnLayout } from './renderer/mixed-two-column'
import { renderSidebarLayout } from './renderer/sidebar'
import { renderTwoColumnLayout } from './renderer/two-column'
import { renderVerticalLayout } from './renderer/vertical'
import style from './styles/index.cssr'

const name = 'ProLayout'
export default defineComponent({
  name,
  props: proLayoutProps,
  setup(props) {
    const mergedClsPrefix = useNaiveClsPrefix()
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const {
      mergedMode,
      mergedHeader,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
    } = useMergeConfig(overridedProps)

    const renderLayout = computed(() => {
      const mode = mergedMode.value
      switch (mode) {
        case 'sidebar':
          return renderSidebarLayout
        case 'vertical':
          return renderVerticalLayout
        case 'two-column':
          return renderTwoColumnLayout
        case 'horizontal':
          return renderHorizontalLayout
        case 'full-content':
          return renderFullContentLayout
        case 'mixed-sidebar':
          return renderMixedSidebarLayout
        case 'mixed-two-column':
          return renderMixedTwoColumnLayout
        default:
          if (__DEV__) {
            warnOnce(
              'pro-layout',
              `mode "${mode}" is not supported, falling back to "vertical" mode.`,
            )
          }
          return renderVerticalLayout
      }
    })

    useMountStyle(
      name,
      'pro-layout',
      style,
    )

    return {
      mergedMode,
      mergedHeader,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
      mergedClsPrefix,
      renderLayout,
    }
  },
  render() {
    return this.renderLayout({
      slots: this.$slots,
      mergedFooter: this.mergedFooter,
      mergedHeader: this.mergedHeader,
      mergedTabbar: this.mergedTabbar,
      mergedCssVars: this.mergedCssVars,
      mergedSidebar: this.mergedSidebar,
      mergedClsPrefix: this.mergedClsPrefix,
    })
  },
})
