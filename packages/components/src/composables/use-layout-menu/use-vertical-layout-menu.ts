import type { LayoutMenuReturn, SharedLayoutOptions } from './use-layout-menu'
import { computed } from 'vue'

export function useVerticalLayoutMenu({
  menus,
  activeKey,
  expandedKeys,
}: SharedLayoutOptions) {
  const layout = computed<LayoutMenuReturn>(() => {
    return {
      horizontalMenuProps: {},
      verticalExtraMenuProps: {},
      verticalMenuProps: {
        mode: 'vertical',
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
