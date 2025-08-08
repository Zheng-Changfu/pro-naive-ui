import { format, isDate } from 'date-fns'
import { isArray, isNumber, isString } from 'lodash-es'

export function stringifyDate(value: any, pattern: string): string | string[] | null {
  if (isString(value)) {
    if (/^\d+$/.test(value)) {
      return format(Number(value), pattern, {
        useAdditionalWeekYearTokens: true,
      })
    }
    return value
  }
  if (isDate(value) || isNumber(value)) {
    return format(value, pattern, {
      useAdditionalWeekYearTokens: true,
    })
  }
  if (isArray(value)) {
    const [s, e] = value
    return [
      stringifyDate(s, pattern),
      stringifyDate(e, pattern),
    ].filter(Boolean) as string[]
  }
  return null
}
