import type { MaybeRefOrGetter } from '@vueuse/core'
import type { MenuOption, MenuProps } from 'naive-ui'
import type { ComputedRef, Ref } from 'vue'
import type { ProLayoutMode } from '../../layout/types'
import type { ExpandedKey, MenuKey } from './types'
import { toValue } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useFullContentLayoutMenu } from './use-full-content-layout-menu'
import { useHorizontalLayoutMenu } from './use-horizontal-layout-menu'
import { useMenus } from './use-menus'
import { useMixedSidebarLayoutMenu } from './use-mixed-sidebar-layout-menu'
import { useMixedTwoColumnLayoutMenu } from './use-mixed-two-column-layout-menu'
import { useTwoColumnLayoutMenu } from './use-two-column-layout-menu'
import { useVerticalLayoutMenu } from './use-vertical-layout-menu'

export interface LayoutMenuReturn {
  /**
   * 水平菜单数据,一般放在 header 区域
   */
  horizontalMenuProps: MenuProps
  /**
   * 垂直菜单数据,一般放在 sidebar 区域
   */
  verticalMenuProps: MenuProps
  /**
   * 垂直菜单数据,一般放在 sidebar 额外区域
   */
  verticalExtraMenuProps: MenuProps
}

export interface SharedLayoutOptions {
  /**
   * 菜单是否折叠
   */
  collapsed: Ref<boolean>
  /**
   * 展开菜单的 key 列表
   */
  expandedKeys: Ref<ExpandedKey[]>
  /**
   * 当前激活的菜单 key
   */
  activeKey: Ref<MenuKey>
  /**
   * 菜单数据
   */
  menus: ComputedRef<MenuOption[]>
  /**
   * 获取菜单完整路径
   */
  getMenuKeyFullPath: (key: MenuKey) => Exclude<MenuKey, null>[]
  /**
   * 菜单 key 到菜单项信息的映射
   */
  menuKeyToMetaMap: ComputedRef<Map<Exclude<MenuKey, null>, {
    item: MenuOption
    childrenKeys: Exclude<MenuKey, null>[]
    parentKey: MenuKey
  }>>
  /**
   * 菜单数据中子菜单的字段名
   * @default 'children'
   */
  childrenField: string
  autoActiveDetachedSubMenu: ComputedRef<boolean>
}

interface UseLayoutMenuOptions {
  /**
   * 菜单数据
   */
  menus: MaybeRefOrGetter<MenuOption[]>
  /**
   * 布局模式
   */
  mode: MaybeRefOrGetter<ProLayoutMode>
  /**
   * 是否自动激活被分离的子菜单,只会在 mixed-sidebar、two-column、mixed-two-column 模式下生效
   * 比如在 mixed-sidebar 模式下，如果选中了顶部的菜单，则会自动激活侧边的子菜单
   * @default true
   */
  autoActiveDetachedSubMenu?: MaybeRefOrGetter<boolean>
  /**
   * 菜单数据中子菜单的字段名
   * @default 'children'
   */
  childrenField?: string
}

/**
 * 根据布局模式和菜单数据，计算出适用于不同布局模式下的菜单 props
 */
export function useLayoutMenu(options: UseLayoutMenuOptions) {
  const collapsed = ref(false)
  const activeKey = ref<MenuKey>(null)
  const expandedKeys = ref<ExpandedKey[]>([])
  const childrenField = options.childrenField ?? 'children'

  const mode = computed(() => {
    return toValue(options.mode)
  })

  const autoActiveDetachedSubMenu = computed(() => {
    return toValue(options.autoActiveDetachedSubMenu ?? true)
  })

  const {
    menus,
    menuKeyToMetaMap,
    getMenuKeyFullPath,
  } = useMenus(options.menus, { childrenField })

  const verticalLayout = useVerticalLayoutMenu({
    menus,
    collapsed,
    activeKey,
    expandedKeys,
    childrenField,
    menuKeyToMetaMap,
    autoActiveDetachedSubMenu,
    getMenuKeyFullPath,
  })

  const horizontalLayout = useHorizontalLayoutMenu({
    menus,
    collapsed,
    activeKey,
    expandedKeys,
    childrenField,
    menuKeyToMetaMap,
    autoActiveDetachedSubMenu,
    getMenuKeyFullPath,
  })

  const mixedSidebarLayout = useMixedSidebarLayoutMenu({
    menus,
    collapsed,
    activeKey,
    expandedKeys,
    childrenField,
    menuKeyToMetaMap,
    autoActiveDetachedSubMenu,
    getMenuKeyFullPath,
  })

  const twoColumnLayout = useTwoColumnLayoutMenu({
    menus,
    collapsed,
    activeKey,
    expandedKeys,
    childrenField,
    menuKeyToMetaMap,
    autoActiveDetachedSubMenu,
    getMenuKeyFullPath,
  })

  const mixedTwoColumnLayout = useMixedTwoColumnLayoutMenu({
    menus,
    collapsed,
    activeKey,
    expandedKeys,
    childrenField,
    menuKeyToMetaMap,
    autoActiveDetachedSubMenu,
    getMenuKeyFullPath,
  })

  const fullContentLayout = useFullContentLayoutMenu({
    menus,
    collapsed,
    activeKey,
    expandedKeys,
    childrenField,
    menuKeyToMetaMap,
    autoActiveDetachedSubMenu,
    getMenuKeyFullPath,
  })

  const layout = computed(() => {
    switch (mode.value) {
      case 'sidebar':
      case 'vertical':
        return verticalLayout
      case 'horizontal':
        return horizontalLayout
      case 'mixed-sidebar':
        return mixedSidebarLayout
      case 'full-content':
        return fullContentLayout
      case 'two-column':
        return twoColumnLayout
      case 'mixed-two-column':
        return mixedTwoColumnLayout
      default:
        return fullContentLayout
    }
  })

  return {
    isMixedLayout: computed(() => {
      return [
        'two-column',
        'mixed-sidebar',
        'mixed-two-column',
      ].includes(mode.value)
    }),
    layout: computed(() => {
      const privateLayout = layout.value
      return privateLayout.layout.value
    }),
    activeKey: computed({
      get: () => activeKey.value,
      set: (key) => {
        layout.value.active(key)
      },
    }),
    expandedKeys: computed({
      get: () => expandedKeys.value,
      set: (keys) => {
        layout.value.expand(keys)
      },
    }),
    collapsed: computed({
      get: () => collapsed.value,
      set: (value) => {
        layout.value.collapse(value)
      },
    }),
    verticalLayout: computed(() => {
      return verticalLayout.layout.value
    }),
    horizontalLayout: computed(() => {
      return horizontalLayout.layout.value
    }),
    mixedSidebarLayout: computed(() => {
      return mixedSidebarLayout.layout.value
    }),
    fullContentLayout: computed(() => {
      return fullContentLayout.layout.value
    }),
    twoColumnLayout: computed(() => {
      return twoColumnLayout.layout.value
    }),
    mixedTwoColumnLayout: computed(() => {
      return mixedTwoColumnLayout.layout.value
    }),
  }
}
