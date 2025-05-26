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

const name = 'ProVerticalLayout'
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
      'pro-vertical-layout',
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
    const renderHeader = () => {
      if (this.mergedHeader === false) {
        return null
      }
      const { fixed } = this.mergedHeader
      return [
        <header
          class={[
            `${this.mergedClsPrefix}-pro-layout__main__header`,
            { [`${this.mergedClsPrefix}-pro-layout__main__header--fixed`]: fixed },
          ]}
        >
          header...
        </header>,
        fixed && (
          <header
            class={[
              `${this.mergedClsPrefix}-pro-layout__main__header`,
              `${this.mergedClsPrefix}-pro-layout__main__header--placeholder`,
            ]}
          >
          </header>
        ),
      ]
    }

    const renderTabbar = () => {
      if (this.mergedTabbar === false) {
        return null
      }
      const fixed = this.mergedHeader === false || this.mergedHeader.fixed
      return [
        <section
          class={[
            `${this.mergedClsPrefix}-pro-layout__main__tabbar`,
            { [`${this.mergedClsPrefix}-pro-layout__main__tabbar--fixed`]: fixed },
          ]}
        >
          main__tabbar
        </section>,
        fixed && (
          <section
            class={[
              `${this.mergedClsPrefix}-pro-layout__main__tabbar`,
              `${this.mergedClsPrefix}-pro-layout__main__tabbar--placeholder`,
            ]}
          >
          </section>
        ),
      ]
    }

    const renderFooter = () => {
      if (this.mergedFooter === false) {
        return null
      }
      const { fixed } = this.mergedFooter
      return [
        <footer
          class={[
            `${this.mergedClsPrefix}-pro-layout__main__footer`,
            { [`${this.mergedClsPrefix}-pro-layout__main__footer--fixed`]: fixed },
          ]}
        >
          main__footer
        </footer>,
        fixed && (
          <footer
            class={[
              `${this.mergedClsPrefix}-pro-layout__main__footer`,
              `${this.mergedClsPrefix}-pro-layout__main__footer--placeholder`,
            ]}
          >
          </footer>
        ),
      ]
    }

    return (
      <div
        class={[
          `${this.mergedClsPrefix}-pro-layout`,
          `${this.mergedClsPrefix}-pro-layout--vertical`,
        ]}
        style={this.mergedCssVars}
      >
        <aside class={[
          `${this.mergedClsPrefix}-pro-layout__aside`,
        ]}
        >
          <div class={[
            `${this.mergedClsPrefix}-pro-layout__aside__header`,
          ]}
          >
            aside__header
          </div>
          <div class={[
            `${this.mergedClsPrefix}-pro-layout__aside__main`,
          ]}
          >
            <div>aside__main</div>
          </div>
        </aside>
        <NScrollbar
          class={[
            `${this.mergedClsPrefix}-pro-layout__scrollbar`,
          ]}
          contentClass={`${this.mergedClsPrefix}-pro-layout__main`}
        >
          {renderHeader()}
          {renderTabbar()}
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
          </main>
          {renderFooter()}
        </NScrollbar>
      </div>
    )
  },
})
