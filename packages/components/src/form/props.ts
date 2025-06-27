import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { CreateProFormReturn } from './composables/create-pro-form'
import { formProps } from 'naive-ui'
import { keysOf } from '../_utils/keys-of'
import { simplyOmit } from '../_utils/simply-omit'

export interface ValidateError {
  message?: string
  fieldValue?: any
  field?: string
}

export type ValidationTrigger = 'input' | 'change' | 'blur' | 'focus' | ({} & string)

export const proFormExtendProps = {
  /**
   * 表单控制器
   */
  form: {
    type: Object as PropType<CreateProFormReturn>,
    required: true,
  },
  /**
   * 表单是否在提交中,防止重复提交
   */
  loading: Boolean,
  /**
   * 表单验证时机
   */
  validationTrigger: {
    type: [String, Array] as PropType<ValidationTrigger | ValidationTrigger[]>,
    default: 'input',
  },
  /**
   * 是否为只读状态，优先级低于 ProField 的 readonly
   */
  readonly: {
    type: Boolean,
    default: undefined,
  },
} as const

export const proFormProps = {
  /**
   * 继承原来的属性
   * 剔除 model, 表单值内部管理
   */
  ...simplyOmit(formProps, [
    'model',
  ]),
  ...proFormExtendProps,
} as const

export const proFormPropKeys = keysOf(proFormProps)
export type ProFormProps = ExtractPublicPropTypes<typeof proFormProps>
export type ProFormExtendProps = ExtractPublicPropTypes<typeof proFormExtendProps>
