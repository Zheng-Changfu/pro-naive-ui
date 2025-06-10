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
    const map = new Map<Exclude<MenuKey, null>, {
      item: MenuOption
      childrenKeys: Exclude<MenuKey, null>[]
      parentKey: MenuKey
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

  /**
   * 从任意一个 key 出发,获取该 key 的菜单完整路径
   * 如果有多层级的孩子,只取每一个层级孩子的第一个,一直取到叶子节点
   */
  function getMenuKeyFullPath(key: MenuKey) {
    const paths: Exclude<MenuKey, null>[] = []
    // 收集所有的父级 key,包括自己
    let currentKey = key
    while (!isNil(currentKey)) {
      paths.unshift(currentKey)
      const info = menuKeyToMetaMap.value.get(currentKey)
      if (!info) {
        break
      }
      currentKey = info.parentKey
    }
    // 收集多层级孩子的每一个层级孩子的第一个key
    currentKey = key
    while (!isNil(currentKey)) {
      const info = menuKeyToMetaMap.value.get(currentKey)
      if (!info) {
        break
      }
      if (info.childrenKeys.length > 0) {
        paths.push(info.childrenKeys[0])
      }
      currentKey = info.childrenKeys[0]
    }
    return paths
  }

  return {
    menuKeyToMetaMap,
    getMenuKeyFullPath,
    menus: resolvedMenus,
  }
}
