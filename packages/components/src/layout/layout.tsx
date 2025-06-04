import { NScrollbar } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { resolveWrappedSlot } from '../_utils/resolveSlot'
import { warnOnce } from '../_utils/warn'
import { useOverrideProps } from '../composables'
import { useFullContentCls } from './composables/useFullContentCls'
import { useHorizontalLayoutCls } from './composables/useHorizontalLayoutCls'
import { useMergeConfig } from './composables/useMergeConfig'
import { useMixedSidebarCls } from './composables/useMixedSidebarCls'
import { useMixedTwoColumnCls } from './composables/useMixedTwoColumnCls'
import { useSidebarLayoutCls } from './composables/useSidebarLayoutCls'
import { useTwoColumnLayoutCls } from './composables/useTwoColumnLayoutCls'
import { useVerticalLayoutCls } from './composables/useVerticalLayoutCls'
import { proLayoutProps } from './props'
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
      mergedCollasped,
    } = useMergeConfig(overridedProps)

    const sidebarLayoutCls = useSidebarLayoutCls({
      mergedMode,
      mergedHeader,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
      mergedCollasped,
    })

    const verticalLayoutCls = useVerticalLayoutCls({
      mergedMode,
      mergedHeader,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
      mergedCollasped,
    })

    const twoColumnLayoutCls = useTwoColumnLayoutCls({
      mergedMode,
      mergedHeader,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
      mergedCollasped,
    })

    const horizontalLayoutCls = useHorizontalLayoutCls({
      mergedMode,
      mergedHeader,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
      mergedCollasped,
    })

    const fullContentCls = useFullContentCls({
      mergedMode,
      mergedHeader,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
      mergedCollasped,
    })

    const mixedSidebarCls = useMixedSidebarCls({
      mergedMode,
      mergedHeader,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
      mergedCollasped,
    })

    const mixedTwoColumnCls = useMixedTwoColumnCls({
      mergedMode,
      mergedHeader,
      mergedTabbar,
      mergedFooter,
      mergedSidebar,
      mergedCssVars,
      mergedCollasped,
    })

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
        case 'sidebar':
          return sidebarLayoutCls.value
        case 'vertical':
          return verticalLayoutCls.value
        case 'two-column':
          return twoColumnLayoutCls.value
        case 'horizontal':
          return horizontalLayoutCls.value
        case 'full-content':
          return fullContentCls.value
        case 'mixed-sidebar':
          return mixedSidebarCls.value
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
      mergedMode,
      mergedClsPrefix,
    }
  },
  render() {
    const logoDom = resolveWrappedSlot(this.$slots.logo, (children) => {
      if (!children) {
        return null
      }
      return <div>{children}</div>
    })

    const headerLeftDom = resolveWrappedSlot(this.$slots['header-left'], (children) => {
      if (!children) {
        return null
      }
      return <div>{children}</div>
    })

    const headerCenterDom = resolveWrappedSlot(this.$slots['header-center'], (children) => {
      if (!children) {
        return null
      }
      return <div>{children}</div>
    })

    const headerRightDom = resolveWrappedSlot(this.$slots['header-right'], (children) => {
      if (!children) {
        return null
      }
      return <div>{children}</div>
    })

    const sidebarDom = resolveWrappedSlot(this.$slots.sidebar, (children) => {
      if (!children) {
        return null
      }
      return <div>{children}</div>
    })

    const sidebarExtraDom = resolveWrappedSlot(this.$slots['sidebar-extra'], (children) => {
      if (!children) {
        return null
      }
      return <div>{children}</div>
    })

    const tabbarDom = resolveWrappedSlot(this.$slots.tabbar, (children) => {
      if (!children) {
        return null
      }
      return <div>{children}</div>
    })

    const footerDom = resolveWrappedSlot(this.$slots.footer, (children) => {
      if (!children) {
        return null
      }
      return <div>{children}</div>
    })

    const defaultDom = resolveWrappedSlot(this.$slots.default, (children) => {
      if (!children) {
        return null
      }
      return <div>{children}</div>
    })

    return (
      <div class={[
        `${this.mergedClsPrefix}-pro-layout`,
        `${this.mergedClsPrefix}-pro-layout--${this.mergedMode}`,
        ...this.cls.layout,
      ]}
      >
        <NScrollbar
          class={[
            `${this.mergedClsPrefix}-pro-layout__scrollbar--${this.mergedMode}`,
            ...this.cls.scrollbar,
          ]}
          contentClass={[
            `${this.mergedClsPrefix}-pro-layout__scrollbar-content--${this.mergedMode}`,
            ...this.cls.scrollbarContent,
          ]}
        >
          <aside class={[
            `${this.mergedClsPrefix}-pro-layout__sidebar--${this.mergedMode}`,
            ...this.cls.sidebar,
          ]}
          >
            {logoDom}
            {sidebarDom}
            {sidebarExtraDom}
          </aside>
          <section class={[
            `${this.mergedClsPrefix}-pro-layout__section--${this.mergedMode}`,
            ...this.cls.section,
          ]}
          >
            <header class={[
              `${this.mergedClsPrefix}-pro-layout__header--${this.mergedMode}`,
              ...this.cls.header,
            ]}
            >
              {headerLeftDom}
              {headerCenterDom}
              {headerRightDom}
            </header>
            <div class={[
              `${this.mergedClsPrefix}-pro-layout__tabbar--${this.mergedMode}`,
              ...this.cls.tabbar,
            ]}
            >
              {tabbarDom}
            </div>
            <main class={[
              `${this.mergedClsPrefix}-pro-layout__main--${this.mergedMode}`,
              ...this.cls.main,
            ]}
            >
              {defaultDom}
            </main>
            <footer class={[
              `${this.mergedClsPrefix}-pro-layout__footer--${this.mergedMode}`,
              ...this.cls.footer,
            ]}
            >
              {footerDom}
            </footer>
          </section>
        </NScrollbar>
      </div>
    )
  },
})
