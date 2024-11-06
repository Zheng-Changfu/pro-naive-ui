import type { ImageGroupProps, ImageProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proImageProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<ImageProps & { ImageGroupProps: ImageGroupProps }>>>,
    default: () => ({}),
  },
} as const

export type ProImageProps = ExtractPublicPropTypes<typeof proImageProps>
