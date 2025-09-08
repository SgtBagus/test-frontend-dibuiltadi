import { FormControl, FormHelperText, MenuItem, Select, type SelectProps, Skeleton } from '@mui/material'

import { useEffect, useState } from 'react'
import { apiFetch } from '@/api/apiFetch'
import toast from '@/helper/toast'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { Controller, useFormContext } from 'react-hook-form'
import formatErrorMessage from '@/utils/formatErrorMessage'

type values = { code: string; name: string }

const FormInputSelect = ({
  name,
  options: { endpoint, params },
  ...props
}: {
  name: string
  options: { endpoint: string; params?: Record<string, any> }
} & SelectProps) => {
  const [data, setData] = useState<values[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const getData = async () => {
    try {
      setIsLoading(true)
      const res = await apiFetch(endpoint, {
        body: params
      })
      setData(res.items)
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      getData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error} variant='outlined' fullWidth>
          <Select
            size='small'
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            value={value ?? ''}
            onChange={e => {
              const newValue = e.target.value
              onChange(newValue) // ✅ update react-hook-form
            }}
            MenuProps={{
              PaperProps: {
                style: { maxHeight: 288 } // max-h-72
              }
            }}
            {...props}
          >
            {isLoading ? (
              <MenuItem disabled aria-label='loading'>
                <Skeleton width='100%' />
              </MenuItem>
            ) : (
              data.map(({ code, name }, idx) => (
                <MenuItem key={idx} value={code}>
                  {name}
                </MenuItem>
              ))
            )}
          </Select>

          {error && <FormHelperText>{formatErrorMessage(error, name)}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

export default FormInputSelect
