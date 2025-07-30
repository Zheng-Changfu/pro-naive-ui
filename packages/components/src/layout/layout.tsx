import type { ScrollbarProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProLayoutSlots } from './slots'
import type { CalcLayoutVarsOptions } from './types'
import { merge } from 'lodash-es'
import { NScrollbar, useThemeVars } from 'naive-ui'
import { computed, defineComponent, provide, toRef } from 'vue'
import { useNaiveClsPrefix } from '../_internal/use-cls-prefix'
import { useMountStyle } from '../_internal/use-mount-style'
import { resolveWrappedSlot } from '../_utils/resolve-slot'
import { warnOnce } from '../_utils/warn'
import { useOverrideProps } from '../composables'
import { useDisabledTransitionWhenModeChange } from './composables/use-disabled-transition-on-mode-change'
import { useFullContentLayoutVars } from './composables/use-full-content-layout-vars'
import { useHorizontalLayoutVars } from './composables/use-horizontal-layout-vars'
import { useMergeConfig } from './composables/use-merge-config'
import { useMobileLayoutVars } from './composables/use-mobile-layout-vars'
import { useSidebarLayoutVars } from './composables/use-sidebar-layout-vars'
import { useTwoColumnLayoutVars } from './composables/use-two-column-layout-vars'
import { useVerticalLayoutVars } from './composables/use-vertical-layout-vars'
import { proLayoutProps } from './props'
import style from './styles/index.cssr'

const name = 'ProLayout'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proLayoutProps,
  slots: Object as SlotsType<ProLayoutSlots>,
  setup(props) {
    const themeVars = useThemeVars()
    const mergedClsPrefix = useNaiveClsPrefix()
    const overridedProps = useOverrideProps(name, props)

    const {
      mergedNav,
      mergedMode,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedIsMobile,
      mergedCollapsed,
      mergedNavClass,
      mergedLogoClass,
      mergedAsideClass,
      mergedHeaderClass,
      mergedTabbarClass,
      mergedFooterClass,
      mergedContentClass,
    } = useMergeConfig(overridedProps)

    const {
      disabled,
    } = useDisabledTransitionWhenModeChange(mergedMode)

    const calcLayoutVarsOptions: CalcLayoutVarsOptions = {
      mergedNav,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCollapsed,
    }

    const mobileLayoutVars = useMobileLayoutVars(calcLayoutVarsOptions)
    const sidebarLayoutVars = useSidebarLayoutVars(calcLayoutVarsOptions)
    const verticalLayoutVars = useVerticalLayoutVars(calcLayoutVarsOptions)
    const twoColumnLayoutVars = useTwoColumnLayoutVars(calcLayoutVarsOptions)
    const horizontalLayoutVars = useHorizontalLayoutVars(calcLayoutVarsOptions)
    const fullContentLayoutVars = useFullContentLayoutVars(calcLayoutVarsOptions)

    const builtinThemeVars = computed(() => {
      return {
        color: themeVars.value.bodyColor,
        textColor: themeVars.value.textColor2,
        layoutColor: themeVars.value.cardColor,
        borderColor: themeVars.value.dividerColor,
        ...(overridedProps.value.builtinThemeOverrides ?? {}),
      }
    })

    const vars = computed(() => {
      const mode = mergedMode.value
      let selfVars: any = {}
      if (mergedIsMobile.value) {
        selfVars = mobileLayoutVars.value
      }
      else if (mode === 'sidebar') {
        selfVars = sidebarLayoutVars.value
      }
      else if (mode === 'vertical') {
        selfVars = verticalLayoutVars.value
      }
      else if (mode === 'two-column') {
        selfVars = twoColumnLayoutVars.value
      }
      else if (mode === 'horizontal') {
        selfVars = horizontalLayoutVars.value
      }
      else if (mode === 'full-content') {
        selfVars = fullContentLayoutVars.value
      }
      else if (mode === 'mixed-sidebar') {
        selfVars = sidebarLayoutVars.value
      }
      else if (mode === 'mixed-two-column') {
        selfVars = twoColumnLayoutVars.value
      }
      else {
        if (__DEV__) {
          warnOnce(
            'pro-layout',
            `mode "${mode}" is not supported, falling back to "vertical" mode.`,
          )
          selfVars = verticalLayoutVars.value
        }
      }
      return {
        // 支持主题切换
        '--n-color': themeVars.value.bodyColor,
        '--n-text-color': themeVars.value.textColor2,
        '--n-bezier': themeVars.value.cubicBezierEaseInOut,
        // 可覆盖的主题变量
        '--pro-layout-color': builtinThemeVars.value.layoutColor,
        '--pro-layout-content-color': builtinThemeVars.value.color,
        '--pro-layout-text-color': builtinThemeVars.value.textColor,
        '--pro-layout-border-color': builtinThemeVars.value.borderColor,
        // 给当前组件使用的变量
        '--pro-layout-z-index': 1000,
        '--pro-layout-nav-height': `${mergedNav.value.height}px`,
        '--pro-layout-tabbar-height': `${mergedTabbar.value.height}px`,
        '--pro-layout-sidebar-width': `${mergedSidebar.value.width}px`,
        '--pro-layout-footer-height': `${mergedFooter.value.height}px`,
        '--pro-layout-sidebar-collapsed-width': `${mergedSidebar.value.collapsedWidth}px`,
        ...selfVars,
      }
    })

    const nScrollbarProps = computed<ScrollbarProps>(() => {
      return merge({
        builtinThemeOverrides: {
          railInsetVerticalRight: '2px 0px 2px auto',
        },
      }, (overridedProps.value.scrollbarProps ?? {}))
    })

    useMountStyle(
      name,
      'pro-layout',
      style,
    )

    /**
     * 没有给 n-menu 设置 collapsed 时，取 props 的 collapsed
     */
    provide('n-layout-sider', {
      collapseModeRef: { value: 'width' },
      collapsedRef: toRef(props, 'collapsed'),
    })
    return {
      vars,
      disabled,
      mergedNav,
      mergedMode,
      mergedLogo,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedIsMobile,
      mergedClsPrefix,
      mergedCollapsed,
      mergedNavClass,
      mergedLogoClass,
      nScrollbarProps,
      mergedAsideClass,
      mergedHeaderClass,
      mergedTabbarClass,
      mergedFooterClass,
      mergedContentClass,
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
            { [`${this.mergedClsPrefix}-pro-layout__logo--hidden`]: !this.mergedLogo.show },
            ...this.mergedLogoClass,
          ]}
        >
          {children}
        </div>
      )
    })

    const navLeftDom = resolveWrappedSlot(this.$slots['nav-left'], (children) => {
      return (
        <div class={`${this.mergedClsPrefix}-pro-layout__nav__left`}>
          {children}
        </div>
      )
    })

    const navCenterDom = resolveWrappedSlot(this.$slots['nav-center'], (children) => {
      return (
        <div class={`${this.mergedClsPrefix}-pro-layout__nav__center`}>
          {children}
        </div>
      )
    })

    const navRightDom = resolveWrappedSlot(this.$slots['nav-right'], (children) => {
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
      return (
        <div class={[
          `${this.mergedClsPrefix}-pro-layout__sidebar-extra`,
          { [`${this.mergedClsPrefix}-pro-layout__sidebar-extra--hidden`]: !this.mergedSidebar.showExtra },
        ]}
        >
          {children}
        </div>
      )
    })

    return (
      <div
        {...this.$attrs}
        class={[
          `${this.mergedClsPrefix}-pro-layout`,
          { [`${this.mergedClsPrefix}-pro-layout--mobile`]: this.mergedIsMobile },
          { [`${this.mergedClsPrefix}-pro-layout--disabled-transition`]: this.disabled },
          { [`${this.mergedClsPrefix}-pro-layout--${this.mergedMode}`]: !this.mergedIsMobile },
        ]}
        // 这些 cssVars 会频繁变更，所以不支持 inline-theme-disabled，否则会生成很多无用的 style 标签
        style={this.vars}
      >
        <aside class={[
          `${this.mergedClsPrefix}-pro-layout__aside`,
          { [`${this.mergedClsPrefix}-pro-layout__aside--collapsed`]: this.mergedCollapsed },
          { [`${this.mergedClsPrefix}-pro-layout__aside--hidden`]: !this.mergedSidebar.show },
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
          {...this.nScrollbarProps}
        >
          <header class={[
            `${this.mergedClsPrefix}-pro-layout__header`,
            { [`${this.mergedClsPrefix}-pro-layout__header--fixed`]: this.mergedNav.fixed },
            ...this.mergedHeaderClass,
          ]}
          >
            <div class={[
              `${this.mergedClsPrefix}-pro-layout__nav`,
              { [`${this.mergedClsPrefix}-pro-layout__nav--hidden`]: !this.mergedNav.show },
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
              { [`${this.mergedClsPrefix}-pro-layout__tabbar--hidden`]: !this.mergedTabbar.show },
              ...this.mergedTabbarClass,
            ]}
            >
              {this.$slots.tabbar?.()}
            </div>
          </header>
          <main class={[
            `${this.mergedClsPrefix}-pro-layout__content`,
            ...this.mergedContentClass,
          ]}
          >
            {this.$slots.default?.()}
          </main>
          <footer class={[
            `${this.mergedClsPrefix}-pro-layout__footer`,
            { [`${this.mergedClsPrefix}-pro-layout__footer--fixed`]: this.mergedFooter.fixed },
            { [`${this.mergedClsPrefix}-pro-layout__footer--hidden`]: !this.mergedFooter.show },
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
