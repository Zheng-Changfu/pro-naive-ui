import type { MenuOption } from 'naive-ui'
import type { ExpandedKey, MenuKey } from './types'
import type { LayoutMenuReturn, SharedLayoutOptions } from './useLayoutMenu'
import { computed } from 'vue'
import { splitMenuData } from './utils/splitMenuData'

export function useMixedTwoColumnLayoutMenu({
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

  const verticalMenuActiveKey = computed(() => {
    const topLevelKey = horizontalMenuActiveKey.value
    const secondLevelKey = getMenuKeyFullPath(activeKey.value)[1] ?? null
    if (autoActiveDetachedSubMenu.value) {
      return secondLevelKey
    }
    if (
      activeKey.value !== topLevelKey
      && activeKey.value !== secondLevelKey
    ) {
      return secondLevelKey
    }
    return activeKey.value
  })

  const horizontalMenuData = computed(() => {
    return splitMenuData(menus.value, 1, { childrenField })[0] ?? []
  })

  const verticalMenuData = computed(() => {
    const info = menuKeyToMetaMap.value.get(horizontalMenuActiveKey.value!)
    if (!info) {
      return []
    }
    const data = (info.item[childrenField]) as MenuOption[] ?? []
    return splitMenuData(data, 1, { childrenField })[0]
  })

  const verticalExtraMenuData = computed(() => {
    const index = verticalMenuData.value.findIndex(menu => menu.key === verticalMenuActiveKey.value)
    if (index === -1) {
      return []
    }
    const info = menuKeyToMetaMap.value.get(verticalMenuActiveKey.value!)
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
    const index = [
      ...verticalMenuData.value,
      ...horizontalMenuData.value,
    ].findIndex(menu => menu.key === key)
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
