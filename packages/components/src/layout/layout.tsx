import type { SlotsType } from 'vue'
import type { ProLayoutSlots } from './slots'
import { NScrollbar } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/use-cls-prefix'
import { useMountStyle } from '../_internal/use-mount-style'
import { resolveWrappedSlot } from '../_utils/resolve-slot'
import { warnOnce } from '../_utils/warn'
import { useOverrideProps } from '../composables'
import { useDisabledTransitionWhenModeChange } from './composables/use-disabled-transition-on-mode-change'
import { useFullContentLayoutCls } from './composables/use-full-content-layout-cls'
import { useHorizontalLayoutCls } from './composables/use-horizontal-layout-cls'
import { useMergeConfig } from './composables/use-merge-config'
import { useMixedSidebarLayoutCls } from './composables/use-mixed-sidebar-cls'
import { useMixedTwoColumnLayoutCls } from './composables/use-mixed-two-column-layout-cls'
import { useMobileLayoutCls } from './composables/use-mobile-layout-cls'
import { useSidebarLayoutCls } from './composables/use-sidebar-layout-cls'
import { useTwoColumnLayoutCls } from './composables/use-two-column-layout-cls'
import { useVerticalLayoutCls } from './composables/use-vertical-layout-cls'
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
      mergedNav,
      mergedMode,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
      mergedIsMobile,
      mergedCollasped,
      mergedNavClass,
      mergedLogoClass,
      mergedMainClass,
      mergedAsideClass,
      mergedHeaderClass,
      mergedTabbarClass,
      mergedFooterClass,
    } = useMergeConfig(overridedProps)

    const {
      disabled,
    } = useDisabledTransitionWhenModeChange(mergedMode)

    const mobileLayoutCls = useMobileLayoutCls({
      mergedNav,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    const sidebarLayoutCls = useSidebarLayoutCls({
      mergedNav,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    const mixedSidebarLayoutCls = useMixedSidebarLayoutCls({
      mergedNav,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    const verticalLayoutCls = useVerticalLayoutCls({
      mergedNav,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    const horizontalLayoutCls = useHorizontalLayoutCls({
      mergedNav,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    const fullContentLayoutCls = useFullContentLayoutCls({
      mergedNav,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    const twoColumnLayoutCls = useTwoColumnLayoutCls({
      mergedNav,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    const mixedTwoColumnCls = useMixedTwoColumnLayoutCls({
      mergedNav,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollasped,
      mergedClsPrefix,
    })

    const cls = computed(() => {
      if (mergedIsMobile.value) {
        return mobileLayoutCls.value
      }
      const mode = mergedMode.value
      switch (mode) {
        case 'sidebar':
          return sidebarLayoutCls.value
        case 'vertical':
          return verticalLayoutCls.value
        case 'two-column':
          return twoColumnLayoutCls.value
        case 'horizontal':
          return horizontalLayoutCls.value
        case 'full-content':
          return fullContentLayoutCls.value
        case 'mixed-sidebar':
          return mixedSidebarLayoutCls.value
        case 'mixed-two-column':
          return mixedTwoColumnCls.value
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
      disabled,
      mergedNav,
      mergedMode,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
      mergedClsPrefix,
      mergedCollasped,
      mergedNavClass,
      mergedLogoClass,
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
        <div
          class={[
            `${this.mergedClsPrefix}-pro-layout__logo`,
            ...this.cls.logo,
            ...this.mergedLogoClass,
          ]}
        >
          {children}
        </div>
      )
    })

    const navLeftDom = resolveWrappedSlot(this.$slots['nav-left'] ?? this.$slots['header-left'], (children) => {
      return (
        <div class={`${this.mergedClsPrefix}-pro-layout__nav__left`}>
          {children}
        </div>
      )
    })

    const navCenterDom = resolveWrappedSlot(this.$slots['nav-center'] ?? this.$slots['header-center'], (children) => {
      return (
        <div class={`${this.mergedClsPrefix}-pro-layout__nav__center`}>
          {children}
        </div>
      )
    })

    const navRightDom = resolveWrappedSlot(this.$slots['nav-right'] ?? this.$slots['header-right'], (children) => {
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
          { [`${this.mergedClsPrefix}-pro-layout--disabled-transition`]: this.disabled },
          ...this.cls.layout,
        ]}
        // 这些 cssVars 可能会频繁变更，所以不支持 inline-theme-disabled，否则会生成很多无用的 style 标签
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
              {navLeftDom}
              {navCenterDom}
              {navRightDom}
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
