import type { ProFieldProps } from '../props'
import { computed, inject, unref } from 'vue'
import { useInjectProFormConfig } from '../../../context'
import { proFieldConfigInjectionKey } from '../context'

export function useMergeOptions(props: ProFieldProps) {
  const {
    readonly: formReadonlyRef,
  } = useInjectProFormConfig()

  const {
    readonly: injectedReadonlyRef,
    showLabel: injectedShowLabelRef,
  } = inject(proFieldConfigInjectionKey, {})

  const mergedTitle = computed(() => {
    return props.title ?? props.label
  })

  const mergedReadonly = computed(() => {
    if (props.readonly !== undefined) {
      return !!props.readonly
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
    if (props.showLabel !== undefined) {
      return props.showLabel
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
