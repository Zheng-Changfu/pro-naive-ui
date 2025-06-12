import type { ProFieldColumnType } from '../form'
import type { AnyFn } from '../types'
import { isString } from 'lodash-es'
import { h, resolveComponent } from 'vue'
import { warnOnce } from './warn'

interface ResolveComponentByFieldOptions {
  /**
   * field 前缀
   * @default 'pro'
   */
  prefix?: string
  /**
   * 透传给组件的插槽
   */
  fieldSlots?: Record<string, AnyFn>
  /**
   * 透传给组件的属性
   */
  fieldProps?: Record<string, any>
  /**
   * 透传给 ProField 的属性
   */
  proFieldProps?: Record<string, any>
}
export function resolveComponentByField(field: ProFieldColumnType, options: ResolveComponentByFieldOptions = {}) {
  const {
    fieldSlots,
    fieldProps,
    proFieldProps,
    prefix = 'pro',
  } = options

  const Component = resolveComponent(`${prefix}-${field}`)
  if (!isString(Component)) {
    return h(Component, {
      ...proFieldProps,
      fieldProps,
    }, fieldSlots)
  }
  if (__DEV__) {
    warnOnce(
      'field',
      `${Component} is not registered !`,
    )
  }
  return null
}
