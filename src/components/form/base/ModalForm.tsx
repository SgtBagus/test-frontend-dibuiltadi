import { ReactNode, useCallback, useEffect, useState } from 'react'
import { type FieldErrors, FormProvider, type Path, useForm } from 'react-hook-form'
import { z, ZodSchema } from 'zod'
import { AxiosError } from 'axios'

import {
  type Breakpoint,
  type Theme,
  type DialogProps,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery
} from '@mui/material'

import { zodResolver } from '@hookform/resolvers/zod'

import ButtonRenderForm from './components/ButtonRenderForm'

import {
  ButtonCustomType,
  ButtonModal,
  CustomButtonSubmitParamTypes,
  FormTypeScript,
  MainFormType
} from './type/DefaultFormType'

import { getErrorMessage } from '@/utils/getErrorMessage'
import { useModalContext } from '@/context/toggleModalContext'
import { isEqual } from 'lodash'
import toast from '@/helper/toast'

type ModalFormProps = {
  title?: string | ReactNode

  onClose?: (closeModal: () => void) => void
  disabledCloseAfterSubmit?: boolean

  hideButtonModal?: boolean
  buttonModal?: ButtonModal
  customButtonModal?: (open: () => void) => ReactNode

  isFullScreen?: boolean
  fullWidth?: boolean
  maxWidth?: Breakpoint
  scrollType?: 'paper' | 'body'

  name: string

  disableBackdropClick?: boolean

  PaperProps?: DialogProps['PaperProps']
  TransitionComponent?: DialogProps['TransitionComponent']
  closeAfterTransition?: DialogProps['closeAfterTransition']
}

/**
 * ModalForm - A flexible form component integrated with React Hook Form and Zod validation.
 *
 * This component simplifies form handling with features such as schema validation,
 * default values, custom buttons, and error handling.
 *
 * @example
 * import ModalForm from '@/components/form/BaseFormV2/ModalForm';
 *
 * <ModalForm
 *   onSubmit={onSubmit}
 *   buttonSubmit={({ onSubmit }) => ([{
 *     label: 'Button Label',
 *     onClick: () => {
 *       console.log('asdasd')
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
 *           console.log('asdasd')
 *           onSubmit()
 *         }
 *       }
 *     ]
 *   })}
 * >
 *   {children}
 * </ModalForm>
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
export default function ModalForm<T extends ZodSchema>({
  children,
  onSubmit,

  onClose,
  disabledCloseAfterSubmit = false,

  onError,

  formSchema,
  defaultValues,

  title,
  buttonModal,
  customButtonModal,

  hideButtonModal = false,
  hideButtonCancel = false,

  customButtons,

  isFullScreen,
  fullWidth = true,
  maxWidth = 'sm',
  scrollType = 'paper',

  formType = 'create',
  disableBackdropClick = true,
  name,

  PaperProps,
  TransitionComponent,
  closeAfterTransition
}: ModalFormProps & MainFormType<T> & ButtonCustomType<T> & FormTypeScript) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [prevDefaultValues, setPrevDefaultValues] = useState(defaultValues)
  const [key, setKey] = useState<number>(0)
  const triggerRerender = () => setKey(prev => prev + 1)

  const { getModalState, setModalState } = useModalContext()

  const methods = useForm<z.infer<T>>({
    resolver: formSchema && zodResolver(formSchema),
    defaultValues
  })

  useEffect(() => {
    if (!isEqual(defaultValues, prevDefaultValues)) {
      triggerRerender()
      setPrevDefaultValues(defaultValues)
      methods.reset(defaultValues)
    }
  }, [defaultValues, methods, prevDefaultValues])

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
        const res = await onSubmit(data, resetForm)
        disabledCloseAfterSubmit || onCloseModal()

        return res
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data.errors) {
          const errorList = error.response.data.errors

          if (Object.keys(data).some(key => key in errorList)) {
            for (const key in errorList) {
              methods.setError(key as Path<z.TypeOf<T>>, { message: errorList[key][0] })
            }
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
      console.error('error', error)
      // eslint-disable-next-line no-console
      console.error('values', methods.getValues())
      onError?.(error)
    },
    [onError, methods]
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
      return typeof children === 'function' ? children({ onSubmit, onReset, methods }) : children
    },
    [children]
  )

  const onCloseModal = () => {
    onClose?.(() => setModalState(name, false)) || setModalState(name, false)
    resetForm()
  }

  // set modal state to false at mount
  useEffect(() => {
    setModalState(name, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  const breakpointReached = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <>
      {hideButtonModal || (
        <>
          {customButtonModal ? (
            customButtonModal(() => setModalState(name, true))
          ) : (
            <Button
              variant={buttonModal?.variant || 'contained'}
              color={buttonModal?.color || 'primary'}
              onClick={() => {
                buttonModal?.onClick?.()
                setModalState(name, true)
              }}
              key='default-button-modal'
            >
              {buttonModal?.label || 'Buka Form'}
            </Button>
          )}
        </>
      )}

      <Dialog
        open={getModalState(name).open}
        scroll={scrollType}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        fullScreen={isFullScreen !== undefined ? isFullScreen : breakpointReached}
        onClose={(_event, reason) => {
          if (disableBackdropClick && reason === 'backdropClick') return
          onCloseModal()
        }}
        PaperProps={PaperProps}
        TransitionComponent={TransitionComponent}
        closeAfterTransition={closeAfterTransition}
      >
        <FormProvider {...methods}>
          <DialogTitle className='flex items-center justify-between py-4'>
            <span>{title || 'Judul Modal Form'}</span>
            <IconButton aria-label='close' onClick={onCloseModal} className='-my-2 -mr-2'>
              <i className='ri-close-line' />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers key={key}>
            <Stack gap={4}>
              {renderChildren({
                onSubmit: submit,
                onReset: resetForm,
                methods,
                isLoading
              })}
            </Stack>
          </DialogContent>
          <DialogActions className='justify-start pt-[1.25rem]'>
            <ButtonRenderForm
              params={{
                onSubmit: submit,
                onReset: resetForm,
                methods,
                isLoading
              }}
              formType={formType}
              customButtons={customButtons}
              onClickButtonCancel={() => onCloseModal()}
              hideButtonCancel={hideButtonCancel}
              isLoading={isLoading}
            />
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  )
}
