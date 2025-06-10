import type { MenuOption } from 'naive-ui'
import { bfs } from './bfs'

interface SplitMenuDataOptions {
  /**
   * children 的字段名
   * @default 'children'
   */
  childrenField?: string
}
/**
 * TODO: 需不需要考虑 type 为 divider 和 group 的情况
 * 分割菜单数据
 * @param menus 菜单数据
 * @param levelOfSplit 分割层级，0表示不分割，1表示分割成一级和其他层级，2表示分割成一级、二级和其他层级
 */
export function splitMenuData(menus: MenuOption[], levelOfSplit: 0, options?: SplitMenuDataOptions): [MenuOption[]]
export function splitMenuData(menus: MenuOption[], levelOfSplit: 1, options?: SplitMenuDataOptions): [MenuOption[], MenuOption[]]
export function splitMenuData(menus: MenuOption[], levelOfSplit: 2, options?: SplitMenuDataOptions): [MenuOption[], MenuOption[], MenuOption[]]
export function splitMenuData(menus: MenuOption[], levelOfSplit: number, options?: SplitMenuDataOptions): [MenuOption[]]
export function splitMenuData(menus: MenuOption[], levelOfSplit: number, options: SplitMenuDataOptions = {}):
  | [MenuOption[]]
  | [MenuOption[], MenuOption[]]
  | [MenuOption[], MenuOption[], MenuOption[]] {
  const {
    childrenField = 'children',
  } = options

  if (levelOfSplit === 1) {
    const firstLevelMenus: MenuOption[] = []
    const otherLevelMenus: MenuOption[] = []
    bfs(menus, (menu, level, stop) => {
      if (level > 2) {
        stop()
        return
      }
      if (level === 1) {
        const { [childrenField]: _, ...menuWithoutChildren } = menu
        firstLevelMenus.push(menuWithoutChildren)
        return
      }
      if (level === 2) {
        otherLevelMenus.push(menu)
      }
    }, childrenField)
    return [firstLevelMenus, otherLevelMenus]
  }
  if (levelOfSplit === 2) {
    const firstLevelMenus: MenuOption[] = []
    const secondLevelMenus: MenuOption[] = []
    const otherLevelMenus: MenuOption[] = []
    bfs(menus, (menu, level, stop) => {
      if (level > 3) {
        stop()
        return
      }
      if (level === 1) {
        const { [childrenField]: _, ...menuWithoutChildren } = menu
        firstLevelMenus.push(menuWithoutChildren)
        return
      }
      if (level === 2) {
        const { [childrenField]: _, ...menuWithoutChildren } = menu
        secondLevelMenus.push(menuWithoutChildren)
        return
      }
      if (level === 3) {
        otherLevelMenus.push(menu)
      }
    }, childrenField)
    return [firstLevelMenus, secondLevelMenus, otherLevelMenus]
  }
  return [menus]
}
