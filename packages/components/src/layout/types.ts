export interface LayoutSidebar {
  /**
   * 侧边栏宽度
   */
  width: number
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
