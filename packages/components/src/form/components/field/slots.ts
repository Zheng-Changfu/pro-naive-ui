import type { Merge, Simplify } from 'type-fest'
import type { VNodeChild } from 'vue'
import type { ValidateError } from '../../props'

export interface ProFieldSlots<InputProps = Record<string, any>> {
  /**
   * form-item label 插槽
   */
  label: any
  /**
   * form-item feedback 插槽
   */
  feedback: {
    /**
     * 表单项验证的错误信息列表
     */
    errors: ValidateError[]
    /**
     * 表单项验证的警告信息列表
     */
    warnings: ValidateError[]
    /**
     * 表单项验证的反馈信息（warning 和 error 信息内部完成）
     */
    feedbacks: ValidateError[]
    /**
     * 表单项验证的反馈信息颜色（warning 和 error 颜色内部完成）
     */
    feedbackColor: string
    /**
     * 反馈信息虚拟 dom
     */
    feedbackDom: VNodeChild
  }
  /**
   * 自定义表单项
   */
  input: {
    /**
     *  是否为只读模式
     */
    readonly: boolean
    /**
     * 传递给表单项的所有 props
     */
    inputProps: InputProps
  }
}

interface ProFieldInputSlotsType<InputProps extends object> {
  /**
   * 是否为只读模式
   */
  readonly: boolean
  /**
   * 表单项节点（会根据 readonly 自动切换）
   */
  inputDom: VNodeChild
  /**
   * 传递给表单项的所有 props
   */
  inputProps: InputProps
}

export type ProFieldSharedSlots<InputProps extends object> = Merge<
  ProFieldSlots,
  {
    input: Simplify<ProFieldInputSlotsType<InputProps>>
  }
>
