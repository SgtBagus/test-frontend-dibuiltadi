import { Id, toast as originalToast, ToastContent, ToastOptions, UpdateOptions } from 'react-toastify'

const baseOptions: ToastOptions = {
  autoClose: 3000
}

const toast = {
  ...originalToast,

  success: (content: ToastContent<unknown>, opts?: ToastOptions) =>
    originalToast.success(content, { ...baseOptions, ...opts }),

  error: (content: ToastContent<unknown>, opts?: ToastOptions) => {
    const descLength = typeof content === 'string' ? content.split('').length : 0
    const errorOptions = { ...baseOptions }

    if (descLength > 40) {
      errorOptions.autoClose = 4000
    }

    if (descLength > 100) {
      errorOptions.autoClose = 6000
    }
    originalToast.error(content, { ...errorOptions, ...opts })
  },

  info: (content: ToastContent<unknown>, opts?: ToastOptions) =>
    originalToast.info(content, { ...baseOptions, ...opts }),

  warn: (content: ToastContent<unknown>, opts?: ToastOptions) =>
    originalToast.warn(content, { ...baseOptions, ...opts }),

  loading: (content: ToastContent<unknown>, opts?: ToastOptions) =>
    originalToast.loading(content, { ...baseOptions, ...opts }),

  update: (id: Id, opts?: UpdateOptions) => originalToast.update(id, { ...baseOptions, ...opts })
}

export default toast
