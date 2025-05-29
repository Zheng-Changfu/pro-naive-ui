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
export type LayoutMode =
  | 'vertical'
  | 'horizontal'
  | 'sidebar'
  | 'mixed-sidebar'
  | 'full-content'
  | 'two-column'
  | 'mixed-two-column'
  | ({} & string)
