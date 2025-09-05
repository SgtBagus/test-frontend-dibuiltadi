import { BaseSyntheticEvent, ReactNode } from 'react'
import type { SubmitErrorHandler, UseFormReturn } from 'react-hook-form'
import { z, ZodSchema } from 'zod'

export type ButtonModal = {
  label?: string
  onClick?: () => void
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  variant?: 'text' | 'outlined' | 'contained'
}

export type ButtonSubmit = {
  label?: string | ReactNode
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  variant?: 'text' | 'outlined' | 'contained'
  icon?: string
  disabled?: boolean
}

export type CustomButtonSubmitParamTypes<T extends ZodSchema> = {
  onSubmit: (e?: BaseSyntheticEvent) => Promise<string | void> | string | undefined
  onReset: (e?: BaseSyntheticEvent) => void
  methods: UseFormReturn<z.infer<T>>
  isLoading: boolean
}

export type ButtonCustomType<T extends ZodSchema> = {
  buttonSubmit?: ButtonSubmit
  customButtons?: (params: CustomButtonSubmitParamTypes<T>) => ReactNode
}

export type MainFormType<T extends ZodSchema & ButtonCustomType<T>> = {
  children: ReactNode | ((params: CustomButtonSubmitParamTypes<T>) => ReactNode)
  onSubmit: (
    data: z.infer<T>,
    onReset: (e?: BaseSyntheticEvent) => void,
    methods?: UseFormReturn<z.TypeOf<T>, any, undefined>
  ) => Promise<string | void> | string | undefined

  formSchema?: T
  defaultValues?: z.infer<T>
  onError?: SubmitErrorHandler<z.TypeOf<T>> | undefined

  hideButtonCancel?: boolean

  buttonCancel?: {
    label?: string
    onClick: (cancel: () => void) => void
  }
}

export type FormTypeScript = {
  formType?: 'create' | 'edit'
}
