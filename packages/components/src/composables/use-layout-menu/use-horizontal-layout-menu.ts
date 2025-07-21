import type { LayoutMenuReturn, SharedLayoutOptions } from './use-layout-menu'
import { computed } from 'vue'

export function useHorizontalLayoutMenu({
  menus,
  activeKey,
  expandedKeys,
}: SharedLayoutOptions) {
  const layout = computed<LayoutMenuReturn>(() => {
    return {
      verticalMenuProps: {},
      verticalExtraMenuProps: {},
      horizontalMenuProps: {
        mode: 'horizontal',
        collapsed: false,
        responsive: true,
        options: menus.value,
        value: activeKey.value,
        expandedKeys: expandedKeys.value,
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
