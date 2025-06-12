import type { MenuOption } from 'naive-ui'
import type { ExpandedKey, MenuKey } from './types'
import type { LayoutMenuReturn, SharedLayoutOptions } from './use-layout-menu'
import { computed } from 'vue'
import { splitMenuData } from './utils/split-menu-data'

export function useMixedSidebarLayoutMenu({
  menus,
  collapsed,
  activeKey,
  expandedKeys,
  childrenField,
  menuKeyToMetaMap,
  autoActiveDetachedSubMenu,
  getMenuKeyFullPath,
}: SharedLayoutOptions) {
  const horizontalMenuActiveKey = computed(() => {
    return getMenuKeyFullPath(activeKey.value)[0] ?? null
  })

  const horizontalMenuData = computed(() => {
    return splitMenuData(menus.value, 1, { childrenField })[0] ?? []
  })

  const verticalMenuData = computed(() => {
    const info = menuKeyToMetaMap.value.get(horizontalMenuActiveKey.value!)
    if (!info) {
      return []
    }
    return (info.item[childrenField]) as MenuOption[] ?? []
  })

  const layout = computed<LayoutMenuReturn>(() => {
    return {
      horizontalMenuProps: {
        mode: 'horizontal',
        responsive: true,
        options: horizontalMenuData.value,
        value: horizontalMenuActiveKey.value,
        onUpdateValue: activeRelatedMenuKey,
      },
      verticalMenuProps: {
        mode: 'vertical',
        value: activeKey.value,
        collapsed: collapsed.value,
        options: verticalMenuData.value,
        expandedKeys: expandedKeys.value,
        onUpdateExpandedKeys: expand,
        onUpdateValue: (key) => {
          activeKey.value = key
        },
      },
      verticalExtraMenuProps: {},
    }
  })

  function activeRelatedMenuKey(key: MenuKey) {
    if (autoActiveDetachedSubMenu.value) {
      const fullPath = getMenuKeyFullPath(key)
      activeKey.value = fullPath[fullPath.length - 1]
      return
    }
    activeKey.value = key
  }

  function active(key: MenuKey) {
    const index = horizontalMenuData.value.findIndex(menu => menu.key === key)
    if (~index) {
      activeRelatedMenuKey(key)
      return
    }
    activeKey.value = key
  }

  function expand(keys: ExpandedKey[]) {
    expandedKeys.value = keys
  }

  function collapse(value: boolean) {
    collapsed.value = value
  }

  return {
    layout,
    active,
    expand,
    collapse,
  }
}
