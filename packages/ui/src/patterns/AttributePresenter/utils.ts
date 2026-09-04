/**
 * Convert camelCase/PascalCase key to Title Case label
 * e.g., 'firstName' → 'First Name', 'userID' → 'User ID'
 */
export function toLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/([A-Z]{2,})/g, (match) => {
      // Handle acronyms like 'ID' → 'ID' (not 'I D')
      return match.length > 2 ? match : ` ${match}`
    })
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

/**
 * Recursively flatten a nested object into key-value pairs
 * e.g., { user: { name: 'John' } } → { 'user.name': 'John' }
 */
export function flattenObject(obj: any, prefix = ''): Record<string, any> {
  const result: Record<string, any> = {}

  for (const key of Object.keys(obj)) {
    const value = obj[key]
    const newKey = prefix ? `${prefix}.${key}` : key

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey))
    } else {
      result[newKey] = value
    }
  }

  return result
}
