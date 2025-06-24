import type { FlexProps, RadioGroupProps, RadioProps } from 'naive-ui'
import type { Merge } from 'type-fest'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export interface ProRadioGroupFieldProps extends RadioGroupProps {
  /**
   * 选项 label 的字段名
   * @default 'label'
   */
  labelField?: string
  /**
   * 选项 value 的字段名
   * @default 'value'
   */
  valueField?: string
  /**
   * 配置选项内容
   */
  options?: Array<Merge<RadioProps, { [x: string]: any }>>
  /**
   * 包裹 n-radio 的 flex 属性
   */
  flexProps?: FlexProps
  /**
   * 单选组或者按钮组
   * @default 'radio
   */
  type?: 'button' | 'radio'
}

export const proRadioGroupProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<ProRadioGroupFieldProps>>,
} as const

export type ProRadioGroupProps = ExtractPublicPropTypes<typeof proRadioGroupProps>
