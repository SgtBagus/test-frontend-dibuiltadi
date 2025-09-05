export const getErrorMessage = (error: any, defaultMessage: string = 'Error'): string => {
  if (!error) return defaultMessage

  // kalau pakai axios style
  if (error.response?.data?.responseMessage) {
    return error.response.data.responseMessage
  }

  // kalau pakai fetch custom
  if (error.responseMessage) {
    return error.responseMessage
  }

  if (error.message) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return defaultMessage
}
