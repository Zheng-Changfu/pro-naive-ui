import type { FormItemRule } from 'naive-ui'
import type { PropType } from 'vue'
import type { FormItemInternalValidateResult } from '../../../composables/useValidationResult'
import type { FieldExtraInfo } from '../../field'
import { useInjectField } from 'pro-composables'
import { inject, onUnmounted, provide } from 'vue'
import { useInjectProFormConfig } from '../../../context'
import { fieldExtraKey, useReadonlyHelpers } from '../../field'

/**
 * 对表单项调用校验的方法打补丁，为了收集校验结果，实现错误信息自定义位置
 */
export default defineComponent({
  name: 'TrackValidationResult',
  props: {
    rule: Array as PropType<FormItemRule[]>,
  },
  setup(props) {
    const field = useInjectField()
    const nFormItem = inject('n-form-item')!
    const { readonly } = useReadonlyHelpers()
    const formConfig = useInjectProFormConfig()
    const formItemInstRef = (field?.[fieldExtraKey] as FieldExtraInfo)?.proFormItemInst

    function collectValidationResult(trigger: string, res: Partial<FormItemInternalValidateResult>) {
      const { errors, warnings } = res
      if (!field)
        return
      const path = field.stringPath.value

      const activeRules = (
        props.rule!.filter((rule) => {
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.includes(trigger)
          }
          else {
            return rule.trigger === trigger
          }
        })
      )
      if (!activeRules.length) {
        return
      }
      if (path && formConfig) {
        formConfig.clearValidationResults(path)
        formConfig.addValidationErrors(path, errors)
        formConfig.addValidationWarnings(path, warnings)
      }
    }

    function handleContentBlur(): void {
      formItemInstRef?.value
        ?.internalValidate('blur')
        .then(res => collectValidationResult('blur', res))
    }

    function handleContentChange(): void {
      formItemInstRef?.value
        ?.internalValidate('change')
        .then(res => collectValidationResult('change', res))
    }

    function handleContentFocus(): void {
      formItemInstRef?.value
        ?.internalValidate('focus')
        .then(res => collectValidationResult('focus', res))
    }

    function handleContentInput(): void {
      formItemInstRef?.value
        ?.internalValidate('input')
        .then(res => collectValidationResult('input', res))
    }

    onUnmounted(() => {
      if (formConfig && field) {
        formConfig.clearValidationResults(field.stringPath.value)
      }
    })

    /**
     * 切换只读时，清空校验结果
     */
    watch(
      readonly,
      () => {
        if (formConfig && field) {
          formConfig.clearValidationResults(field.stringPath.value)
          formItemInstRef?.value.restoreValidation()
        }
      },
    )

    provide('n-form-item', {
      ...nFormItem,
      handleContentBlur,
      handleContentFocus,
      handleContentInput,
      handleContentChange,
    })
  },
  render() {
    return this.$slots.default?.()
  },
})