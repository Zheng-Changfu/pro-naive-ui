import type { ComputedRef } from 'vue'
import { hyphenate } from '@vueuse/core'
import { computed, getCurrentInstance, unref } from 'vue'
import { useInjectGlobalConfig } from '../config-provider/context'

/**
 * 这里虽然有泛型推断，但是用户需要主动传入类型，防止ts构建类型声明文件时太复杂报错
 */
export function useOverrideProps<T extends object>(name: string, props: T): ComputedRef<T> {
  const inst = getCurrentInstance()
  const { mergedPropOverrides } = useInjectGlobalConfig()

  return computed(() => {
    if (!inst)
      return props
    /**
     * 用户传递的所有属性
     */
    const inhertprops = inst.vnode.props
    const overridedProps = unref(mergedPropOverrides)[name] as Partial<T>

    if (!overridedProps) {
      return props
    }

    const copyedProps = { ...props } as any
    for (const key in overridedProps) {
      if (!(key in props))
        continue

      if (inhertprops && (key in inhertprops || hyphenate(key) in inhertprops)) {
        const value = props[key]
        const overridedValue = overridedProps[key]
        if (
          typeof value === 'object'
          && value !== null
          && typeof overridedValue === 'object'
          && overridedValue !== null
        ) {
          copyedProps[key] = { ...overridedProps[key], ...value }
        }
        continue
      }

      copyedProps[key] = overridedProps[key]
    }
    return copyedProps
  })
}
