import formatErrorMessage from '@/utils/formatErrorMessage'
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type Option = {
  label: ReactNode
  value: string | number | boolean
  disabled?: boolean
}

type FormInputRadioGroupPropsType = {
  name: string
  label?: string | ReactNode
  options: Option[]
  row?: boolean
  defaultValue?: string | number
  className?: string
}

/**
 * Generate radio buttons based on the options provided.
 * returned value (getValues or onSubmit) is the value of selected radio button.
 *
 * @param row - display radio buttons in a row instead of column
 * @param defaultValue - default value of the radio button
 */
export default function FormInputRadioGroup({
  name,
  label,
  options,
  row,
  defaultValue,
  className
}: FormInputRadioGroupPropsType) {
  const {
    control,
    formState: { errors }
  } = useFormContext()
  const error = errors[name]

  return (
    <FormControl error={error !== undefined} fullWidth>
      {label && <FormLabel>{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? ''}
        render={({ field }) => (
          <RadioGroup row={row} {...field} className={className}>
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio />}
                label={option.label}
                disabled={option.disabled}
              />
            ))}
          </RadioGroup>
        )}
      />
      {error && <FormHelperText>{formatErrorMessage(error, name, label)}</FormHelperText>}
    </FormControl>
  )
}
