import type { ProFieldSharedProps } from '../props'
import { keep } from '../../../../_utils/keep'
import { keysOf } from '../../../../_utils/keys-of'
import { proFieldSharedProps } from '../props'

export function pickProFieldSharedProps<T extends Record<string, any>>(value: T) {
  return keep(value, keysOf(proFieldSharedProps)) as ProFieldSharedProps
}
