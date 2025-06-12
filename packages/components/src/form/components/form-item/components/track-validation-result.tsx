import type { FormItemRule } from 'naive-ui'
import type { PropType } from 'vue'
import type { FormItemInternalValidationResult } from '../../../composables/use-validation-result'
import type { FieldExtraInfo } from '../../field/field-extra-info'
import { useInjectField } from 'pro-composables'
import { defineComponent, inject, onUnmounted, provide, watch } from 'vue'
import { useInjectProFormConfig } from '../../../context'
import { useFieldUtils } from '../../field/composables/use-field-utils'
import { fieldExtraKey } from '../../field/field-extra-info'

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
    const { readonly } = useFieldUtils()
    const nFormItem = inject('n-form-item')!
    const formConfig = useInjectProFormConfig()
    const formItemInstRef = (field?.[fieldExtraKey] as FieldExtraInfo)?.proFormItemInst

    function collectValidationResult(trigger: string, res: Partial<FormItemInternalValidationResult>) {
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
        formConfig.validationResults.clearValidationResults(path)
        formConfig.validationResults.addValidationErrors(path, errors)
        formConfig.validationResults.addValidationWarnings(path, warnings)
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
        formConfig.validationResults.clearValidationResults(field.stringPath.value)
      }
    })

    /**
     * 切换只读时，清空校验结果
     */
    watch(
      readonly,
      () => {
        if (formConfig && field) {
          formItemInstRef?.value.restoreValidation()
          formConfig.validationResults.clearValidationResults(field.stringPath.value)
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
