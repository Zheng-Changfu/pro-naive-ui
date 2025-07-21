import type { MenuOption } from 'naive-ui'
import type { LayoutMenuReturn, SharedLayoutOptions } from './use-layout-menu'
import { computed } from 'vue'
import { splitMenuData } from './utils/split-menu-data'

export function useMixedTwoColumnLayoutMenu({
  menus,
  activeKey,
  expandedKeys,
  childrenField,
  menuKeyToMetaMap,
  getMenuKeyFullPath,
}: SharedLayoutOptions) {
  const horizontalMenuActiveKey = computed(() => {
    return getMenuKeyFullPath(activeKey.value)[0] ?? null
  })

  const verticalMenuActiveKey = computed(() => {
    const topLevelKey = horizontalMenuActiveKey.value
    const secondLevelKey = getMenuKeyFullPath(activeKey.value)[1] ?? null
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
        collapsed: false,
        options: horizontalMenuData.value,
        value: horizontalMenuActiveKey.value,
        onUpdateValue: (key) => {
          activeKey.value = key
        },
      },
      verticalMenuProps: {
        mode: 'vertical',
        options: verticalMenuData.value,
        value: verticalMenuActiveKey.value,
        collapsed: true,
        onUpdateValue: (key) => {
          activeKey.value = key
        },
      },
      verticalExtraMenuProps: {
        mode: 'vertical',
        value: activeKey.value,
        expandedKeys: expandedKeys.value,
        options: verticalExtraMenuData.value,
        onUpdateValue: (key) => {
          activeKey.value = key
        },
        onUpdateExpandedKeys: (keys) => {
          expandedKeys.value = keys
        },
      },
    }
  })

  return {
    layout,
  }
}
