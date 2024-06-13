export interface ProPasswordSlots {
  'count': any
  'prefix': any
  'suffix': any
  'separator': any
  'clear-icon': any
  'password-visible-icon': any
  'password-invisible-icon': any
  // 扩展的
  'empty': { value: any }
  'readonly': { value: any }
}

export const proPasswordExtendSlotKeys = [
  'empty',
  'readonly',
] as const
