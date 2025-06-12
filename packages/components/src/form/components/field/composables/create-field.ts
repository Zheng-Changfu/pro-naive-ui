import type { FieldOptions } from 'pro-composables'
import type { ProFieldProps } from '../props'
import { createField as _createField, createArrayField } from 'pro-composables'
import { toRef } from 'vue'

export function createField(props: ProFieldProps) {
  const {
    isList,
    preserve,
    onChange,
    onUpdateValue,
  } = props

  const options: FieldOptions = {
    preserve,
    path: toRef(props, 'path'),
    hidden: toRef(props, 'hidden'),
    visible: toRef(props, 'visible'),
    onChange,
    onUpdateValue,
  }

  return isList ? createArrayField(options) : _createField(options)
}
