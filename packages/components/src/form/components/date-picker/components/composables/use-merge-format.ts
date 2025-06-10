import type { DatePickerProps } from 'naive-ui'
import { computed } from 'vue'
import { useLocale } from '../../../../../locales'

export function useMergeFormat(props: DatePickerProps) {
  const { localeRef } = useLocale('DatePicker')

  return computed<string>(() => {
    const locale = localeRef.value
    const { type, format, valueFormat } = props
    if (valueFormat) {
      return valueFormat
    }
    if (format) {
      return format
    }
    switch (type) {
      case 'date':
      case 'daterange':
        return locale.dateFormat
      case 'datetime':
      case 'datetimerange':
        return locale.dateTimeFormat
      case 'year':
      case 'yearrange':
        return locale.yearTypeFormat
      case 'month':
      case 'monthrange':
        return locale.monthTypeFormat
      case 'quarter':
      case 'quarterrange':
        return locale.quarterFormat
      case 'week':
        return locale.weekFormat
    }
  })
}
