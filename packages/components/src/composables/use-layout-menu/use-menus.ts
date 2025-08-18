import type { MaybeRefOrGetter } from '@vueuse/core'
import type { MenuOption } from 'naive-ui'
import type { MenuKey } from './types'
import { toValue } from '@vueuse/core'
import { isNil } from 'lodash-es'
import { eachTree } from 'pro-composables'
import { computed } from 'vue'

interface UseMenuOptions {
  /**
   * 子菜单的字段名
   */
  childrenField: string
}
export function useMenus(menus: MaybeRefOrGetter<MenuOption[]>, options: UseMenuOptions) {
  const resolvedMenus = computed(() => {
    return toValue(menus)
  })

  const menuKeyToMetaMap = computed(() => {
    const childrenField = options.childrenField ?? 'children'
    const map = new Map<NonNullable<MenuKey>, {
      item: MenuOption
      parentKey: MenuKey
      childrenKeys: NonNullable<MenuKey>[]
    }>()
    eachTree(resolvedMenus.value, (item, _, { parent }) => {
      const menuKey = item.key
      const parentMenuKey = parent?.key as any
      if (!isNil(menuKey)) {
        map.get(parentMenuKey)?.childrenKeys.push(menuKey)
        map.set(menuKey, {
          item,
          childrenKeys: [],
          parentKey: parentMenuKey,
        })
      }
    }, childrenField)
    return map
  })

  const fullKeys = computed(() => {
    return Array.from(menuKeyToMetaMap.value.keys())
  })

  /**
   * 获取任意一个 key 的祖先 key 列表
   */
  function getAncestorKeys(key: MenuKey) {
    const keys: NonNullable<MenuKey>[] = []
    let currentKey = menuKeyToMetaMap.value.get(key as any)?.parentKey
    while (!isNil(currentKey)) {
      keys.unshift(currentKey)
      const info = menuKeyToMetaMap.value.get(currentKey)
      if (!info) {
        break
      }
      currentKey = info.parentKey
    }
    return keys
  }

  /**
   * 获取任意一个 key 的子孙 key 列表
   */
  function getDescendantKeys(key: MenuKey) {
    const keys: NonNullable<MenuKey>[] = []
    let currentKey = menuKeyToMetaMap.value.get(key as any)?.childrenKeys?.[0]
    while (!isNil(currentKey)) {
      keys.push(currentKey)
      const info = menuKeyToMetaMap.value.get(currentKey)
      if (!info) {
        break
      }
      currentKey = info.childrenKeys?.[0]
    }
    return keys
  }

  /**
   * 从任意一个 key 出发,获取该 key 的菜单完整路径
   * 如果有多层级的孩子,只取每一个层级孩子的第一个,一直取到叶子节点
   */
  function getMenuKeyFullPath(key: MenuKey) {
    const includeSelf = fullKeys.value.includes(key as any)
    return [
      ...getAncestorKeys(key),
      includeSelf ? key : undefined,
      ...getDescendantKeys(key),
    ].filter(k => !isNil(k)) as NonNullable<MenuKey>[]
  }

  return {
    fullKeys,
    getAncestorKeys,
    menuKeyToMetaMap,
    getDescendantKeys,
    getMenuKeyFullPath,
    menus: resolvedMenus,
  }
}
