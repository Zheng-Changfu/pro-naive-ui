import { isArray, isString } from 'lodash-es'

export function isEmptyValue(value: any) {
  if (value === null || value === undefined) {
    return true
  }
  if (isArray(value) && !value.filter(item => !['', null, undefined].includes(item)).length) {
    return true
  }
  if (isString(value) && !value) {
    return true
  }
  return false
}
