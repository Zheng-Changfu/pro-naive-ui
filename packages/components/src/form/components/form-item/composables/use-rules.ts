import type { FormItemRule } from 'naive-ui'
import type { ComputedRef } from 'vue'
import type { ProFormItemProps } from '../props'
import { get, isArray, toString } from 'lodash-es'
import { useInjectField } from 'pro-composables'
import { computed, unref } from 'vue'
import { isEmptyValue } from '../../../../_utils/is-empty-value'
import { useLocale } from '../../../../locales'
import { useInjectProFormConfig } from '../../../context'
import { fieldExtraKey } from '../../field/field-extra-info'

export function useRules(props: ComputedRef<ProFormItemProps>) {
  const {
    t,
  } = useLocale('ProForm')

  const {
    rules,
    validationTrigger,
  } = useInjectProFormConfig()

  const field = useInjectField()

  function requiredValidator(_: any, value: any) {
    return !isEmptyValue(value)
  }

  function requiredMessage() {
    const localeRequiredMessage = t('validateMessages.required')
    const { title, label } = props.value
    return localeRequiredMessage(toString(title ?? label))
  }

  const mergedRules = computed<FormItemRule[]>(() => {
    const formRules = rules.value
    const { rule = [], path, required } = props.value
    const normalizedFormItemRules = isArray(rule) ? [...rule] : [rule]

    if (formRules !== undefined && path !== undefined) {
      const formRule = get(formRules, path)
      if (formRule !== undefined) {
        isArray(formRule)
          ? normalizedFormItemRules.push(...formRule)
          : normalizedFormItemRules.push(formRule)
      }
    }
    if (required) {
      normalizedFormItemRules.push({
        required: true,
      })
    }
    return normalizedFormItemRules
  })

  const finalRules = computed<FormItemRule[]>(() => {
    return mergedRules.value
      .map((rule) => {
        const { required, message, validator } = rule
        if (required) {
          /**
           * 解决 naive-ui 需要在 rule 对象中设定 type 的问题
           */
          return {
            ...rule,
            /**
             * 统一设置必填的校验方法
             */
            validator: validator ?? requiredValidator,
            /**
             * 统一设置必填的提示信息
             */
            message: message ?? (validator ? undefined : requiredMessage),
          }
        }
        return rule
      })
      .map((rule) => {
        return {
        /**
         * 统一设置表单校验时机
         */
          trigger: unref(validationTrigger),
          ...rule,
          /**
           * 给每个 rule 增加 key，方便 validate 方法校验
           */
          key: field ? field.stringPath.value : '',
          /**
           * 给每个 rule 增加 readonly，方便 validate 方法过滤
           */
          readonly: field ? field[fieldExtraKey].readonly.value : false,
        }
      })
  })

  return finalRules
}
