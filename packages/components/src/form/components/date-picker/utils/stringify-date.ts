import { format, isDate } from 'date-fns'
import { isArray, isNumber, isString } from 'lodash-es'

function isTimestampString(value: string) {
  if (!/^\d+$/.test(value)) {
    return false
  }
  const len = value.length
  const secondsTimestampLen = 10
  const msTimestampLen = 13
  const usTimestampLen = 16
  return [
    secondsTimestampLen,
    msTimestampLen,
    usTimestampLen,
  ].includes(len)
}

export function stringifyDate(value: any, pattern: string): string | string[] | null {
  if (isString(value)) {
    if (isTimestampString(value)) {
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
