import type { MenuOption } from 'naive-ui'
import type { LayoutMenuReturn, SharedLayoutOptions } from './use-layout-menu'
import { computed } from 'vue'
import { splitMenuData } from './utils/split-menu-data'

export function useMixedSidebarLayoutMenu({
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
        collapsed: false,
        options: horizontalMenuData.value,
        value: horizontalMenuActiveKey.value,
        onUpdateValue: (key) => {
          activeKey.value = key
        },
      },
      verticalMenuProps: {
        mode: 'vertical',
        value: activeKey.value,
        options: verticalMenuData.value,
        expandedKeys: expandedKeys.value,
        onUpdateValue: (key) => {
          activeKey.value = key
        },
        onUpdateExpandedKeys: (keys) => {
          expandedKeys.value = keys
        },
      },
      verticalExtraMenuProps: {},
    }
  })

  return {
    layout,
  }
}
