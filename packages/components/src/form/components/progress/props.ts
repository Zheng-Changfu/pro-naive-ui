import type { ProgressProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proProgressProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<ProgressProps>>>,
    default: () => ({}),
  },
} as const

export type ProProgressProps = ExtractPublicPropTypes<typeof proProgressProps>
