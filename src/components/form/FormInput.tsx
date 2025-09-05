import { get } from 'lodash'
import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import formatErrorMessage from '@/utils/formatErrorMessage'
import { InputAdornment, TextField, type TextFieldProps } from '@mui/material'

export default function FormInput({
  name,
  prefix,
  suffix,
  valueAsNumber = false,
  allowNegative = false,
  max,
  min,

  /** Used for type='number'*/
  showNumberSpinner = false,
  ...props
}: {
  name: string
  prefix?: ReactNode
  suffix?: ReactNode
  valueAsNumber?: boolean
  allowNegative?: boolean
  max?: number
  min?: number
  showNumberSpinner?: boolean
} & TextFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const error = get(errors, name, undefined)

  return (
    <TextField
      {...register(name, {
        valueAsNumber: valueAsNumber
      })}
      name={name}
      fullWidth
      variant='outlined'
      error={error !== undefined}
      helperText={formatErrorMessage(error, name, props.label)}
      slotProps={{
        input: {
          inputProps: {
            min: min !== undefined ? min : allowNegative ? undefined : 0,
            max: max
          },
          startAdornment: prefix ? <InputAdornment position='start'>{prefix}</InputAdornment> : undefined,
          endAdornment: suffix ? <InputAdornment position='end'>{suffix}</InputAdornment> : undefined,
          sx: !showNumberSpinner
            ? {
                '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
                  WebkitAppearance: 'none',
                  margin: 0
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield'
                }
              }
            : undefined
        }
      }}
      {...props}
    />
  )
}
