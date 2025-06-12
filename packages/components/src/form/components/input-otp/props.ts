import type { InputOtpProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'

import { proFieldSharedProps } from '../field'

export const proInputOtpProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<InputOtpProps>>,
} as const

export type ProInputOtpProps = ExtractPublicPropTypes<typeof proInputOtpProps>
