import type { MenuOption } from 'naive-ui'
import type { LayoutMenuReturn, SharedLayoutOptions } from './use-layout-menu'
import { computed } from 'vue'
import { splitMenuData } from './utils/split-menu-data'

export function useTwoColumnLayoutMenu({
  menus,
  activeKey,
  expandedKeys,
  childrenField,
  menuKeyToMetaMap,
  getMenuKeyFullPath,
}: SharedLayoutOptions) {
  const verticalMenuActiveKey = computed(() => {
    return getMenuKeyFullPath(activeKey.value)[0] ?? null
  })

  const verticalMenuData = computed(() => {
    return splitMenuData(menus.value, 1, { childrenField })[0] ?? []
  })

  const verticalExtraMenuData = computed(() => {
    const info = menuKeyToMetaMap.value.get(verticalMenuActiveKey.value!)
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
