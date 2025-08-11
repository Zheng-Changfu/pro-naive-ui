import type { ArrayField, BaseField } from 'pro-composables'
import type { TupleToUnion } from 'type-fest'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import { simplyOmit } from '../../../_utils/simply-omit'
import { proFormItemProps } from '../form-item'

export const proFieldProps = {
  ...proFormItemProps,
  /**
   * 透传给表单控件的 placeholder
   */
  placeholder: [String, Array] as PropType<string | [string, string]>,
  /**
   * 字段实例，默认内部自动创建，如果需要手动控制字段，可以传入
   */
  fieldInstance: Object as PropType<BaseField | ArrayField>,
  /**
   * 传递给表单控件的 props
   */
  fieldProps: Object as PropType<Record<string, any>>,
  /**
   * 字段被隐藏或删除时是否还保留值
   */
  preserve: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示
   */
  visible: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 是否隐藏
   */
  hidden: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 表单值发生变化后触发的回调函数
   * @param val 当前表单值
   */
  onChange: Function as PropType<(val: any) => void>,
  /**
   * 是否为列表，会根据此字段判断使用 createField 还是 createArrayField
   */
  isList: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 用于 v-model:xxx 的名称，默认为 'value'，用于支持 'v-model:value'
   */
  valueModelName: {
    type: String,
    default: 'value',
  },
  /**
   * 是否只读
   */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 手动控制值的更新
   * @param value 输入值
   */
  onUpdateValue: Function as PropType<(value: any, ...args: any[]) => void>,
} as const

const proFieldIgnoreKeys = [
  'isList',
  'fieldProps',
] as const

/**
 * 所有的非列表表单项应该共享的，例如 pro-input 等
 */
export const proFieldSharedProps = {
  ...simplyOmit(
    proFieldProps,
    proFieldIgnoreKeys as any,
  ) as Omit<typeof proFieldProps, TupleToUnion<typeof proFieldIgnoreKeys>>,
} as const

/**
 * 所有的列表表单项应该共享的，例如 pro-form-list 等
 */
const proListFieldIgnoreKeys = [
  'isList',
  'onChange',
  'fieldProps',
  'placeholder',
  'onUpdateValue',
  'valueModelName',
] as const

export const proListFieldSharedProps = {
  ...simplyOmit(
    proFieldProps,
    proListFieldIgnoreKeys as any,
  ) as Omit<typeof proFieldProps, TupleToUnion<typeof proListFieldIgnoreKeys>>,
}

export type ProFieldProps = ExtractPublicPropTypes<typeof proFieldProps>
export type ProFieldSharedProps = ExtractPublicPropTypes<typeof proFieldSharedProps>
export type ProListFieldSharedProps = ExtractPublicPropTypes<typeof proListFieldSharedProps>
