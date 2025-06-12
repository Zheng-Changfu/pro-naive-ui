import type { MenuDividerOption, MenuGroupOption, MenuOption } from 'naive-ui'

export function isGroupMenu(menu: MenuOption): menu is MenuGroupOption {
  return menu.type === 'group'
}

export function isDividerMenu(menu: MenuOption): menu is MenuDividerOption {
  return menu.type === 'divider'
}
