export interface LayoutSidebar {
  /**
   * 侧边栏宽度
   */
  width: number
  /**
   * 混合侧边栏宽度,仅在 two-column、mixed-two-column 布局下生效
   * @default 80
   */
  mixedWidth: number
}

export interface LayoutHeader {
  /**
   * 头部高度
   */
  height: number
  /**
   * 头部是否固定
   * @default true
   */
  fixed: boolean
}

export interface LayoutFooter {
  /**
   * 底部高度
   */
  height: number
  /**
   * 底部是否固定
   * @default false
   */
  fixed: boolean
}

export interface LayoutTabbar {
  /**
   * 标签栏高度
   */
  height: number
}
