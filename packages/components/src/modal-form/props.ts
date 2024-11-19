import type { Simplify } from 'type-fest'
import type { ExtractPublicPropTypes, PropType, VNodeChild } from 'vue'
import type { ProButtonProps } from '../button'
import type { ProModalProps } from '../modal/props'
import type { CreateProModalFormReturn } from './composables/createProModalForm'
import { omit } from 'lodash-es'
import { proFormProps } from '../form'
import { proModalProps } from '../modal/props'

export type FooterRender = (opt: {
  footerDom: VNodeChild
}) => VNodeChild

export const proModalFormExtendProps = {
  /**
   * 弹窗表单控制器
   */
  modalForm: {
    type: Object as PropType<CreateProModalFormReturn>,
    required: true,
  },
  /**
   * 关闭弹窗后是否重置表单
   */
  restoreValuesOnClosed: {
    type: Boolean,
    default: true,
  },
  /**
   * 传递给取消按钮的属性，false 不显示按钮
   */
  resetButtonProps: {
    type: [Boolean, Object] as PropType<false | ProButtonProps>,
    default: undefined,
  },
  /**
   * 传递给确认按钮的属性，false 不显示按钮
   */
  submitButtonProps: {
    type: [Boolean, Object] as PropType<false | ProButtonProps>,
    default: undefined,
  },
  /**
   * 透传给 modal 的属性，某些属性有冲突时可能有用
   */
  proModalProps: {
    type: Object as PropType<Simplify<Omit<
      ProModalProps,
      | 'show'
      | 'onUpdateShow'
      | 'onUpdate:show'
    >>>,
  },
} as const

export const proModalFormProps = {
  ...omit(proModalProps, [
    'show',
    'onUpdateShow',
    'onUpdate:show',
  ]),
  ...proModalFormExtendProps,
  ...omit(proFormProps, 'form'),
  /**
   * 调整默认值为 false
   */
  closeOnEsc: Boolean,
  /**
   * 调整默认值为 false
   */
  maskClosable: Boolean,
  /**
   * 调整默认值为 false
   */
  autoFocus: Boolean,
  /**
   * 不支持 dialog 和 confirm 预设
   */
  preset: String as PropType<'card'>,
  /**
   * 重写类型，为 false 不显示 action
   */
  footer: {
    type: [Function, Boolean] as PropType<false | FooterRender>,
    default: undefined,
  },
} as const

export type ProModalFormProps = ExtractPublicPropTypes<typeof proModalFormProps>
export type ProModalFormExtendProps = ExtractPublicPropTypes<typeof proModalFormExtendProps>