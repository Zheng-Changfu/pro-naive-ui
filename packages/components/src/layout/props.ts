import type { ScrollbarProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeArray } from '../_utils/call'
import type { BuiltinThemeOverrides, ProLayoutFooter, ProLayoutMode, ProLayoutNav, ProLayoutSidebar, ProLayoutTabbar } from './types'

export const proLayoutProps = {
  /**
   * 是否折叠
   */
  'collapsed': {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  /**
   * 折叠状态变化时调用的回调
   */
  'onUpdate:collapsed': [Function, Array] as PropType<MaybeArray<(value: boolean) => void>>,
  /**
   * 折叠状态变化时调用的回调
   */
  'onUpdateCollapsed': [Function, Array] as PropType<MaybeArray<(value: boolean) => void>>,
  /**
   * 是否显示 logo
   */
  'showLogo': {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  /**
   * 是否显示侧边栏
   */
  'showSidebar': {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  /**
   * 是否显示侧边栏额外区域，只在 two-column、mixed-two-column 布局下生效
   */
  'showSidebarExtra': {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  /**
   * 侧边栏宽度
   */
  'sidebarWidth': Number as PropType<ProLayoutSidebar['width']>,
  /**
   * 侧边栏折叠后的宽度
   */
  'sidebarCollapsedWidth': Number as PropType<ProLayoutSidebar['collapsedWidth']>,
  /**
   * 是否显示顶栏
   */
  'showNav': {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  /**
   * 顶栏高度
   */
  'navHeight': Number as PropType<ProLayoutNav['height']>,
  /**
   * 顶栏是否固定
   */
  'navFixed': {
    type: Boolean as PropType<ProLayoutNav['fixed']>,
    default: undefined,
  },
  /**
   * 是否显示底部
   */
  'showFooter': {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  /**
   * 底部高度
   */
  'footerHeight': Number as PropType<ProLayoutFooter['height']>,
  /**
   * 底部是否固定
   */
  'footerFixed': {
    type: Boolean as PropType<ProLayoutFooter['fixed']>,
    default: undefined,
  },
  /**
   * 是否显示标签栏
   */
  'showTabbar': {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  /**
   * 标签栏高度
   */
  'tabbarHeight': Number as PropType<ProLayoutTabbar['height']>,
  /**
   * 布局模式
   * @default 'vertical'
   */
  'mode': String as PropType<ProLayoutMode>,
  /**
   * 是否启用移动端布局
   */
  'isMobile': Boolean as PropType<boolean>,
  /**
   * logo 的 class
   */
  'logoClass': [Array, String] as PropType<string | any[]>,
  /**
   * 整个侧边的 class
   */
  'asideClass': [Array, String] as PropType<string | any[]>,
  /**
   * 头部 class
   */
  'headerClass': [Array, String] as PropType<string | any[]>,
  /**
   * 顶栏 class
   */
  'navClass': [Array, String] as PropType<string | any[]>,
  /**
   * 标签栏 class
   */
  'tabbarClass': [Array, String] as PropType<string | any[]>,
  /**
   * 主内容区 class
   */
  'contentClass': [Array, String] as PropType<string | any[]>,
  /**
   * 底部 class
   */
  'footerClass': [Array, String] as PropType<string | any[]>,
  /**
   * 主题覆盖
   */
  'builtinThemeOverrides': Object as PropType<BuiltinThemeOverrides>,
  /**
   * 透传给 n-scrollbar 的属性
   */
  'scrollbarProps': Object as PropType<ScrollbarProps>,
} as const

export type ProLayoutProps = ExtractPublicPropTypes<typeof proLayoutProps>
