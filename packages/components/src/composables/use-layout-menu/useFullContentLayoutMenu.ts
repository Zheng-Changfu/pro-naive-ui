import type { ExpandedKey, MenuKey } from './types'
import type { LayoutMenuReturn, SharedLayoutOptions } from './useLayoutMenu'
import { computed } from 'vue'

export function useFullContentLayoutMenu({
  activeKey,
  collapsed,
  expandedKeys,
}: SharedLayoutOptions) {
  const layout = computed<LayoutMenuReturn>(() => {
    return {
      horizontalMenuProps: {},
      verticalMenuProps: {},
      verticalExtraMenuProps: {},
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
