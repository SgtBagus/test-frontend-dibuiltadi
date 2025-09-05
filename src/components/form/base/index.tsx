import { useCallback, useEffect, useState } from 'react'
import { type FieldErrors, FormProvider, type Path, useForm } from 'react-hook-form'
import { z, ZodSchema } from 'zod'
import { AxiosError } from 'axios'
import { isObject } from 'lodash'

import { zodResolver } from '@hookform/resolvers/zod'

import { Box } from '@mui/material'
import ButtonRenderForm from './components/ButtonRenderForm'

import { ButtonCustomType, CustomButtonSubmitParamTypes, FormTypeScript, MainFormType } from './type/DefaultFormType'

import toast from '@/helper/toast'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { flattenObject } from '@/utils/flattenObject'

/**
 * BaseFormV2 - A flexible form component integrated with React Hook Form and Zod validation.
 *
 * This component simplifies form handling with features such as schema validation,
 * default values, custom buttons, and error handling.
 *
 * @example
 * import BaseFormV2 from '@/components/form/BaseFormV2';
 *
 * <BaseFormV2
 *   onSubmit={onSubmit}
 *   buttonSubmit={({ onSubmit }) => ([{
 *     label: 'Button Label',
 *     onClick: () => {
 *       console.log('hallo')
 *       onSubmit()
 *     }
 *   }])}
 *   buttonSubmitSplitGroup={({ onSubmit }) => ({
 *     formKey: 'button-submit-form-name',
 *     buttons: [
 *       {
 *         key: 'a',
 *         label: 'Button Label',
 *         onClick: () => {
 *           console.log('hallo')
 *           onSubmit()
 *         }
 *       }
 *     ]
 *   })}
 * >
 *   {children}
 * </BaseFormV2>
 *
 * @props
 * @param {object} formSchema - A Zod schema for form validation.
 * @param {object} [defaultValues] - Initial values for the form fields.
 * @param {React.ReactNode} children - Child components to render within the form.
 * @param {function} onSubmit - Callback function to handle form submission.
 * @param {function} [onError] - Callback function to handle form validation errors.
 * @param {boolean} [hideButtonCancel=false] - Option to hide the cancel button.
 * @param {React.ReactNode} [buttonSubmit] - Custom submit button component.
 * @param {React.ReactNode} [buttonCancel] - Custom cancel button component.
 * @param {React.ReactNode} [buttonSubmitSplitGroup] - Split button group for submit actions.
 *
 *    Note: Ensure to set a unique key for `buttonSubmitSplitGroup` to enable storing the
 *    selected button in localStorage. This allows the component to remember the last
 *    selected button for future sessions.
 *
 * @param {React.ReactNode} [customButtons] - Additional custom buttons to render.
 *
 * Additional Notes:
 * - This component is designed for easy integration with React Hook Form.
 * - `formSchema` is mandatory for Zod-based validation.
 * - Default `hideButtonCancel` and `hideButtonGroupSubmit` are set to `false` to show buttons by default.
 */
export default function BaseForm<T extends ZodSchema>({
  formSchema,
  defaultValues,
  children,
  onSubmit,
  onError,
  hideButtonCancel = false,
  customButtons,
  formType = 'create',
  buttonSubmit
}: MainFormType<T> & ButtonCustomType<T> & FormTypeScript) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [key, setKey] = useState<number>(0)
  const triggerRerender = () => setKey(prev => prev + 1)

  const methods = useForm<z.infer<T>>({
    resolver: formSchema && zodResolver(formSchema),
    defaultValues
  })

  useEffect(() => {
    triggerRerender()
    if (defaultValues && isObject(defaultValues)) {
      for (const key in defaultValues) {
        methods.setValue(key as any, defaultValues[key])
      }
    }
  }, [defaultValues, methods])

  const resetForm = () => {
    triggerRerender()
    methods.reset()
  }

  const handleOnSubmit = useCallback(
    async (data: z.infer<T>) => {
      if (isLoading) {
        return
      }

      try {
        setIsLoading(true)
        return await onSubmit(data, () => resetForm(), methods)
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data.errors) {
          const errorList = error.response.data.errors
          const flattedData = flattenObject(data)

          if (Object.keys(flattedData).some(key => key in errorList)) {
            for (const key in errorList) {
              methods.setError(key as Path<z.TypeOf<T>>, { message: errorList[key][0] })
            }

            scrollToFirstError(errorList, 'form-container')
          } else {
            toast.error(getErrorMessage(error))
          }
        } else {
          toast.error(getErrorMessage(error))
        }
      } finally {
        setIsLoading(false)
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, onSubmit, methods]
  )

  const handleError = useCallback(
    (error: FieldErrors<z.TypeOf<T>>) => {
      // eslint-disable-next-line no-console
      console.warn('Validation errors:', error)
      onError?.(error)

      const firstErrorField = findFirstError(error)

      const errorElement =
        document.querySelector(`[name="${firstErrorField}"]`) ?? document.getElementById(firstErrorField)

      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        const formElement = document.getElementById('form-container')

        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    },
    [onError]
  )

  const submit = async () => {
    let result
    await methods.handleSubmit(async data => {
      result = await handleOnSubmit(data)
    }, handleError)()
    return result
  }

  const renderChildren = useCallback(
    ({ onSubmit, onReset, methods }: CustomButtonSubmitParamTypes<T>) => {
      return typeof children === 'function' ? children({ onSubmit, onReset, methods, isLoading }) : children
    },
    [children, isLoading]
  )

  return (
    <FormProvider {...methods} key={key}>
      <Box className='flex flex-col gap-5' id='form-container'>
        {renderChildren({ onSubmit: submit, onReset: resetForm, methods, isLoading })}
        {!hideButtonCancel && (
          <ButtonRenderForm
            params={{
              onSubmit: submit,
              onReset: resetForm,
              methods,
              isLoading
            }}
            formType={formType}
            customButtons={customButtons}
            buttonSubmit={buttonSubmit}
            hideButtonCancel={hideButtonCancel}
            isLoading={isLoading}
            onClickButtonCancel={() => alert('kembali')}
          />
        )}
      </Box>
    </FormProvider>
  )
}

function scrollToFirstError(
  errors: Record<string, any>,
  formId?: string // optional: the form container ID to scroll to
) {
  const firstErrorKey = Object.keys(errors)[0]
  if (!firstErrorKey) return

  const errorElement = document.querySelector(`[name="${firstErrorKey}"]`) ?? document.getElementById(firstErrorKey)

  if (errorElement) {
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } else {
    const formElement = formId ? document.getElementById(formId) : undefined

    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

function findFirstError<T extends Record<string, any>>(errObj: FieldErrors<T>, path = ''): string {
  for (const key in errObj) {
    if (!Object.prototype.hasOwnProperty.call(errObj, key)) continue

    const currentPath = path ? `${path}.${key}` : key

    if ((errObj as any)[key]?.message) {
      return currentPath
    }

    if (typeof errObj[key] === 'object') {
      const deeper = findFirstError(errObj[key] as FieldErrors, currentPath)
      if (deeper) return deeper
    }
  }
  return ''
}
