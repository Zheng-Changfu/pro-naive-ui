import { type ComputedRef, computed, ref, watch } from 'vue'
import type { BaseField, ExcludeExpression } from 'pro-components-hooks'
import { get, isArray } from 'lodash-es'
import { useInternalScopeRequest } from '../_internal/useInternalRequest'
import { useInjectProFormInstanceContext } from '../../context'
import type { ProCheckboxGroupProps } from './props'

export function useOptions(
  props: ProCheckboxGroupProps,
  parsedFieldProps: ComputedRef<ExcludeExpression<ProCheckboxGroupProps['fieldProps']>>,
  field: BaseField,
) {
  const options = ref<any[]>([])
  const proFormInst = useInjectProFormInstanceContext()
  const controls = useInternalScopeRequest(props.fetchConfig!, field.scope)
  const restoreValueOnFetched = props.fetchConfig?.restoreValueOnFetched ?? true

  const {
    data,
    loading,
    onSuccess,
    onFailure,
  } = controls

  watch(
    computed(() => parsedFieldProps.value?.options),
    (propOptions) => { options.value = isArray(propOptions) ? propOptions : [] },
    { immediate: true, deep: true },
  )

  const normalizedOptions = computed(() => {
    const {
      labelField = 'label',
      valueField = 'value',
    } = parsedFieldProps.value ?? {}

    return options.value.map((item) => {
      const label = get(item, labelField)
      const value = get(item, valueField)
      return {
        ...item,
        label,
        value,
      }
    })
  })

  function tryRestoreValue() {
    if (
      restoreValueOnFetched
      && proFormInst
      && field.stringPath.value
    ) {
      proFormInst.restoreFieldValue(field.stringPath.value)
    }
  }

  function setOptions(opts: any[]) {
    options.value = opts
  }

  onSuccess((response) => {
    options.value = isArray(response) ? response : []
    tryRestoreValue()
  })

  onFailure(() => {
    const vals = data.value
    options.value = isArray(vals) ? vals : []
    tryRestoreValue()
  })

  return {
    loading,
    controls,
    setOptions,
    options: normalizedOptions,
  }
}