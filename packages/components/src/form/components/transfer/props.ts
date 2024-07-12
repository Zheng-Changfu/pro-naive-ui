import type { SpinProps, TransferOption, TransferProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression, UseRequestOptions } from 'pro-components-hooks'
import { proFormItemProps } from '../../form-item'
import { proFieldProps } from '../../field'

interface ProTransferFieldProps extends TransferProps {
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
  options?: Array<TransferOption & { x: string }>
}

export const proTransferProps = {
  /**
   * 继承属性
   */
  ...proFormItemProps,
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
  /**
   * loading 组件属性
   */
  spinProps: {
    type: Object as PropType<SpinProps>,
    default: () => ({}),
  },
  /**
   * 请求配置
   */
  fetchConfig: {
    type: Object as PropType<MaybeExpression<UseRequestOptions<any, any>> & { restoreValueOnFetched: boolean /** 请求结束后是否还原值并清空校验，防止匹配不到结果造成显示上的错误，默认 true */ }>,
    default: () => ({}),
  },
  /**
   * 代替 source-filter-placeholder 和 target-filter-placeholder
   */
  placeholder: {
    type: Array as PropType<MaybeExpression<string[]>>,
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<Omit<
    ProTransferFieldProps,
    | 'value'
    | 'defaultValue'
    | 'onUpdateValue'
    | 'onUpdate:value'
    | 'sourceFilterPlaceholder'
    | 'targetFilterPlaceholder'
>>>,
    default: () => ({}),
  },
} as const

export type ProTransferProps = ExtractPublicPropTypes<typeof proTransferProps>
