import type { MenuOption } from 'naive-ui'
import type { ExpandedKey, MenuKey } from './types'
import type { LayoutMenuReturn, SharedLayoutOptions } from './useLayoutMenu'
import { computed } from 'vue'
import { splitMenuData } from './utils/splitMenuData'

export function useTwoColumnLayoutMenu({
  menus,
  collapsed,
  activeKey,
  expandedKeys,
  childrenField,
  menuKeyToMetaMap,
  autoActiveDetachedSubMenu,
  getMenuKeyFullPath,
}: SharedLayoutOptions) {
  const verticalMenuActiveKey = computed(() => {
    return getMenuKeyFullPath(activeKey.value)[0] ?? null
  })

  const verticalMenuData = computed(() => {
    return splitMenuData(menus.value, 1, { childrenField })[0] ?? []
  })

  const verticalExtraMenuData = computed(() => {
    const info = menuKeyToMetaMap.value.get(activeKey.value!)
    if (!info) {
      return []
    }
    return (info.item[childrenField]) as MenuOption[] ?? []
  })

  const layout = computed<LayoutMenuReturn>(() => {
    return {
      horizontalMenuProps: {},
      verticalMenuProps: {
        mode: 'vertical',
        options: verticalMenuData.value,
        value: verticalMenuActiveKey.value,
        collapsed: true,
        onUpdateValue: activeRelatedMenuKey,
      },
      verticalExtraMenuProps: {
        mode: 'vertical',
        value: activeKey.value,
        collapsed: collapsed.value,
        expandedKeys: expandedKeys.value,
        options: verticalExtraMenuData.value,
        onUpdateExpandedKeys: expand,
        onUpdateValue: (key) => {
          activeKey.value = key
        },
      },
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
    const index = verticalMenuData.value.findIndex(menu => menu.key === key)
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
