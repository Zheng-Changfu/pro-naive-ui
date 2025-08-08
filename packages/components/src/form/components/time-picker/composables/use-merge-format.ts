import type { TimePickerProps } from 'naive-ui'
import type { ComputedRef } from 'vue'
import { computed, unref } from 'vue'
import { useLocale } from '../../../../locales'

export function useMergeFormat(props: TimePickerProps | ComputedRef<TimePickerProps>) {
  const { localeRef } = useLocale('Time')

  return computed<string>(() => {
    const locale = localeRef.value
    const { format, valueFormat } = unref(props) as TimePickerProps

    if (valueFormat) {
      return valueFormat
    }
    if (format) {
      return format
    }
    return locale.dateFormat
  })
}
