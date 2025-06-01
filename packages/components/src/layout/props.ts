import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeArray } from '../_utils/call'
import type { LayoutFooter, LayoutHeader, LayoutMode, LayoutSidebar, LayoutTabbar } from './types'

export const sharedLayoutProps = {
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
   * 是否显示侧边栏
   */
  'showSidebar': {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  /**
   * 侧边栏宽度
   */
  'sidebarWidth': Number as PropType<LayoutSidebar['width']>,
  /**
   * 侧边栏混合宽度
   */
  'sidebarMixedWidth': Number as PropType<LayoutSidebar['mixedWidth']>,
  /**
   * 侧边栏折叠后的宽度
   */
  'sidebarCollapsedWidth': Number as PropType<LayoutSidebar['collapsedWidth']>,
  /**
   * 是否显示顶栏
   */
  'showHeader': {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  /**
   * 顶栏高度
   */
  'headerHeight': Number as PropType<LayoutHeader['height']>,
  /**
   * 顶栏是否固定
   */
  'headerFixed': {
    type: Boolean as PropType<LayoutHeader['fixed']>,
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
  'footerHeight': Number as PropType<LayoutFooter['height']>,
  /**
   * 底部是否固定
   */
  'footerFixed': {
    type: Boolean as PropType<LayoutFooter['fixed']>,
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
  'tabbarHeight': Number as PropType<LayoutTabbar['height']>,
} as const

export const proLayoutProps = {
  ...sharedLayoutProps,
  /**
   * 布局模式
   * @default 'vertical'
   */
  mode: String as PropType<LayoutMode>,
} as const

export type ProLayoutProps = ExtractPublicPropTypes<typeof proLayoutProps>
export type SharedLayoutProps = ExtractPublicPropTypes<typeof sharedLayoutProps>
