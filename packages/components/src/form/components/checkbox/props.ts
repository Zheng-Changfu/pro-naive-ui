import type { CheckboxProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proCheckboxProps = {
  ...proFieldSharedProps,
  valueModelName: {
    type: String,
    default: 'checked',
  },
  fieldProps: Object as PropType<BaseFieldProps<CheckboxProps>>,
} as const

export type ProCheckboxProps = ExtractPublicPropTypes<typeof proCheckboxProps>
