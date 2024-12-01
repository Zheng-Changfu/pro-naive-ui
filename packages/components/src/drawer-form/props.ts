import type { Simplify } from 'type-fest'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { CreateProDrawerFormReturn } from './composables/createProDrawerForm'
import { omit } from 'lodash-es'
import { drawerProps, type DrawerProps } from 'naive-ui'
import { proFormProps } from '../form'

export const proDrawerFormExtendProps = {
  /**
   * 关闭弹窗后是否重置表单
   */
  restoreValuesOnClosed: {
    type: Boolean,
    default: true,
  },
  /**
   * 提交时是否可以关闭
   */
  closeOnSubmiting: Boolean,
  /**
   * 透传给 drawer 的属性，某些属性有冲突时可能有用
   */
  drawerProps: {
    type: Object as PropType<Simplify<Omit<
      DrawerProps,
      | 'show'
      | 'onUpdateShow'
      | 'onUpdate:show'
    >>>,
  },
} as const

export const proDrawerFormProps = {
  ...omit(drawerProps, [
    'show',
    'onUpdateShow',
    'onUpdate:show',
  ]),
  ...proDrawerFormExtendProps,
  ...proFormProps,
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
   * 调整默认宽度
   */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: 520,
  },
  /**
   * 抽屉表单控制器
   */
  form: {
    type: Object as PropType<CreateProDrawerFormReturn>,
    required: true,
  },
} as const

export type ProDrawerFormProps = ExtractPublicPropTypes<typeof proDrawerFormProps>
export type ProDrawerFormExtendProps = ExtractPublicPropTypes<typeof proDrawerFormExtendProps>
