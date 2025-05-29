import type { SlotsType } from 'vue'
import type { SharedLayoutSlots } from '../../slots'
import { NScrollbar } from 'naive-ui'
import { defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../../../_internal/useClsPrefix'
import { useMountStyle } from '../../../_internal/useMountStyle'
import { resolveWrappedSlot } from '../../../_utils/resolveSlot'
import { useOverrideProps } from '../../../composables'
import { sharedLayoutProps } from '../../props'
import { useMergeConfig } from '../composables/useMergeConfig'
import style from './index.cssr'

const name = 'ProSidebarLayout'
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
      'pro-sidebar-layout',
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

      const logoDom = resolveWrappedSlot(this.$slots.logo, (children) => {
        if (!children) {
          return null
        }
        return <div class={`${this.mergedClsPrefix}-pro-layout__header__logo`}>{children}</div>
      })

      const headerLeftDom = resolveWrappedSlot(this.$slots['header-left'], (children) => {
        if (!children) {
          return null
        }
        return <div class={`${this.mergedClsPrefix}-pro-layout__header__left`}>{children}</div>
      })

      const headerMenuDom = resolveWrappedSlot(this.$slots['header-menu'], (children) => {
        if (!children) {
          return null
        }
        return <div class={`${this.mergedClsPrefix}-pro-layout__header__menu`}>{children}</div>
      })

      const headerCenterDom = resolveWrappedSlot(this.$slots['header-center'], (children) => {
        if (!children) {
          return null
        }
        return <div class={`${this.mergedClsPrefix}-pro-layout__header__center`}>{children}</div>
      })

      const headerRightDom = resolveWrappedSlot(this.$slots['header-right'], (children) => {
        if (!children) {
          return null
        }
        return <div class={`${this.mergedClsPrefix}-pro-layout__header__right`}>{children}</div>
      })

      if (
        !logoDom
        && !headerLeftDom
        && !headerMenuDom
        && !headerCenterDom
        && !headerRightDom
      ) {
        return null
      }
      return [
        <header
          class={`${this.mergedClsPrefix}-pro-layout__header`}
        >
          {logoDom}
          {headerLeftDom}
          {headerMenuDom}
          {headerCenterDom}
          {headerRightDom}
        </header>,
      ]
    }

    const renderTabbar = () => {
      if (this.mergedTabbar === false) {
        return null
      }
      return resolveWrappedSlot(this.$slots.tabbar, (children) => {
        if (!children) {
          return null
        }
        const fixed = this.mergedHeader === false || this.mergedHeader.fixed || renderHeader()
        return [
          <section
            class={[
              `${this.mergedClsPrefix}-pro-layout__tabbar`,
              fixed && `${this.mergedClsPrefix}-pro-layout__tabbar--fixed`,
            ]}
          >
            {children}
          </section>,
          <section
            class={`${this.mergedClsPrefix}-pro-layout__tabbar--placeholder`}
          >
          </section>,
        ]
      })
    }

    const resolveScrollHeader = () => {
      if (this.mergedHeader === false && this.mergedTabbar === false) {
        return null
      }
      const headerDom = renderHeader()
      if (!headerDom) {
        return null
      }
      return [
        <div class={[
          `${this.mergedClsPrefix}-pro-layout__scroll-behavior`,
          `${this.mergedClsPrefix}-pro-layout__scroll-behavior--fixed`,
        ]}
        >
          {headerDom}
        </div>,
        headerDom && (
          <div class={[
            `${this.mergedClsPrefix}-pro-layout__header`,
            `${this.mergedClsPrefix}-pro-layout__header--placeholder`,
          ]}
          >
          </div>
        ),
      ]
    }

    const renderFooter = () => {
      if (this.mergedFooter === false) {
        return null
      }
      const { fixed } = this.mergedFooter
      return resolveWrappedSlot(this.$slots.footer, (children) => {
        if (!children) {
          return null
        }
        return [
          <footer
            class={[
              `${this.mergedClsPrefix}-pro-layout__footer`,
              { [`${this.mergedClsPrefix}-pro-layout__footer--fixed`]: fixed },
            ]}
          >
            {children}
          </footer>,
          fixed && (
            <footer
              class={[
                `${this.mergedClsPrefix}-pro-layout__footer`,
                `${this.mergedClsPrefix}-pro-layout__footer--placeholder`,
              ]}
            >
            </footer>
          ),
        ]
      })
    }

    const renderAside = () => {
      const sidebarDom = resolveWrappedSlot(this.$slots.sidebar, (children) => {
        if (!children) {
          return null
        }
        return <div class={`${this.mergedClsPrefix}-pro-layout__aside__main`}>{children}</div>
      })

      if (!sidebarDom) {
        return null
      }
      return [
        <aside class={[
          `${this.mergedClsPrefix}-pro-layout__aside`,
        ]}
        >
          { sidebarDom }
        </aside>,
        <aside class={[
          `${this.mergedClsPrefix}-pro-layout__aside--placeholder`,
        ]}
        >
        </aside>,
      ]
    }

    return (
      <div
        class={[
          `${this.mergedClsPrefix}-pro-layout`,
          `${this.mergedClsPrefix}-pro-layout--sidebar`,
        ]}
        style={this.mergedCssVars}
      >
        <NScrollbar
          class={[
            `${this.mergedClsPrefix}-pro-layout__scrollbar`,
          ]}
          contentClass={`${this.mergedClsPrefix}-pro-layout__scrollbar__inner`}
        >
          {resolveScrollHeader()}
          <div class={[
            `${this.mergedClsPrefix}-pro-layout__wrapper`,
          ]}
          >
            {renderAside()}
            <main class={[
              `${this.mergedClsPrefix}-pro-layout__main`,
            ]}
            >
              {renderTabbar()}
              <main class={`${this.mergedClsPrefix}-pro-layout__main__content`}>{this.$slots.default?.()}</main>
              {renderFooter()}
            </main>
          </div>
        </NScrollbar>
      </div>
    )
  },
})
