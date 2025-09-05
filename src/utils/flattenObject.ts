type AnyObject = Record<string, any>

export function flattenObject(obj: AnyObject, prefix = '', result: Record<string, any> = {}): Record<string, any> {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue

    const value = obj[key]
    const newKey = prefix ? `${prefix}.${key}` : key

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        flattenObject(item, `${newKey}.${index}`, result)
      })
    } else if (typeof value === 'object' && value !== null) {
      flattenObject(value, newKey, result)
    } else {
      result[newKey] = value
    }
  }

  return result
}
