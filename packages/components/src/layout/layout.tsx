import type { SlotsType } from 'vue'
import type { SharedLayoutSlots } from './slots'
import { NScrollbar } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { resolveWrappedSlot } from '../_utils/resolveSlot'
import { warnOnce } from '../_utils/warn'
import { useOverrideProps } from '../composables'
import { useMergeConfig } from './composables/useMergeConfig'
// import { useFullContentCls } from './composables/useFullContentCls'
// import { useHorizontalLayoutCls } from './composables/useHorizontalLayoutCls'
// import { useMergeConfig } from './composables/useMergeConfig'
// import { useMixedSidebarCls } from './composables/useMixedSidebarCls'
// import { useMixedTwoColumnCls } from './composables/useMixedTwoColumnCls'
// import { useSidebarLayoutCls } from './composables/useSidebarLayoutCls'
// import { useTwoColumnLayoutCls } from './composables/useTwoColumnLayoutCls'
import { useVerticalLayoutCls } from './composables/useVerticalLayoutCls'
import { proLayoutProps } from './props'
import style from './styles/index.cssr'

const name = 'ProLayout'
export default defineComponent({
  name,
  props: proLayoutProps,
  slots: Object as SlotsType<SharedLayoutSlots>,
  setup(props) {
    const mergedClsPrefix = useNaiveClsPrefix()
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const {
      mergedMode,
      mergedNav,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
      mergedCollasped,
    } = useMergeConfig(overridedProps)

    // const sidebarLayoutCls = useSidebarLayoutCls({
    //   mergedMode,
    //   mergedNav,
    //   mergedTabbar,
    //   mergedFooter,
    //   mergedSidebar,
    //   mergedCssVars,
    //   mergedCollasped,
    // })

    const verticalLayoutCls = useVerticalLayoutCls({
      mergedNav,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    // const twoColumnLayoutCls = useTwoColumnLayoutCls({
    //   mergedMode,
    //   mergedNav,
    //   mergedTabbar,
    //   mergedFooter,
    //   mergedSidebar,
    //   mergedCssVars,
    //   mergedCollasped,
    // })

    // const horizontalLayoutCls = useHorizontalLayoutCls({
    //   mergedMode,
    //   mergedNav,
    //   mergedTabbar,
    //   mergedFooter,
    //   mergedSidebar,
    //   mergedCssVars,
    //   mergedCollasped,
    // })

    // const fullContentCls = useFullContentCls({
    //   mergedMode,
    //   mergedNav,
    //   mergedTabbar,
    //   mergedFooter,
    //   mergedSidebar,
    //   mergedCssVars,
    //   mergedCollasped,
    // })

    // const mixedSidebarCls = useMixedSidebarCls({
    //   mergedMode,
    //   mergedNav,
    //   mergedTabbar,
    //   mergedFooter,
    //   mergedSidebar,
    //   mergedCssVars,
    //   mergedCollasped,
    // })

    // const mixedTwoColumnCls = useMixedTwoColumnCls({
    //   mergedMode,
    //   mergedNav,
    //   mergedTabbar,
    //   mergedFooter,
    //   mergedSidebar,
    //   mergedCssVars,
    //   mergedCollasped,
    // })

    const cls = computed(() => {
      const mode = mergedMode.value
      /**
       *  layout
          scrollbar
          scrollbarContent
          sidebar
          section
          header
          tabbar
          main
          footer
       *
       *
       */

      switch (mode) {
        // case 'sidebar':
        //   return sidebarLayoutCls.value
        case 'vertical':
          return verticalLayoutCls.value
        // case 'two-column':
        //   return twoColumnLayoutCls.value
        // case 'horizontal':
        //   return horizontalLayoutCls.value
        // case 'full-content':
        //   return fullContentCls.value
        // case 'mixed-sidebar':
        //   return mixedSidebarCls.value
        // case 'mixed-two-column':
        //   return mixedTwoColumnCls.value
        default:
          if (__DEV__) {
            warnOnce(
              'pro-layout',
              `mode "${mode}" is not supported, falling back to "vertical" mode.`,
            )
          }
          return verticalLayoutCls.value
      }
    })

    const isSidebarLayout = computed(() => {
      return mergedMode.value === 'sidebar' || mergedMode.value === 'mixed-sidebar'
    })

    useMountStyle(
      name,
      'pro-layout',
      style,
    )

    return {
      cls,
      mergedMode,
      mergedNav,
      mergedTabbar,
      mergedFooter,
      mergedCssVars,
      mergedSidebar,
      mergedClsPrefix,
      mergedCollasped,
      isSidebarLayout,
    }
  },
  render() {
    const logoDom = resolveWrappedSlot(this.$slots.logo, (children) => {
      if (!children) {
        return null
      }
      return (
        <div class={`${this.mergedClsPrefix}-pro-layout__logo`}>
          {children}
        </div>
      )
    })

    const headerLeftDom = resolveWrappedSlot(this.$slots['header-left'], (children) => {
      if (!children) {
        return null
      }
      return (
        <div class={`${this.mergedClsPrefix}-pro-layout__header__inner__left`}>
          {children}
        </div>
      )
    })

    const headerCenterDom = resolveWrappedSlot(this.$slots['header-center'], (children) => {
      if (!children) {
        return null
      }
      return (
        <div class={`${this.mergedClsPrefix}-pro-layout__header__inner__center`}>
          {children}
        </div>
      )
    })

    const headerRightDom = resolveWrappedSlot(this.$slots['header-right'], (children) => {
      if (!children) {
        return null
      }
      return (
        <div class={`${this.mergedClsPrefix}-pro-layout__header__inner__right`}>
          {children}
        </div>
      )
    })

    const sidebarDom = resolveWrappedSlot(this.$slots.sidebar, (children) => {
      if (!children) {
        return null
      }
      return <div class={`${this.mergedClsPrefix}-pro-layout__sidebar`}>{children}</div>
    })

    const sidebarExtraDom = resolveWrappedSlot(this.$slots['sidebar-extra'], (children) => {
      if (!children) {
        return null
      }
      return <div class={`${this.mergedClsPrefix}-pro-layout__sidebar-extra`}>{children}</div>
    })

    return (
      <div
        class={[
          ...this.cls.layout,
          `${this.mergedClsPrefix}-pro-layout`,
        ]}
        style={this.mergedCssVars}
      >
        <aside class={[
          ...this.cls.aside,
          `${this.mergedClsPrefix}-pro-layout__aside`,
        ]}
        >
          {logoDom}
          {sidebarDom}
          {sidebarExtraDom}
        </aside>
        <NScrollbar
          class={`${this.mergedClsPrefix}-pro-layout__scrollbar`}
          contentClass={`${this.mergedClsPrefix}-pro-layout__scrollbar__inner`}
        >
          <header class={[
            ...this.cls.header,
            `${this.mergedClsPrefix}-pro-layout__header`,
          ]}
          >
            <div class={[
              ...this.cls.nav,
              `${this.mergedClsPrefix}-pro-layout__nav`,
            ]}
            >
              {logoDom}
              {headerLeftDom}
              {headerCenterDom}
              {headerRightDom}
            </div>
            {
              resolveWrappedSlot(this.$slots.tabbar, (children) => {
                if (!children) {
                  return null
                }
                return (
                  <div class={[
                    ...this.cls.tabbar,
                    `${this.mergedClsPrefix}-pro-layout__tabbar`,
                  ]}
                  >
                    {children}
                  </div>
                )
              })
            }
          </header>
          <main class={[
            ...this.cls.main,
            `${this.mergedClsPrefix}-pro-layout__main`,
          ]}
          >
            {this.$slots.default?.()}
          </main>
          {
            resolveWrappedSlot(this.$slots.footer, (children) => {
              if (!children) {
                return null
              }
              return (
                <footer class={[
                  ...this.cls.footer,
                  `${this.mergedClsPrefix}-pro-layout__footer`,
                ]}
                >
                  {children}
                </footer>
              )
            })
          }
        </NScrollbar>
      </div>
    )
  },
})
