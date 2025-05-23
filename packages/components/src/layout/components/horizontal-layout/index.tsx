import type { SlotsType } from 'vue'
import type { SharedLayoutSlots } from '../../slots'
import { NScrollbar } from 'naive-ui'
import { defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../../../_internal/useClsPrefix'
import { useMountStyle } from '../../../_internal/useMountStyle'
import { useOverrideProps } from '../../../composables'
import { sharedLayoutProps } from '../../props'
import style from './index.cssr'

const name = 'ProHorizontalLayout'
export default defineComponent({
  name,
  props: sharedLayoutProps,
  slots: Object as SlotsType<SharedLayoutSlots>,
  setup(props) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const mergedClsPrefix = useNaiveClsPrefix()

    useMountStyle(
      name,
      'pro-horizontal-layout',
      style,
    )

    return {
      mergedClsPrefix,
    }
  },
  render() {
    return (
      <div class={[
        `${this.mergedClsPrefix}-pro-layout`,
        `${this.mergedClsPrefix}-pro-layout--horizontal`,
      ]}
      >
        <div class={[`${this.mergedClsPrefix}-pro-layout__main`]}>
          <header class={[`${this.mergedClsPrefix}-pro-layout__main__header`]}>
            main__header
          </header>
          <section class={[`${this.mergedClsPrefix}-pro-layout__main__tabs`]}>
            main__tabs
          </section>
          <NScrollbar>
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
            </main>
          </NScrollbar>
          <footer class={[`${this.mergedClsPrefix}-pro-layout__main__footer`]}>
            main__footer
          </footer>
        </div>
      </div>
    )
  },
})
