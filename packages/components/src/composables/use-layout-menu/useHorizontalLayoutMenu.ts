import type { ExpandedKey, MenuKey } from './types'
import type { LayoutMenuReturn, SharedLayoutOptions } from './useLayoutMenu'
import { computed } from 'vue'

export function useHorizontalLayoutMenu({
  menus,
  collapsed,
  activeKey,
  expandedKeys,
}: SharedLayoutOptions) {
  const layout = computed<LayoutMenuReturn>(() => {
    return {
      verticalMenuProps: {},
      verticalExtraMenuProps: {},
      horizontalMenuProps: {
        mode: 'horizontal',
        responsive: true,
        options: menus.value,
        value: activeKey.value,
        expandedKeys: expandedKeys.value,
        onUpdateValue: active,
        onUpdateExpandedKeys: expand,
      },
    }
  })

  function active(key: MenuKey) {
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
