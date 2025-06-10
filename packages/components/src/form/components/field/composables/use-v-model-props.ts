import type { BaseField } from 'pro-composables'
import type { ProFieldProps } from '../props'
import { computed } from 'vue'

interface UseFieldVModelPropOptions {
  field: BaseField
}
export function useVModelProps(props: ProFieldProps, options: UseFieldVModelPropOptions) {
  const {
    field,
  } = options

  return computed(() => {
    const { valueModelName } = props
    if (valueModelName) {
      const eventName = `onUpdate${valueModelName.slice(0, 1).toUpperCase()}${valueModelName.slice(1)}`
      return {
        [valueModelName]: field.value.value,
        [eventName]: field.doUpdateValue,
      }
    }
    return {}
  })
}
