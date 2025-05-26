import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { LayoutFooter, LayoutHeader, LayoutSidebar, LayoutTabbar } from './types'

export const sharedLayoutProps = {
  /**
   * 侧边栏配置
   */
  sidebar: {
    type: [Boolean, Object] as PropType<false | LayoutSidebar>,
    default: undefined,
  },
  /**
   * 顶栏配置
   */
  header: {
    type: [Boolean, Object] as PropType<false | LayoutHeader>,
    default: undefined,
  },
  /**
   * 底部配置
   */
  footer: {
    type: [Boolean, Object] as PropType<false | LayoutFooter>,
    default: undefined,
  },
  /**
   * 标签栏配置
   */
  tabbar: {
    type: [Boolean, Object] as PropType<false | LayoutTabbar>,
    default: undefined,
  },
} as const

export type SharedLayoutProps = ExtractPublicPropTypes<typeof sharedLayoutProps>
