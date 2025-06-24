export interface ProLayoutSlots {
  /**
   * logo 区域
   */
  'logo': any
  /**
   * 头部左侧
   * @deprecated 请使用 'nav-left' 替代
   */
  'header-left': any
  /**
   * 头部中间
   * @deprecated 请使用 'nav-center' 替代
   */
  'header-center': any
  /**
   * 头部右侧
   * @deprecated 请使用 'nav-right' 替代
   */
  'header-right': any
  /**
   * 顶栏左侧
   */
  'nav-left': any
  /**
   * 顶栏中间
   */
  'nav-center': any
  /**
   * 顶栏右侧
   */
  'nav-right': any
  /**
   * 侧边栏,在 horizontal、full-content 布局中不生效
   */
  'sidebar': any
  /**
   * 侧边栏额外区域,只在 two-column、mixed-two-column 布局中生效
   */
  'sidebar-extra': any
  /**
   * tabbar 区域
   */
  'tabbar': any
  /**
   * 底部
   */
  'footer': any
  /**
   * 内容区域
   */
  'default': any
}
