import { createField } from 'pro-components-hooks'
import { computed, toRef, useSlots } from 'vue'
import type { ProFieldConfig } from './fieldCustomKeys'
import { proFieldConfigKey } from './fieldCustomKeys'
import type { ProFieldProps } from './props'

export function useField(
  name: `Pro${string}`,
  props: ProFieldProps,
  options: ProFieldProps = {},
) {
  const slots = useSlots()
  const {
    preserve,
    onChange,
    postState,
    transform,
    defaultValue,
    dependencies,
    initialValue,
  } = props

  const field = createField({
    preserve,
    defaultValue,
    initialValue,
    dependencies,
    path: toRef(props, 'path'),
    value: toRef(props, 'value'),
    hidden: toRef(props, 'hidden'),
    visible: toRef(props, 'visible'),
    onChange,
    transform,
    postState,
    ...(options as any),
  })

  field[proFieldConfigKey] = {
    name,
    slots,
    value: computed(() => field.value.value),
  } as Partial<ProFieldConfig>

  return field
}
