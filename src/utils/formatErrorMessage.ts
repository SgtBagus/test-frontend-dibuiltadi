import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

function findMessage(obj: unknown): string | null {
  if (typeof obj !== 'object' || obj === null) return null

  if ('message' in obj && typeof (obj as any).message === 'string') {
    return (obj as any).message
  }

  for (const key in obj) {
    const value = (obj as Record<string, unknown>)[key]
    const result = findMessage(value)
    if (result) return result
  }

  return null
}

/**
 * Format error message of input field
 * the name will be replaced with the label
 */

export default function formatErrorMessage(
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
  name: string,
  label?: any
) {
  // check type
  if (!error) return ''
  const errorMessage = String(findMessage(error) ?? '')
  if (!label || typeof label !== 'string') return errorMessage
  // replace name with label
  const nameRegex = new RegExp(name.toLowerCase(), 'i')
  return errorMessage.replace(nameRegex, label)
}
