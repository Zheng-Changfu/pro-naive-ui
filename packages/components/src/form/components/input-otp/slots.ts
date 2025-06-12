import type { InputInst, InputOtpProps, InputProps } from 'naive-ui'
import type { ProFieldSharedSlots } from '../field'

export interface ProInputOtpSlots extends ProFieldSharedSlots<InputOtpProps> {
  default: InputProps & { index: number, ref: (inst: InputInst) => void }
}
