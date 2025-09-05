'use client'

import { useFormContext } from 'react-hook-form'
import { get } from 'lodash'

import formatErrorMessage from '@/utils/formatErrorMessage'
import { TextField, type TextFieldProps } from '@mui/material'

export default function FormInputArea({
  name,
  minRows = 2,
  maxRows = 5,
  ...props
}: { name: string; minRows?: number; maxRows?: number; autoComplete?: string } & TextFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  const error = get(errors, name, undefined)

  return (
    <TextField
      fullWidth
      variant='outlined'
      {...register(name)}
      multiline
      error={error !== undefined}
      helperText={formatErrorMessage(error, name, props.label)}
      minRows={minRows}
      maxRows={maxRows}
      {...props}
    />
  )
}
