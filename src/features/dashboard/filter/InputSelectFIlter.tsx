import { MenuItem, Select, Skeleton } from '@mui/material'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { apiFetch } from '@/api/apiFetch'
import toast from '@/helper/toast'
import { getErrorMessage } from '@/utils/getErrorMessage'
import LabelWrapper from '@/components/wrapper/LabelWrapper'

type values = { code: string; name: string }

const InputSelectFilter = ({
  label,
  disabled,
  options: { endpoint, params },
  setSalesCode
}: {
  label?: string
  disabled?: boolean
  options: { endpoint: string; params?: Record<string, any> }
  setSalesCode: Dispatch<SetStateAction<string | null>>
}) => {
  const [value, setValue] = useState<string | string[] | null>(null)
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

  return (
    <LabelWrapper label={label || ''}>
      <Select
        size='small'
        disabled={disabled}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        fullWidth
        value={value ?? ''}
        onChange={({ target: { value } }) => {
          setValue(value)
          setSalesCode(value as string)
        }}
        renderValue={() => {
          return data.find(({ code }) => code === value)?.name
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 288,
              overflowX: 'auto'
            }
          },
          MenuListProps: {
            sx: {
              paddingTop: 0
            }
          }
        }}
        IconComponent={() =>
          value ? (
            <i
              className='ri-close-line cursor-pointer'
              style={{ pointerEvents: 'auto' }}
              onClick={e => {
                e.stopPropagation()
                setValue(null)

                setSalesCode(null)
              }}
            />
          ) : (
            <i className='ri-arrow-down-s-line' />
          )
        }
      >
        {isLoading ? (
          <MenuItem disabled aria-label='loading'>
            <Skeleton width='100%' />
          </MenuItem>
        ) : (
          <>
            {data.length === 0 ? (
              <MenuItem disabled aria-label='empty'>
                Tidak ada data
              </MenuItem>
            ) : (
              <>
                {data.map(({ code, name }, idx) => {
                  return (
                    <MenuItem key={idx} value={code}>
                      {name}
                    </MenuItem>
                  )
                })}
              </>
            )}
          </>
        )}
      </Select>
    </LabelWrapper>
  )
}

export default InputSelectFilter
