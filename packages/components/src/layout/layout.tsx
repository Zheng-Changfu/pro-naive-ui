import type { SlotsType } from 'vue'
import type { ProLayoutSlots } from './slots'
import { NScrollbar } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/use-cls-prefix'
import { useMountStyle } from '../_internal/use-mount-style'
import { resolveWrappedSlot } from '../_utils/resolve-slot'
import { warnOnce } from '../_utils/warn'
import { useOverrideProps } from '../composables'
import { useFullContentLayoutCls } from './composables/useFullContentLayoutCls'
import { useHorizontalLayoutCls } from './composables/useHorizontalLayoutCls'
import { useMergeConfig } from './composables/useMergeConfig'
import { useMixedSidebarCls } from './composables/useMixedSidebarCls'
// import { useMixedTwoColumnCls } from './composables/useMixedTwoColumnCls'
import { useSidebarLayoutCls } from './composables/useSidebarLayoutCls'
// import { useTwoColumnLayoutCls } from './composables/useTwoColumnLayoutCls'
import { useVerticalLayoutCls } from './composables/useVerticalLayoutCls'
import { proLayoutProps } from './props'
import style from './styles/index.cssr'

const name = 'ProLayout'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proLayoutProps,
  slots: Object as SlotsType<ProLayoutSlots>,
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
      mergedNavClass,
      mergedMainClass,
      mergedAsideClass,
      mergedHeaderClass,
      mergedTabbarClass,
      mergedFooterClass,
    } = useMergeConfig(overridedProps)

    const sidebarLayoutCls = useSidebarLayoutCls({
      mergedNav,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    const mixedSidebarCls = useMixedSidebarCls({
      mergedNav,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    const verticalLayoutCls = useVerticalLayoutCls({
      mergedNav,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    const horizontalLayoutCls = useHorizontalLayoutCls({
      mergedNav,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    const fullContentCls = useFullContentLayoutCls({
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
      switch (mode) {
        case 'sidebar':
          return sidebarLayoutCls.value
        case 'vertical':
          return verticalLayoutCls.value
        // case 'two-column':
        //   return twoColumnLayoutCls.value
        case 'horizontal':
          return horizontalLayoutCls.value
        case 'full-content':
          return fullContentCls.value
        case 'mixed-sidebar':
          return mixedSidebarCls.value
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
      mergedNavClass,
      mergedMainClass,
      mergedAsideClass,
      mergedHeaderClass,
      mergedTabbarClass,
      mergedFooterClass,
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
        <div class={`${this.mergedClsPrefix}-pro-layout__nav__left`}>
          {children}
        </div>
      )
    })

    const headerCenterDom = resolveWrappedSlot(this.$slots['header-center'], (children) => {
      if (!children) {
        return null
      }
      return (
        <div class={`${this.mergedClsPrefix}-pro-layout__nav__center`}>
          {children}
        </div>
      )
    })

    const headerRightDom = resolveWrappedSlot(this.$slots['header-right'], (children) => {
      if (!children) {
        return null
      }
      return (
        <div class={`${this.mergedClsPrefix}-pro-layout__nav__right`}>
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
        {...this.$attrs}
        class={[
          `${this.mergedClsPrefix}-pro-layout`,
          ...this.cls.layout,
        ]}
        style={this.mergedCssVars}
      >
        <aside class={[
          `${this.mergedClsPrefix}-pro-layout__aside`,
          ...this.cls.aside,
          ...this.mergedAsideClass,
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
            `${this.mergedClsPrefix}-pro-layout__header`,
            ...this.cls.header,
            ...this.mergedHeaderClass,
          ]}
          >
            <div class={[
              `${this.mergedClsPrefix}-pro-layout__nav`,
              ...this.cls.nav,
              ...this.mergedNavClass,
            ]}
            >
              {logoDom}
              {headerLeftDom}
              {headerCenterDom}
              {headerRightDom}
            </div>
            <div class={[
              `${this.mergedClsPrefix}-pro-layout__tabbar`,
              ...this.cls.tabbar,
              ...this.mergedTabbarClass,
            ]}
            >
              {this.$slots.tabbar?.()}
            </div>
          </header>
          <main class={[
            `${this.mergedClsPrefix}-pro-layout__main`,
            ...this.cls.main,
            ...this.mergedMainClass,
          ]}
          >
            {this.$slots.default?.()}
          </main>
          <footer class={[
            `${this.mergedClsPrefix}-pro-layout__footer`,
            ...this.cls.footer,
            ...this.mergedFooterClass,
          ]}
          >
            {this.$slots.footer?.()}
          </footer>
        </NScrollbar>
      </div>
    )
  },
})
