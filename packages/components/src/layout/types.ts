import type { ComputedRef } from 'vue'

export interface ProLayoutLogo {
  /**
   * 是否显示 logo
   * @default true
   */
  show: boolean
}

export interface ProLayoutSidebar {
  /**
   * 是否显示侧边栏
   */
  show: boolean
  /**
   * 是否显示额外区域
   */
  showExtra: boolean
  /**
   * 侧边栏宽度
   * @default 224
   */
  width: number
  /**
   * 折叠后的侧边栏宽度
   * @default 58
   */
  collapsedWidth: number
}

export interface ProLayoutNav {
  /**
   * 是否显示顶栏
   */
  show: boolean
  /**
   * 头部高度
   * @default 50
   */
  height: number
  /**
   * 头部是否固定
   * @default true
   */
  fixed: boolean
}

export interface ProLayoutFooter {
  /**
   * 是否显示底部
   */
  show: boolean
  /**
   * 底部高度
   * @default 32
   */
  height: number
  /**
   * 底部是否固定
   * @default false
   */
  fixed: boolean
}

export interface ProLayoutTabbar {
  /**
   * 是否显示标签栏
   */
  show: boolean
  /**
   * 标签栏高度
   * @default 38
   */
  height: number
}

/**
 * 布局模式
 * vertical: 竖向布局
 * horizontal: 横向布局
 * sidebar: 侧边栏布局
 * mixed-sidebar: 混合侧边栏布局
 * full-content: 全内容布局
 * two-column: 双栏布局
 * mixed-two-column: 混合双栏布局
 */
export type ProLayoutMode
  = | 'vertical'
    | 'horizontal'
    | 'sidebar'
    | 'mixed-sidebar'
    | 'full-content'
    | 'two-column'
    | 'mixed-two-column'
    | ({} & string)

export interface CalcLayoutVarsOptions {
  mergedNav: ComputedRef<ProLayoutNav>
  mergedCollapsed: ComputedRef<boolean>
  mergedLogo: ComputedRef<ProLayoutLogo>
  mergedFooter: ComputedRef<ProLayoutFooter>
  mergedTabbar: ComputedRef<ProLayoutTabbar>
  mergedSidebar: ComputedRef<ProLayoutSidebar>
}

export interface BuiltinThemeOverrides {
  color?: string
  textColor?: string
  borderColor?: string
  layoutColor?: string
}
