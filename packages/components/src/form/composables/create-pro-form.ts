import type { EventHookOn } from '@vueuse/core'
import type { FormInst, FormItemRule } from 'naive-ui'
import type { BaseForm, FormOptions, InternalPath } from 'pro-composables'
import type { Merge, Paths, Simplify } from 'type-fest'
import type { FieldExtraInfo } from '../components/field/field-extra-info'
import type { FormItemInternalValidationResult } from './use-validation-result'
import { createEventHook } from '@vueuse/core'
import { isString } from 'lodash-es'
import { createForm, stringifyPath } from 'pro-composables'
import { inject, provide, ref } from 'vue'
import { createInjectionKey } from '../../composables/create-injection-key'
import { fieldExtraKey } from '../components/field/field-extra-info'
import { useValidationResults } from './use-validation-result'

export interface ValidateError {
  field?: string
  fieldValue?: any
  message?: string
}

interface ProFormInst extends FormInst {
  loading: boolean
}

export const proFormInternalKey = '__proFormInternalKey__'

type StringKeyof<Values = any> = Exclude<Paths<Values>, symbol | number>

export type CreateProFormReturn<Values = any> = Simplify<Pick<
  BaseForm<Values>,
  | 'values'
  | 'fieldsValue'
  | 'resetFieldValue'
  | 'resetFieldsValue'
  | 'setInitialValue'
  | 'setInitialValues'
> & {
  /**
   * 提交表单
   */
  submit: () => void
  /**
   * 还原所有字段值并清空校验
   */
  restoreFieldsValue: () => void
  /**
   * 数据重置后的回调事件
   */
  onReset: EventHookOn<void>
  /**
   * 数据验证失败后回调事件
   */
  onSubmitFailed: EventHookOn<ValidateError[][]>
  /**
   * 数据验证成功后的回调事件
   */
  onSubmit: EventHookOn<{ values: Values, warnings: ValidateError[][] }>
  /**
   * 还原指定字段值并清空校验
   */
  restoreFieldValue: <T extends InternalPath = StringKeyof<Values>>(path: T) => void
  /**
   * 清空校验
   */
  restoreValidation: <T extends InternalPath = StringKeyof<Values>>(paths?: T) => void
  /**
   * 校验
   */
  validate: <T extends InternalPath = StringKeyof<Values>>(paths?: T, shouldRuleBeApplied?: (rule: FormItemRule) => boolean,) => ReturnType<FormInst['validate']> | undefined
  /**
   * 获取字段值的校验结果
   * @param path 路径
   */
  getFieldValidationResult: (path: InternalPath) => FormItemInternalValidationResult | null
  /**
   * 内部使用
   */
  [proFormInternalKey]: {
    internalForm: BaseForm
    registerProFormInst: (form: ProFormInst) => void
    validationResults: ReturnType<typeof useValidationResults>
  }
}>

export interface CreateProFormOptions<Values = any> extends FormOptions<Values> {
  /**
   * 数据重置后的回调事件
   */
  onReset?: () => void
  /**
   * 数据验证成功后的回调事件
   */
  onSubmit?: (values: Values, warnings: ValidateError[][]) => void | Promise<void>
  /**
   * 数据验证失败后回调事件
   */
  onSubmitFailed?: (errors: ValidateError[][]) => void
}

export function createProForm<Values = any>(
  options: Simplify<CreateProFormOptions<Values>> = {},
): CreateProFormReturn<Values> {
  const {
    omitNil,
    onReset,
    onSubmit,
    initialValues,
    omitEmptyString,
    onValueChange,
    onSubmitFailed,
  } = options

  const internalForm = createForm({
    omitNil,
    initialValues,
    onValueChange,
    omitEmptyString,
  })

  const {
    values,
    fieldsValue,
    setInitialValue,
    resetFieldValue,
    resetFieldsValue,
    setInitialValues,
    _: { fieldStore },
  } = internalForm

  const proFormInst = ref<ProFormInst>()
  const validationResults = useValidationResults()

  const {
    on: onResetHook,
    trigger: triggerResetHook,
  } = createEventHook<void>()

  const {
    on: onSubmitFailedHook,
    trigger: triggerSubmitFailedHook,
  } = createEventHook<ValidateError[][]>()

  const {
    on: onSubmitHook,
    trigger: triggerSubmitHook,
  } = createEventHook<{ values: Values, warnings: ValidateError[][] }>()

  const {
    addValidationErrors,
    addValidationWarnings,
    clearValidationResults,
    getFieldValidationResult,
  } = validationResults

  function registerProFormInst(form: ProFormInst) {
    proFormInst.value = form
  }

  function validate(
    paths?: InternalPath,
    shouldRuleBeApplied?: (rule: FormItemRule) => boolean,
  ) {
    if (!paths) {
      return proFormInst.value?.validate(addValidateResults, (rule) => {
        const applied = !(rule as any).readonly
        if (!shouldRuleBeApplied) {
          return applied
        }
        return applied && shouldRuleBeApplied(rule)
      })
    }
    paths = (isString(paths) ? [paths] : paths).map(stringifyPath)
    return proFormInst.value?.validate(
      (errors, extra) => addValidateResults(errors, extra, false),
      (rule) => {
        const applied = paths.includes(rule.key!) && !(rule as any).readonly
        if (!shouldRuleBeApplied) {
          return applied
        }
        return applied && shouldRuleBeApplied(rule)
      },
    )
  }

  function submit() {
    const loading = proFormInst.value?.loading
    if (loading) {
      return
    }
    validate()
      ?.then(({ warnings }) => {
        if (onSubmit) {
          onSubmit(fieldsValue.value as any, warnings ?? [])
        }
        triggerSubmitHook({ values: fieldsValue.value as any, warnings: warnings ?? [] })
      })
      ?.catch((errors) => {
        if (!onSubmitFailed) {
          throw errors
        }
        onSubmitFailed(errors)
        triggerSubmitFailedHook(errors)
      })
  }

  function restoreValidation(paths?: InternalPath) {
    if (!paths) {
      proFormInst.value?.restoreValidation()
      return
    }
    const field = fieldStore.getFieldByPath(paths)
    if (field && field[fieldExtraKey]) {
      const { proFormItemInst } = field[fieldExtraKey] as FieldExtraInfo
      const formItemInst = proFormItemInst.value
      formItemInst && formItemInst.restoreValidation()
    }
  }

  function restoreFieldValue(path: InternalPath) {
    resetFieldValue(path)
    restoreValidation(path)
    clearValidationResults(path)
    onReset && onReset()
    triggerResetHook()
  }

  function restoreFieldsValue() {
    resetFieldsValue()
    restoreValidation()
    clearValidationResults()
    onReset && onReset()
    triggerResetHook()
  }

  function addValidateResults(
    errors: ValidateError[][] | undefined,
    extra: {
      warnings: ValidateError[][] | undefined
    },
    clear = true,
  ) {
    const es = errors ?? []
    const ws = extra.warnings ?? []
    clear && clearValidationResults()

    es.forEach((e) => {
      const path = e[0].field
      addValidationErrors(path, e)
    })

    ws.forEach((e) => {
      const path = e[0].field
      addValidationWarnings(path, e)
    })
  }

  const returned: CreateProFormReturn = {
    values,
    fieldsValue,
    submit,
    validate,
    resetFieldValue,
    setInitialValue,
    setInitialValues,
    resetFieldsValue,
    restoreValidation,
    restoreFieldValue,
    restoreFieldsValue,
    onReset: onResetHook,
    onSubmit: onSubmitHook,
    getFieldValidationResult,
    onSubmitFailed: onSubmitFailedHook,
    [proFormInternalKey]: {
      internalForm,
      validationResults,
      registerProFormInst,
    },
  }
  return Object.freeze(returned)
}

const proFormContextKey = createInjectionKey<CreateProFormReturn>('pro-form')

export function provideProForm(form: CreateProFormReturn) {
  provide(proFormContextKey, form)
}

export function useInjectProForm<Values = any>(): Simplify<CreateProFormReturn<Values>> | null {
  return inject(proFormContextKey, null)
}

export type ExtendProForm<V = any, PM extends object = object, PO extends object = object> = Merge<
  Merge<Omit<CreateProFormReturn<V>, typeof proFormInternalKey>, PM>,
  {
    [proFormInternalKey]: Merge<CreateProFormReturn<V>[typeof proFormInternalKey], PO>
  }
>

export function extendProForm<
  Values = any,
  PublicMethods extends object = object,
  PrivateOptions extends object = object,
>(
  options: Simplify<CreateProFormOptions<Values>>,
  publicMethods: PublicMethods,
  privateOptions: PrivateOptions,
): ExtendProForm<Values, PublicMethods, PrivateOptions> {
  let returned = createProForm(options) as any

  if (publicMethods) {
    returned = {
      ...returned,
      ...publicMethods,
    }
  }

  if (privateOptions) {
    returned = {
      ...returned,
      [proFormInternalKey]: {
        ...returned[proFormInternalKey],
        ...privateOptions,
      },
    }
  }

  return Object.freeze(returned)
}
