import type { IsAny, Merge } from 'type-fest'
import type { CSSProperties, VNodeChild } from 'vue'

export type AnyFn = (...args: any[]) => any
export type IsFunction<T> = T extends AnyFn ? true : false
export type MaybeFunction<T, Parameters extends any[]> = T | ((...args: Parameters) => T)

export type BaseFieldProps<T> = Merge<{
  class?: string
  style?: CSSProperties
  [x: string]: any
}, T>

export type UnwrapSlots<T> = {
  [K in keyof T]?: IsAny<T[K]> extends true ? () => VNodeChild : (params: NonNullable<T[K]>) => VNodeChild
}
