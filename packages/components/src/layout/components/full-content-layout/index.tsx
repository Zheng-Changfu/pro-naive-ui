import type { SlotsType } from 'vue'
import type { SharedLayoutSlots } from '../../slots'
import { NScrollbar } from 'naive-ui'
import { defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../../../_internal/useClsPrefix'
import { useMountStyle } from '../../../_internal/useMountStyle'
import { useOverrideProps } from '../../../composables'
import { sharedLayoutProps } from '../../props'
import { useMergeConfig } from '../composables/useMergeConfig'
import style from './index.cssr'

const name = 'ProFullContentLayout'
export default defineComponent({
  name,
  props: sharedLayoutProps,
  slots: Object as SlotsType<SharedLayoutSlots>,
  setup(props) {
    const mergedClsPrefix = useNaiveClsPrefix()
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const {
      mergedHeader,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
    } = useMergeConfig(overridedProps)

    useMountStyle(
      name,
      'pro-full-content-layout',
      style,
    )

    return {
      mergedHeader,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
      mergedClsPrefix,
    }
  },
  render() {
    return (
      <div
        class={[
          `${this.mergedClsPrefix}-pro-layout`,
          `${this.mergedClsPrefix}-pro-layout--full-content`,
        ]}
        style={this.mergedCssVars}
      >
        <NScrollbar
          class={[
            `${this.mergedClsPrefix}-pro-layout__scrollbar`,
          ]}
          contentClass={`${this.mergedClsPrefix}-pro-layout__main`}
        >
          <main class={[`${this.mergedClsPrefix}-pro-layout__main__content`]}>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
            <div>main__content</div>
          </main>
        </NScrollbar>
      </div>
    )
  },
})
