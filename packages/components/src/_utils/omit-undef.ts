export function omitUndef<T extends Record<string, any>>(obj: T) {
  const result: Record<string, any> = {}
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = obj[key]
    }
  }
  return result as T
}
