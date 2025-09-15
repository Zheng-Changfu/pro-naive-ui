import type { ArrayField, FieldOptions } from 'pro-composables'
import type { ComputedRef } from 'vue'
import type { ProFormItemProps } from '../../form-item'
import type { ProFieldProps } from '../props'
import { omit } from 'lodash-es'
import { createArrayField, createField } from 'pro-composables'
import { computed, getCurrentInstance, inject, unref, useAttrs } from 'vue'
import { keysOf } from '../../../../_utils/keys-of'
import { omitUndef } from '../../../../_utils/omit-undef'
import { warnOnce } from '../../../../_utils/warn'
import { useOverrideProps } from '../../../../composables'
import { useInjectProFormConfig } from '../../../context'
import { proFieldConfigInjectionKey } from '../context'
import { fieldExtraKey } from '../field-extra-info'
import { proListFieldSharedProps } from '../props'
import { useMergePlaceholder } from './use-merge-placeholder'

function getComponentName() {
  const inst = getCurrentInstance()
  if (inst) {
    // Do not use 'inst.type.__name' because it is automatically generated at compile time and is not trustworthy.
    return inst.type.name ?? inst.type.displayName as string
  }
}

function useField(props: ComputedRef<ProFieldProps>) {
  const {
    isList,
    preserve,
    onChange,
    onUpdateValue,
    fieldInstance,
  } = props.value

  if (fieldInstance) {
    return fieldInstance
  }

  const fieldOptions: FieldOptions = {
    preserve,
    path: computed(() => props.value.path),
    hidden: computed(() => props.value.hidden),
    visible: computed(() => props.value.visible),
    onChange,
    onUpdateValue,
  }

  return isList
    ? createArrayField(fieldOptions)
    : createField(fieldOptions)
}

function useMergeConfig(props: ComputedRef<ProFieldProps>) {
  const {
    readonly: formReadonlyRef,
  } = useInjectProFormConfig()

  const {
    readonly: injectedReadonlyRef,
    showLabel: injectedShowLabelRef,
  } = inject(proFieldConfigInjectionKey, {})

  const mergedTitle = computed<string | undefined>(() => {
    return props.value.title ?? props.value.label
  })

  const mergedReadonly = computed(() => {
    if (props.value.readonly !== undefined) {
      return !!props.value.readonly
    }
    const injectedReadonly = unref(injectedReadonlyRef)
    if (injectedReadonly !== undefined) {
      return injectedReadonly
    }
    const formReadonly = unref(formReadonlyRef)
    if (formReadonly !== undefined) {
      return formReadonly
    }
    return false
  })

  const mergedShowLabel = computed(() => {
    if (props.value.showLabel !== undefined) {
      return props.value.showLabel
    }
    const injectedShowLabel = unref(injectedShowLabelRef)
    if (injectedShowLabel !== undefined) {
      return injectedShowLabel
    }
  })

  return {
    mergedTitle,
    mergedReadonly,
    mergedShowLabel,
  }
}

export function useProField<FieldProps = any>(props: ProFieldProps, name?: string) {
  name = name ?? getComponentName() ?? ''
  if (!name && __DEV__) {
    warnOnce(
      'pro-field',
      '`pro-field` missing name, this may cause the placeholder not to be generated correctly and not be overridden by `prop-overrides` in `pro-config-provider`.',
    )
  }
  const mergedPlaceholder = useMergePlaceholder(name, props)
  const overridedProps = useOverrideProps<ProFieldProps>(name, props)

  const attrs = useAttrs()
  const field = useField(overridedProps)

  const {
    mergedTitle,
    mergedReadonly,
    mergedShowLabel,
  } = useMergeConfig(overridedProps)

  const vModelProps = computed(() => {
    const { valueModelName } = overridedProps.value
    if (valueModelName) {
      const eventName = `onUpdate${valueModelName.slice(0, 1).toUpperCase()}${valueModelName.slice(1)}`
      return {
        [valueModelName]: field.value.value,
        [eventName]: field.doUpdateValue,
      }
    }
    return {}
  })

  const mergedFieldProps = computed(() => {
    const fieldProps = overridedProps.value.fieldProps ?? {}
    if (mergedPlaceholder.value === undefined) {
      return {
        ...fieldProps,
        ...vModelProps.value,
      } as FieldProps & { placeholder?: any }
    }
    return {
      ...fieldProps,
      ...vModelProps.value,
      placeholder: mergedPlaceholder.value,
    } as FieldProps & { placeholder?: any }
  })

  const proFormItemProps = computed<ProFormItemProps>(() => {
    const props = overridedProps.value
    const formItemProps: ProFormItemProps = {
      size: props.size,
      rule: props.rule,
      first: props.first,
      theme: props.theme,
      tooltip: props.tooltip,
      rulePath: props.rulePath,
      feedback: props.feedback,
      required: props.required,
      title: mergedTitle.value,
      labelWidth: props.labelWidth,
      labelAlign: props.labelAlign,
      labelProps: props.labelProps,
      labelStyle: props.labelStyle,
      path: field.stringPath.value,
      showLabel: mergedShowLabel.value,
      showFeedback: props.showFeedback,
      contentClass: props.contentClass,
      contentStyle: props.contentStyle,
      feedbackClass: props.feedbackClass,
      feedbackStyle: props.feedbackStyle,
      labelPlacement: props.labelPlacement,
      themeOverrides: props.themeOverrides,
      showRequireMark: props.showRequireMark,
      ignorePathChange: props.ignorePathChange,
      validationStatus: props.validationStatus,
      requireMarkPlacement: props.requireMarkPlacement,
      builtinThemeOverrides: props.builtinThemeOverrides,
    }
    return {
      ...attrs,
      ...omitUndef(formItemProps),
    }
  })

  field[fieldExtraKey] = {
    readonly: mergedReadonly,
  }

  return {
    field,
    overridedProps,
    mergedReadonly,
    proFormItemProps,
    mergedFieldProps,
  }
}

export function useProListField<FieldProps = any>(props: ProFieldProps, name?: string) {
  name = name ?? getComponentName() ?? ''
  if (!name && __DEV__) {
    warnOnce(
      'pro-list-field',
      '`pro-list-field` missing name, this may cause not be overridden by `prop-overrides` in `pro-config-provider`.',
    )
  }
  const attrs = useAttrs()

  const overridedProps = useOverrideProps<ProFieldProps & { [x: string]: any }>(
    name,
    props,
  )

  const field = useField(computed(() => {
    return {
      ...overridedProps.value,
      isList: true,
    }
  }))

  const {
    mergedTitle,
    mergedReadonly,
    mergedShowLabel,
  } = useMergeConfig(overridedProps)

  const mergedFieldProps = computed(() => {
    return {
      ...omit(
        overridedProps.value,
        keysOf(proListFieldSharedProps),
      ),
      ...(overridedProps.value.fieldProps ?? {}),
    } as FieldProps
  })

  const proFormItemProps = computed<ProFormItemProps>(() => {
    const props = overridedProps.value
    const formItemProps: ProFormItemProps = {
      size: props.size,
      rule: props.rule,
      first: props.first,
      theme: props.theme,
      tooltip: props.tooltip,
      rulePath: props.rulePath,
      feedback: props.feedback,
      required: props.required,
      title: mergedTitle.value,
      labelWidth: props.labelWidth,
      labelAlign: props.labelAlign,
      labelProps: props.labelProps,
      labelStyle: props.labelStyle,
      path: field.stringPath.value,
      contentClass: props.contentClass,
      contentStyle: props.contentStyle,
      showLabel: mergedShowLabel.value,
      showFeedback: props.showFeedback,
      feedbackClass: props.feedbackClass,
      feedbackStyle: props.feedbackStyle,
      labelPlacement: props.labelPlacement,
      themeOverrides: props.themeOverrides,
      showRequireMark: props.showRequireMark,
      ignorePathChange: props.ignorePathChange,
      validationStatus: props.validationStatus,
      requireMarkPlacement: props.requireMarkPlacement,
      builtinThemeOverrides: props.builtinThemeOverrides,
    }
    return {
      ...attrs,
      ...omitUndef(formItemProps),
    }
  })

  field[fieldExtraKey] = {
    readonly: mergedReadonly,
  }

  return {
    overridedProps,
    mergedReadonly,
    proFormItemProps,
    mergedFieldProps,
    field: field as ArrayField,
  }
}
